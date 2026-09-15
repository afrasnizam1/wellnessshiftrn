package afras.wellnessshiftrn.android.hologram

import android.annotation.SuppressLint
import android.util.Log
import android.view.MotionEvent
import android.webkit.ConsoleMessage
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import androidx.webkit.WebViewAssetLoader
import com.facebook.react.uimanager.ThemedReactContext
import java.net.URLEncoder

@SuppressLint("SetJavaScriptEnabled")
class HologramSceneUIView(context: ThemedReactContext) : FrameLayout(context) {
  private val webView = WebView(context)
  private var modelFile: String = ""
  private var preset: String = "brain"
  private var autoRotate: Boolean = false
  private var loadedKey: String = ""

  private val assetLoader = WebViewAssetLoader.Builder()
    .setDomain(ASSET_HOST)
    .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(context))
    .build()

  init {
    setBackgroundColor(0xFF000000.toInt())
    webView.setBackgroundColor(0xFF000000.toInt())
    webView.settings.javaScriptEnabled = true
    webView.settings.domStorageEnabled = true
    webView.settings.allowFileAccess = true
    webView.settings.allowContentAccess = true
    webView.settings.cacheMode = WebSettings.LOAD_NO_CACHE
    webView.settings.mediaPlaybackRequiresUserGesture = false
    webView.settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
    webView.webViewClient = object : WebViewClient() {
      override fun shouldInterceptRequest(
        view: WebView,
        request: WebResourceRequest,
      ): WebResourceResponse? {
        return assetLoader.shouldInterceptRequest(request.url)
      }
    }
    webView.webChromeClient = object : WebChromeClient() {
      override fun onConsoleMessage(consoleMessage: ConsoleMessage): Boolean {
        Log.d(TAG, "${consoleMessage.messageLevel()}: ${consoleMessage.message()}")
        return true
      }
    }
    webView.isNestedScrollingEnabled = true
    webView.setOnTouchListener { v, event ->
      when (event.actionMasked) {
        MotionEvent.ACTION_DOWN, MotionEvent.ACTION_MOVE ->
          v.parent?.requestDisallowInterceptTouchEvent(true)
        MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL ->
          v.parent?.requestDisallowInterceptTouchEvent(false)
      }
      false
    }
    addView(webView, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT))
  }

  fun setModelFile(value: String?) {
    modelFile = value?.trim().orEmpty()
    reloadIfReady()
  }

  fun setPreset(value: String?) {
    preset = value?.trim().takeUnless { it.isNullOrEmpty() } ?: "brain"
    reloadIfReady()
  }

  fun setAutoRotate(value: Boolean) {
    if (autoRotate == value) return
    autoRotate = value
    loadedKey = ""
    reloadIfReady()
  }

  override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
    super.onSizeChanged(w, h, oldw, oldh)
    if (w > 0 && h > 0) reloadIfReady()
  }

  private fun reloadIfReady() {
    if (modelFile.isEmpty() || width <= 0 || height <= 0) return
    val key = "$modelFile|$preset|$autoRotate"
    if (key == loadedKey) return
    loadedKey = key
    val model = URLEncoder.encode(modelFile, "UTF-8").replace("+", "%20")
    val presetEnc = URLEncoder.encode(preset, "UTF-8").replace("+", "%20")
    val rotate = if (autoRotate) "1" else "0"
    val url =
      "https://$ASSET_HOST/assets/hologram/index.html?model=$model&preset=$presetEnc&autoRotate=$rotate"
    Log.d(TAG, "load $url")
    webView.loadUrl(url)
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    webView.loadUrl("about:blank")
  }

  companion object {
    private const val TAG = "HologramSceneView"
    private const val ASSET_HOST = "appassets.androidplatform.net"
  }
}
