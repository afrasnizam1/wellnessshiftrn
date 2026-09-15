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
  @objc var autoRotate: Bool = false { didSet { updateAutoRotate() } }

  private let sceneView = SCNView()
  private var modelContainer: SCNNode?
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
    sceneView.autoenablesDefaultLighting = true
    sceneView.isPlaying = true
    sceneView.antialiasingMode = .multisampling4X
    sceneView.preferredFramesPerSecond = 60
    sceneView.cameraControlConfiguration.allowsTranslation = false
    sceneView.cameraControlConfiguration.autoSwitchToFreeCamera = false
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
      let scene = try SCNScene(url: url, options: [
        .checkConsistency: true,
      ])
      sceneView.scene = scene
      modelContainer = HologramLoader.apply(preset: preset, to: scene, sceneView: sceneView)
      updateAutoRotate()
      print("✅ HologramSceneView: loaded \(fileName).usdz (\(preset.rawValue))")
    } catch {
      print("❌ HologramSceneView: failed to load \(fileName): \(error)")
      HologramLoader.showPlaceholder(in: sceneView)
    }
  }

  private func updateAutoRotate() {
    guard let node = modelContainer else { return }
    node.removeAction(forKey: "idleSpin")
    guard autoRotate else { return }
    let spin = SCNAction.repeatForever(SCNAction.rotateBy(x: 0, y: .pi * 2, z: 0, duration: 28))
    node.runAction(spin, forKey: "idleSpin")
  }
}

// MARK: - Loader (mirrors native Hologram*3DView / BeatingHeart3DView)

enum HologramLoader {
  /// On-Demand Resource tag reserved for future large packs (App Store only).
  /// Simulator/local debug does not reliably serve ODR, so models ship in the base bundle.
  static let onDemandTag = "holograms_large"

  /// Empty while models are bundled — ODR download path kept for a future App Store setup.
  static let onDemandModels: Set<String> = []

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

  static func requiresOnDemandDownload(_ fileName: String) -> Bool {
    onDemandModels.contains(fileName)
  }

  static func bundleURL(for fileName: String) -> URL? {
    let candidates = [
      Bundle.main.url(forResource: fileName, withExtension: "usdz", subdirectory: "Models"),
      Bundle.main.url(forResource: fileName, withExtension: "usdz"),
    ].compactMap { $0 }
    if let hit = candidates.first { return hit }

    // Debug / local ODR: asset packs live next to the .app under OnDemandResources/
    if let resourceURL = Bundle.main.resourceURL {
      let odrRoot = resourceURL
        .deletingLastPathComponent()
        .appendingPathComponent("OnDemandResources", isDirectory: true)
      if let enumerator = FileManager.default.enumerator(
        at: odrRoot,
        includingPropertiesForKeys: nil,
        options: [.skipsHiddenFiles]
      ) {
        let target = "\(fileName).usdz"
        for case let fileURL as URL in enumerator where fileURL.lastPathComponent == target {
          return fileURL
        }
      }
    }
    return nil
  }

