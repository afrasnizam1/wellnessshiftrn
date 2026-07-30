import Foundation
import SceneKit
import UIKit
import React

// MARK: - View Manager

@objc(HologramSceneViewManager)
class HologramSceneViewManager: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool { true }

  override func view() -> UIView! {
    HologramSceneUIView()
  }
}

// MARK: - Native UIView (SceneKit — matches native iOS hologram tutors)

@objc(HologramSceneView)
class HologramSceneUIView: UIView {
  @objc var modelFile: NSString = "" { didSet { reloadIfReady() } }
  @objc var preset: NSString = "brain" { didSet { reloadIfReady() } }

  private let sceneView = SCNView()
  private let loadingOverlay = UIView()
  private let loadingSpinner = UIActivityIndicatorView(style: .large)
  private let loadingLabel = UILabel()
  private var isConfigured = false
  private var loadGeneration = 0
  private var odrRequest: NSBundleResourceRequest?

  override init(frame: CGRect) {
    super.init(frame: frame)
    backgroundColor = .black
    sceneView.frame = bounds
    sceneView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    sceneView.backgroundColor = .black
    sceneView.allowsCameraControl = true
    sceneView.autoenablesDefaultLighting = false
    sceneView.antialiasingMode = .multisampling4X
    sceneView.preferredFramesPerSecond = 60
    addSubview(sceneView)

    loadingOverlay.backgroundColor = UIColor.black.withAlphaComponent(0.72)
    loadingOverlay.isHidden = true
    loadingOverlay.translatesAutoresizingMaskIntoConstraints = false
    addSubview(loadingOverlay)

    loadingSpinner.color = .white
    loadingSpinner.translatesAutoresizingMaskIntoConstraints = false
    loadingOverlay.addSubview(loadingSpinner)

    loadingLabel.text = "Downloading 3D model…"
    loadingLabel.textColor = UIColor.white.withAlphaComponent(0.85)
    loadingLabel.font = .systemFont(ofSize: 13, weight: .medium)
    loadingLabel.textAlignment = .center
    loadingLabel.translatesAutoresizingMaskIntoConstraints = false
    loadingOverlay.addSubview(loadingLabel)

    NSLayoutConstraint.activate([
      loadingOverlay.leadingAnchor.constraint(equalTo: leadingAnchor),
      loadingOverlay.trailingAnchor.constraint(equalTo: trailingAnchor),
      loadingOverlay.topAnchor.constraint(equalTo: topAnchor),
      loadingOverlay.bottomAnchor.constraint(equalTo: bottomAnchor),
      loadingSpinner.centerXAnchor.constraint(equalTo: loadingOverlay.centerXAnchor),
      loadingSpinner.centerYAnchor.constraint(equalTo: loadingOverlay.centerYAnchor, constant: -12),
      loadingLabel.topAnchor.constraint(equalTo: loadingSpinner.bottomAnchor, constant: 12),
      loadingLabel.leadingAnchor.constraint(equalTo: loadingOverlay.leadingAnchor, constant: 16),
      loadingLabel.trailingAnchor.constraint(equalTo: loadingOverlay.trailingAnchor, constant: -16),
    ])
  }

  required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }

  deinit {
    odrRequest?.endAccessingResources()
  }

  override func layoutSubviews() {
    super.layoutSubviews()
    sceneView.frame = bounds
    if !isConfigured, modelFile.length > 0 {
      reloadIfReady()
    }
  }

  private func setLoading(_ loading: Bool, message: String = "Downloading 3D model…") {
    loadingLabel.text = message
    loadingOverlay.isHidden = !loading
    if loading {
      loadingSpinner.startAnimating()
    } else {
      loadingSpinner.stopAnimating()
    }
  }

  private func reloadIfReady() {
    guard modelFile.length > 0, bounds.width > 0, bounds.height > 0 else { return }
    isConfigured = true
    loadGeneration += 1
    let generation = loadGeneration
    let fileName = modelFile as String
    let presetValue = HologramLoader.Preset(rawValue: preset as String) ?? .brain

    // Prefer already-resident assets (core bundle or previously fetched ODR).
    if let url = HologramLoader.bundleURL(for: fileName) {
      presentScene(url: url, fileName: fileName, preset: presetValue)
      return
    }

    guard HologramLoader.requiresOnDemandDownload(fileName) else {
      print("❌ HologramSceneView: missing \(fileName).usdz in bundle")
      HologramLoader.showPlaceholder(in: sceneView)
      return
    }

    setLoading(true)
    let request = NSBundleResourceRequest(tags: [HologramLoader.onDemandTag])
    request.loadingPriority = NSBundleResourceRequestLoadingPriorityUrgent
    odrRequest?.endAccessingResources()
    odrRequest = request

    request.beginAccessingResources { [weak self] error in
      DispatchQueue.main.async {
        guard let self, self.loadGeneration == generation else { return }
        self.setLoading(false)
        if let error {
          print("❌ HologramSceneView: ODR download failed for \(fileName): \(error)")
          self.loadingLabel.text = "Couldn’t download model"
          HologramLoader.showPlaceholder(in: self.sceneView)
          return
        }
        guard let url = HologramLoader.bundleURL(for: fileName) else {
          print("❌ HologramSceneView: ODR finished but \(fileName).usdz still missing")
          HologramLoader.showPlaceholder(in: self.sceneView)
          return
        }
        self.presentScene(url: url, fileName: fileName, preset: presetValue)
      }
    }
  }

  private func presentScene(url: URL, fileName: String, preset: HologramLoader.Preset) {
    do {
      let scene = try SCNScene(url: url, options: nil)
      sceneView.scene = scene
      HologramLoader.apply(preset: preset, to: scene, sceneView: sceneView)
      print("✅ HologramSceneView: loaded \(fileName).usdz (\(preset.rawValue))")
    } catch {
      print("❌ HologramSceneView: failed to load \(fileName): \(error)")
      HologramLoader.showPlaceholder(in: sceneView)
    }
  }
}

