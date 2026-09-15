package afras.wellnessshiftrn.android.hologram

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class HologramSceneViewManager : SimpleViewManager<HologramSceneUIView>() {
  override fun getName(): String = "HologramSceneView"

  override fun createViewInstance(reactContext: ThemedReactContext): HologramSceneUIView {
    return HologramSceneUIView(reactContext)
  }

  @ReactProp(name = "modelFile")
  fun setModelFile(view: HologramSceneUIView, value: String?) {
    view.setModelFile(value)
  }

  @ReactProp(name = "preset")
  fun setPreset(view: HologramSceneUIView, value: String?) {
    view.setPreset(value)
  }

  @ReactProp(name = "autoRotate", defaultBoolean = false)
  fun setAutoRotate(view: HologramSceneUIView, value: Boolean) {
    view.setAutoRotate(value)
  }
}