  @discardableResult
  static func apply(preset: Preset, to scene: SCNScene, sceneView: SCNView) -> SCNNode {
    let root = scene.rootNode
    playEmbeddedAnimations(on: root)
    sceneView.isPlaying = true
    sceneView.autoenablesDefaultLighting = false

    if preset == .beatingHeart {
      applyBeatingHeart(to: scene, sceneView: sceneView)
      return root
    }

    var targetSize: Float = 2.2
    var fieldOfView: CGFloat = 55
    var fill: Float = 1.35
    var accent: UIColor = .cyan
    var accentIntensity: CGFloat = 900
    let naturalColor = (preset == .anatomy || preset == .ecorche)

    switch preset {
    case .brain:
      targetSize = 2.2
      fieldOfView = 50
      fill = 1.28
    case .anatomy:
      targetSize = 2.2
      fieldOfView = 50
      fill = 1.28
      // Warm key light — avoid peach wash that turns muscle into salmon
      accent = UIColor(red: 1.0, green: 0.92, blue: 0.88, alpha: 1)
      accentIntensity = 320
    case .lung:
      targetSize = 2.25
      fill = 1.3
    case .stomach:
      targetSize = 2.1
      fieldOfView = 48
      fill = 1.22
    case .skeleton:
      targetSize = 2.35
      fill = 1.32
    case .ecorche:
      targetSize = 2.35
      fill = 1.32
      accent = UIColor(red: 1.0, green: 0.92, blue: 0.88, alpha: 1)
      accentIntensity = 320
    case .heartLungs:
      targetSize = 3.2
      fieldOfView = 52
      fill = 1.55
      accent = .white
    case .heartBronchial:
      targetSize = 3.0
      fieldOfView = 50
      fill = 1.4
      accent = .white
    case .beatingHeart:
      break
    }

    let (_, rawDimension) = modelBounds(for: root)
    let maxDimension = max(rawDimension, 0.001)
    let appliedScale = min(max(targetSize / maxDimension, 0.01), 80)

    let container = centerModel(in: scene, scale: appliedScale)
    if naturalColor {
      applyNaturalAnatomyMaterials(on: container, splitSkeleton: preset == .anatomy)
    }
    scene.lightingEnvironment.contents = UIColor(white: naturalColor ? 0.88 : 0.55, alpha: 1)
    scene.lightingEnvironment.intensity = naturalColor ? 1.35 : 0.85
    addLights(to: scene.rootNode, accent: accent, accentIntensity: accentIntensity, naturalColor: naturalColor)

    let (_, framed) = modelBounds(for: root)
    let visible = max(framed, 0.5)
    let fov = Float(fieldOfView) * .pi / 180
    let cameraDistance = max((visible / 2) / tan(fov / 2) * fill, 1.2)

    setupCamera(on: sceneView, in: scene, distance: cameraDistance, fieldOfView: fieldOfView, hdr: naturalColor)

    DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) {
      guard let cameraNode = sceneView.pointOfView else { return }
      let (_, lateSize) = modelBounds(for: root)
      let vis = max(lateSize, 0.5)
      let dist = max((vis / 2) / tan(fov / 2) * fill, 1.2)
      cameraNode.position = SCNVector3(0, 0, dist)
      cameraNode.look(at: SCNVector3(0, 0, 0))
      sceneView.defaultCameraController.target = SCNVector3(0, 0, 0)
    }
    return container
  }

  /// Skinned/morph USDZ — keep the hierarchy intact, but scale/center the top-level
  /// content so the embedded AR camera cannot leave us inside the mesh.
  private static func applyBeatingHeart(to scene: SCNScene, sceneView: SCNView) {
    let root = scene.rootNode
    revealMaterials(on: root)
    disableEmbeddedCameras(in: root)
    addLights(to: root, accent: .red, accentIntensity: 1200, naturalColor: false)
    playEmbeddedAnimations(on: root)
    sceneView.isPlaying = true
    sceneView.autoenablesDefaultLighting = true
    sceneView.cameraControlConfiguration.autoSwitchToFreeCamera = false
    sceneView.cameraControlConfiguration.allowsTranslation = false

    let targetSize: Float = 1.45
    let fieldOfView: CGFloat = 52
    let fill: Float = 2.8
    normalizeContent(in: root, targetSize: targetSize)
    frameCameraOnOrigin(in: scene, sceneView: sceneView, fieldOfView: fieldOfView, fill: fill)

    DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) {
      normalizeContent(in: root, targetSize: targetSize)
      frameCameraOnOrigin(in: scene, sceneView: sceneView, fieldOfView: fieldOfView, fill: fill)
    }
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.9) {
      frameCameraOnOrigin(in: scene, sceneView: sceneView, fieldOfView: fieldOfView, fill: fill)
    }
  }

  private static func disableEmbeddedCameras(in root: SCNNode) {
    root.enumerateHierarchy { node, _ in
      guard node.camera != nil, node.name != "WellnessShiftFramingCamera" else { return }
      node.isHidden = true
      node.camera = nil
    }
  }

  /// Move the visible mesh to the origin and scale it to a known size. Does not reparent.
  private static func normalizeContent(in root: SCNNode, targetSize: Float) {
    let (center, dim) = modelBounds(for: root)
    guard dim > 1e-5 else { return }
    let scale = min(max(targetSize / dim, 0.02), 25)
    let offset = sqrt(center.x * center.x + center.y * center.y + center.z * center.z)
    if abs(scale - 1) < 0.12 && offset < 0.08 { return }
    let content = root.childNodes.filter {
      $0.name != "WellnessShiftFramingCamera" && $0.camera == nil && $0.light == nil
    }
    for node in content {
      let local = node.convertPosition(center, from: root)
      node.pivot = SCNMatrix4Mult(node.pivot, SCNMatrix4MakeTranslation(local.x, local.y, local.z))
      node.position = SCNVector3Zero
      node.scale = SCNVector3(node.scale.x * scale, node.scale.y * scale, node.scale.z * scale)
    }
  }

  private static func frameCameraOnOrigin(
    in scene: SCNScene,
    sceneView: SCNView,
    fieldOfView: CGFloat,
    fill: Float
  ) {
    let root = scene.rootNode
    let (_, maxDimension) = modelBounds(for: root)
    let visible = max(maxDimension, 0.8)
    let fov = Float(fieldOfView) * .pi / 180
    let distance = max((visible / 2) / tan(fov / 2) * fill, 3.4)

    let cameraNode: SCNNode
    if let existing = root.childNode(withName: "WellnessShiftFramingCamera", recursively: false),
       existing.camera != nil {
      cameraNode = existing
    } else {
      cameraNode = SCNNode()
      cameraNode.name = "WellnessShiftFramingCamera"
      cameraNode.camera = SCNCamera()
      root.addChildNode(cameraNode)
    }
    cameraNode.isHidden = false
    cameraNode.camera?.fieldOfView = fieldOfView
    cameraNode.camera?.zNear = 0.05
    cameraNode.camera?.zFar = 120
    cameraNode.camera?.automaticallyAdjustsZRange = false
    cameraNode.position = SCNVector3(0, 0, distance)
    cameraNode.eulerAngles = SCNVector3Zero
    cameraNode.look(at: SCNVector3Zero)
    sceneView.pointOfView = cameraNode
    sceneView.defaultCameraController.pointOfView = cameraNode
    sceneView.defaultCameraController.target = SCNVector3Zero
  }

  private static func revealMaterials(on root: SCNNode) {
    root.enumerateHierarchy { node, _ in
      node.isHidden = false
      node.opacity = 1
      guard let geometry = node.geometry else { return }
      for material in geometry.materials {
        material.isDoubleSided = true
        if material.diffuse.contents == nil {
          material.diffuse.contents = UIColor.systemPink
        }
        // Specular-gloss USDZs often shade black in SceneKit without IBL.
        if material.emission.contents == nil {
          material.emission.contents = material.diffuse.contents
          material.emission.intensity = 0.45
        }
      }
    }
  }

  private static func playEmbeddedAnimations(on root: SCNNode) {
    root.enumerateHierarchy { node, _ in
      for key in node.animationKeys {
        node.animationPlayer(forKey: key)?.play()
      }
    }
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
      if node.camera != nil || node.light != nil || node.name == "WellnessShiftFramingCamera" {
        return
      }
      guard node.geometry != nil else { return }
      hasGeometry = true
      let boundingBox = node.presentation.boundingBox
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
    var maxDimension = max(modelSize.x, max(modelSize.y, modelSize.z))
    if maxDimension < 1e-4 {
      let sphere = root.boundingSphere
      if sphere.radius > 1e-4 {
        return (sphere.center, sphere.radius * 2)
      }
    }
    return (center, maxDimension)
  }

  @discardableResult
  private static func centerModel(in scene: SCNScene, scale: Float) -> SCNNode {
    let root = scene.rootNode
    let (center, _) = modelBounds(for: root)

    let container = SCNNode()
    container.position = SCNVector3(-center.x * scale, -center.y * scale, -center.z * scale)
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

    let (centered, _) = modelBounds(for: root)
    container.position.x -= centered.x
    container.position.y -= centered.y
    container.position.z -= centered.z
    return container
  }

  private static func applyNaturalAnatomyMaterials(on root: SCNNode, splitSkeleton: Bool) {
    // Deep anatomical muscle — crimson/maroon rather than flat coral
    let muscle = UIColor(red: 0.55, green: 0.20, blue: 0.22, alpha: 1)
    let bone = UIColor(red: 0.95, green: 0.93, blue: 0.90, alpha: 1)
    let muscleRGB = SIMD3<Float>(0.55, 0.20, 0.22)
    let boneRGB = SIMD3<Float>(0.95, 0.93, 0.90)

    root.enumerateHierarchy { node, _ in
      node.isHidden = false
      node.opacity = 1
      guard let geometry = node.geometry else { return }

      for material in geometry.materials {
        material.isDoubleSided = true
        material.lightingModel = .physicallyBased
        material.metalness.contents = 0.04
        material.roughness.contents = 0.62
        material.emission.contents = UIColor.black
        material.emission.intensity = 0
      }

      guard splitSkeleton else {
        for material in geometry.materials {
          if isNearWhite(material.diffuse.contents) {
            material.diffuse.contents = muscle
            material.metalness.contents = 0.03
            material.roughness.contents = 0.68
          }
        }
        return
      }

      let (minX, maxX) = xExtents(of: node, in: root)
      let centerX = (minX + maxX) / 2
      let straddles = minX < -0.02 && maxX > 0.02 && (maxX - minX) > 0.08

      if straddles, let colored = geometryWithSplitVertexColors(
        geometry,
        node: node,
        root: root,
        muscle: muscleRGB,
        bone: boneRGB
      ) {
        colored.materials = geometry.materials
        for material in colored.materials {
          material.lightingModel = .physicallyBased
          material.diffuse.contents = UIColor.white
          material.metalness.contents = 0.03
          material.roughness.contents = 0.66
          material.locksAmbientWithDiffuse = true
        }
        node.geometry = colored
      } else {
        let isBone = centerX >= 0
        let color = isBone ? bone : muscle
        for material in geometry.materials {
          material.diffuse.contents = color
          if isBone {
            material.metalness.contents = 0.12
            material.roughness.contents = 0.42
          } else {
            material.metalness.contents = 0.03
            material.roughness.contents = 0.68
          }
        }
      }
    }
  }

  private static func xExtents(of node: SCNNode, in root: SCNNode) -> (Float, Float) {
    let box = node.boundingBox
    let corners = [
      SCNVector3(box.min.x, box.min.y, box.min.z),
      SCNVector3(box.min.x, box.min.y, box.max.z),
      SCNVector3(box.min.x, box.max.y, box.min.z),
      SCNVector3(box.min.x, box.max.y, box.max.z),
      SCNVector3(box.max.x, box.min.y, box.min.z),
      SCNVector3(box.max.x, box.min.y, box.max.z),
      SCNVector3(box.max.x, box.max.y, box.min.z),
      SCNVector3(box.max.x, box.max.y, box.max.z),
    ]
    var minX = Float.greatestFiniteMagnitude
    var maxX = -Float.greatestFiniteMagnitude
    for corner in corners {
      let local = node.convertPosition(corner, to: root)
      minX = min(minX, local.x)
      maxX = max(maxX, local.x)
    }
    return (minX, maxX)
  }

  private static func geometryWithSplitVertexColors(
    _ geometry: SCNGeometry,
    node: SCNNode,
    root: SCNNode,
    muscle: SIMD3<Float>,
    bone: SIMD3<Float>
  ) -> SCNGeometry? {
    guard let vertexSource = geometry.sources(for: .vertex).first,
          vertexSource.usesFloatComponents,
          vertexSource.componentsPerVector >= 3 else { return nil }

    let count = vertexSource.vectorCount
    let stride = vertexSource.dataStride
    let offset = vertexSource.dataOffset
    var colors = [Float](repeating: 0, count: count * 3)

    vertexSource.data.withUnsafeBytes { buffer in
      guard let base = buffer.baseAddress else { return }
      for i in 0..<count {
        let ptr = base.advanced(by: i * stride + offset).assumingMemoryBound(to: Float.self)
        let local = node.convertPosition(SCNVector3(ptr[0], ptr[1], ptr[2]), to: root)
        let t = min(max((local.x + 0.015) / 0.03, 0), 1)
        let rgb = muscle + (bone - muscle) * t
        colors[i * 3] = rgb.x
        colors[i * 3 + 1] = rgb.y
        colors[i * 3 + 2] = rgb.z
      }
    }

    let colorSource = SCNGeometrySource(
      data: Data(bytes: colors, count: colors.count * MemoryLayout<Float>.size),
      semantic: .color,
      vectorCount: count,
      usesFloatComponents: true,
      componentsPerVector: 3,
      bytesPerComponent: MemoryLayout<Float>.size,
      dataOffset: 0,
      dataStride: MemoryLayout<Float>.size * 3
    )
    let sources = geometry.sources.filter { $0.semantic != .color } + [colorSource]
    return SCNGeometry(sources: sources, elements: geometry.elements)
  }

  private static func isNearWhite(_ contents: Any?) -> Bool {
    guard let color = contents as? UIColor else { return contents == nil }
    var r: CGFloat = 0, g: CGFloat = 0, b: CGFloat = 0, a: CGFloat = 0
    if color.getRed(&r, green: &g, blue: &b, alpha: &a) {
      let maxC = max(r, max(g, b))
      let minC = min(r, min(g, b))
      let sat = maxC > 0.001 ? (maxC - minC) / maxC : 0
      return sat < 0.18 && maxC > 0.4
    }
    var w: CGFloat = 0
    if color.getWhite(&w, alpha: &a) {
      return w > 0.4
    }
    return false
  }

  private static func addLights(to root: SCNNode, accent: UIColor, accentIntensity: CGFloat, naturalColor: Bool = false) {
    let directional = SCNNode()
    directional.light = SCNLight()
    directional.light?.type = .directional
    directional.light?.intensity = naturalColor ? 1100 : 1600
    directional.light?.color = naturalColor ? UIColor(red: 1, green: 0.97, blue: 0.94, alpha: 1) : UIColor.white
    directional.position = SCNVector3(3.2, 4.5, 3.8)
    directional.eulerAngles = SCNVector3(-Float.pi / 5, Float.pi / 7, 0)
    root.addChildNode(directional)

    let fill = SCNNode()
    fill.light = SCNLight()
    fill.light?.type = .directional
    fill.light?.intensity = naturalColor ? 520 : 800
    fill.light?.color = UIColor.white
    fill.position = SCNVector3(-2.4, 1.8, 2.2)
    root.addChildNode(fill)

    let ambient = SCNNode()
    ambient.light = SCNLight()
    ambient.light?.type = .ambient
    ambient.light?.intensity = naturalColor ? 420 : 700
    ambient.light?.color = UIColor.white
    root.addChildNode(ambient)

    let accentLight = SCNNode()
    accentLight.light = SCNLight()
    accentLight.light?.type = .directional
    accentLight.light?.intensity = accentIntensity
    accentLight.position = SCNVector3(-1.6, 0.4, -2.4)
    accentLight.light?.color = accent
    root.addChildNode(accentLight)
  }

  private static func setupCamera(on sceneView: SCNView, in scene: SCNScene, distance: Float, fieldOfView: CGFloat, hdr: Bool = false) {
    let cameraNode = SCNNode()
    cameraNode.camera = SCNCamera()
    cameraNode.camera?.fieldOfView = fieldOfView
    cameraNode.camera?.automaticallyAdjustsZRange = true
    cameraNode.camera?.wantsHDR = hdr
    cameraNode.position = SCNVector3(0, 0, distance)
    cameraNode.look(at: SCNVector3(0, 0, 0))
    scene.rootNode.addChildNode(cameraNode)
    sceneView.pointOfView = cameraNode
    sceneView.defaultCameraController.target = SCNVector3(0, 0, 0)
    sceneView.defaultCameraController.pointOfView = cameraNode
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