// MARK: - Loader (mirrors native Hologram*3DView / BeatingHeart3DView)

enum HologramLoader {
  /// On-Demand Resource tag for all USDZ packs (~68MB) — not in the initial IPA.
  static let onDemandTag = "holograms_large"

  /// Models tagged in Xcode as `holograms_large` (see project.pbxproj ASSET_TAGS).
  static let onDemandModels: Set<String> = [
    "Beating-heart",
    "Brain_hologram",
    "Ecorche_-_Anatomy_study",
    "Free_Pack_-_Human_Skeleton",
    "Male_Full_Body_Ecorche",
    "Realistic_Human_Stomach",
    "Struktur_Paru-Paru_Manusia_3D_Model",
    "adult_heart_and_bronchial_airways",
    "adult_heart_and_lungs",
  ]

  enum Preset: String {
    case brain
    case lung
    case stomach
    case anatomy
    case skeleton
    case ecorche
    case beatingHeart
    case heartLungs
    case heartBronchial
  }

  private static let defaultScale: Float = 0.2

  static func requiresOnDemandDownload(_ fileName: String) -> Bool {
    onDemandModels.contains(fileName)
  }

  static func bundleURL(for fileName: String) -> URL? {
    [
      Bundle.main.url(forResource: fileName, withExtension: "usdz", subdirectory: "Models"),
      Bundle.main.url(forResource: fileName, withExtension: "usdz"),
    ].compactMap { $0 }.first
  }

  static func apply(preset: Preset, to scene: SCNScene, sceneView: SCNView) {
    let root = scene.rootNode
    let (_, maxDimension) = modelBounds(for: root)

    var appliedScale: Float = defaultScale
    var cameraDistance: Float = 3
    var fieldOfView: CGFloat = 55
    var accent: UIColor = .cyan
    var accentIntensity: CGFloat = 1500

    var centerOffset = SCNVector3(0, 0, 0)

    switch preset {
    case .brain, .anatomy:
      appliedScale = defaultScale * 1.35
      cameraDistance = maxDimension * appliedScale * 1.15
      fieldOfView = 50

    case .lung:
      appliedScale = defaultScale
      cameraDistance = maxDimension * appliedScale * 1.2

    case .stomach:
      appliedScale = defaultScale * 1.4
      cameraDistance = maxDimension * appliedScale * 1.05
      fieldOfView = 48

    case .skeleton, .ecorche:
      appliedScale = defaultScale * 0.5
      cameraDistance = maxDimension * appliedScale * 1.2

    case .beatingHeart:
      appliedScale = defaultScale * 12.0
      cameraDistance = maxDimension * appliedScale * 1.5
      accent = .red
      accentIntensity = 1000

    case .heartLungs:
      let targetSize: Float = 3.2
      appliedScale = maxDimension > 0 ? targetSize / maxDimension : 1
      cameraDistance = maxDimension * appliedScale * 1.8
      fieldOfView = 52
      accent = .white

    case .heartBronchial:
      let targetSize: Float = 3.0
      appliedScale = maxDimension > 0 ? targetSize / maxDimension : 1
      cameraDistance = maxDimension * appliedScale * 1.55
      fieldOfView = 50
      accent = .white
      // Bronchial tree extends upward; nudge the framed model down slightly in view.
      centerOffset = SCNVector3(0, -targetSize * 0.1, 0)
    }

    centerModel(in: scene, scale: appliedScale, offset: centerOffset)
    addLights(to: scene.rootNode, accent: accent, accentIntensity: accentIntensity)
    setupCamera(on: sceneView, in: scene, distance: cameraDistance, fieldOfView: fieldOfView)
  }

  private static func modelBounds(for root: SCNNode) -> (center: SCNVector3, maxDimension: Float) {
    var minVec = SCNVector3(
      x: Float.greatestFiniteMagnitude,
      y: Float.greatestFiniteMagnitude,
      z: Float.greatestFiniteMagnitude
    )
    var maxVec = SCNVector3(
      x: -Float.greatestFiniteMagnitude,
      y: -Float.greatestFiniteMagnitude,
      z: -Float.greatestFiniteMagnitude
    )
    var hasGeometry = false

    root.enumerateHierarchy { node, _ in
      guard node.geometry != nil else { return }
      hasGeometry = true
      let boundingBox = node.boundingBox
      let corners: [SCNVector3] = [
        SCNVector3(boundingBox.min.x, boundingBox.min.y, boundingBox.min.z),
        SCNVector3(boundingBox.min.x, boundingBox.min.y, boundingBox.max.z),
        SCNVector3(boundingBox.min.x, boundingBox.max.y, boundingBox.min.z),
        SCNVector3(boundingBox.min.x, boundingBox.max.y, boundingBox.max.z),
        SCNVector3(boundingBox.max.x, boundingBox.min.y, boundingBox.min.z),
        SCNVector3(boundingBox.max.x, boundingBox.min.y, boundingBox.max.z),
        SCNVector3(boundingBox.max.x, boundingBox.max.y, boundingBox.min.z),
        SCNVector3(boundingBox.max.x, boundingBox.max.y, boundingBox.max.z),
      ]
      for corner in corners {
        let localCorner = node.convertPosition(corner, to: root)
        minVec.x = min(minVec.x, localCorner.x)
        minVec.y = min(minVec.y, localCorner.y)
        minVec.z = min(minVec.z, localCorner.z)
        maxVec.x = max(maxVec.x, localCorner.x)
        maxVec.y = max(maxVec.y, localCorner.y)
        maxVec.z = max(maxVec.z, localCorner.z)
      }
    }

    if !hasGeometry {
      let bbox = root.boundingBox
      minVec = bbox.min
      maxVec = bbox.max
    }

    let modelSize = SCNVector3(
      maxVec.x - minVec.x,
      maxVec.y - minVec.y,
      maxVec.z - minVec.z
    )
    let center = SCNVector3(
      (minVec.x + maxVec.x) / 2,
      (minVec.y + maxVec.y) / 2,
      (minVec.z + maxVec.z) / 2
    )
    let maxDimension = max(modelSize.x, max(modelSize.y, modelSize.z))
    return (center, maxDimension)
  }

  private static func centerModel(in scene: SCNScene, scale: Float, offset: SCNVector3) {
    let root = scene.rootNode
    let (center, _) = modelBounds(for: root)

    let container = SCNNode()
    container.position = SCNVector3(
      -center.x * scale + offset.x,
      -center.y * scale + offset.y,
      -center.z * scale + offset.z
    )
    container.scale = SCNVector3(scale, scale, scale)

    let children = root.childNodes
    for child in children {
      if child.camera != nil || child.light != nil {
        continue
      }
      child.removeFromParentNode()
      container.addChildNode(child)
    }
    root.addChildNode(container)
  }

  private static func addLights(to root: SCNNode, accent: UIColor, accentIntensity: CGFloat) {
    let directional = SCNNode()
    directional.light = SCNLight()
    directional.light?.type = .directional
    directional.light?.intensity = 2000
    directional.light?.color = UIColor.white
    directional.position = SCNVector3(2, 2, 2)
    root.addChildNode(directional)

    let ambient = SCNNode()
    ambient.light = SCNLight()
    ambient.light?.type = .ambient
    ambient.light?.intensity = 800
    ambient.light?.color = UIColor.white
    root.addChildNode(ambient)

    let accentLight = SCNNode()
    accentLight.light = SCNLight()
    accentLight.light?.type = .directional
    accentLight.light?.intensity = accentIntensity
    accentLight.position = SCNVector3(-1, -1, -1)
    accentLight.light?.color = accent
    root.addChildNode(accentLight)
  }

  private static func setupCamera(on sceneView: SCNView, in scene: SCNScene, distance: Float, fieldOfView: CGFloat) {
    let cameraNode = SCNNode()
    cameraNode.camera = SCNCamera()
    cameraNode.camera?.fieldOfView = fieldOfView
    cameraNode.camera?.automaticallyAdjustsZRange = true
    cameraNode.position = SCNVector3(0, 0, distance)
    cameraNode.look(at: SCNVector3(0, 0, 0))
    scene.rootNode.addChildNode(cameraNode)
    sceneView.pointOfView = cameraNode
    sceneView.defaultCameraController.target = SCNVector3(0, 0, 0)
  }

  static func showPlaceholder(in sceneView: SCNView) {
    let scene = SCNScene()
    let sphere = SCNSphere(radius: 0.4)
    sphere.firstMaterial?.diffuse.contents = UIColor.systemPurple
    sphere.firstMaterial?.emission.contents = UIColor.purple.withAlphaComponent(0.25)
    scene.rootNode.addChildNode(SCNNode(geometry: sphere))
    sceneView.scene = scene
    sceneView.allowsCameraControl = true
  }
}
