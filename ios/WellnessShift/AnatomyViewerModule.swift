// ios/WellnessShift/AnatomyViewerModule.swift
// Native module that opens your existing SceneKit/RealityKit anatomy viewer
// from React Native. Add this file to your Xcode project target.

import Foundation
import UIKit
import SceneKit  // Change to RealityKit if you use ARKit/RealityKit

@objc(AnatomyViewerModule)
class AnatomyViewerModule: NSObject {

  // Maps RN model IDs to your actual asset file names
  private let assetMap: [String: (file: String, preset: String)] = [
    "heart-hologram": ("Beating-heart", "beatingHeart"),
    "heart-lungs-hologram": ("adult_heart_and_lungs", "heartLungs"),
    "heart-conduction-system": ("adult_heart_and_bronchial_airways", "heartBronchial"),
    "brain-model": ("Brain_hologram", "brain"),
    "lung-model": ("Struktur_Paru-Paru_Manusia_3D_Model", "lung"),
    "stomach-model": ("Realistic_Human_Stomach", "stomach"),
    "skeleton-model": ("Free_Pack_-_Human_Skeleton", "skeleton"),
    "muscle-model": ("Male_Full_Body_Ecorche", "ecorche"),
    "anatomy-study": ("Ecorche_-_Anatomy_study", "anatomy"),
  ]

  @objc(openModel:)
  func openModel(_ modelId: String) {
    guard let mapping = assetMap[modelId] else {
      print("AnatomyViewerModule: unknown modelId '\(modelId)'")
      return
    }

    DispatchQueue.main.async {
      guard let rootVC = UIApplication.shared.connectedScenes
        .compactMap({ $0 as? UIWindowScene })
        .first?.windows
        .first?.rootViewController else { return }

      let viewerVC = HologramFullscreenViewController(
        modelFile: mapping.file,
        preset: mapping.preset
      )
      viewerVC.modalPresentationStyle = .fullScreen
      rootVC.present(viewerVC, animated: true)
    }
  }

  @objc static func requiresMainQueueSetup() -> Bool { return false }
}

class HologramFullscreenViewController: UIViewController {
  private let modelFile: String
  private let preset: String
  private let hologramView = HologramSceneUIView()

  init(modelFile: String, preset: String) {
    self.modelFile = modelFile
    self.preset = preset
    super.init(nibName: nil, bundle: nil)
  }

  required init?(coder: NSCoder) { fatalError() }

  override func viewDidLoad() {
    super.viewDidLoad()
    view.backgroundColor = .black
    hologramView.translatesAutoresizingMaskIntoConstraints = false
    hologramView.modelFile = modelFile as NSString
    hologramView.preset = preset as NSString
    view.addSubview(hologramView)

    let close = UIButton(type: .system)
    close.setTitle("✕  Close", for: .normal)
    close.tintColor = .white
    close.backgroundColor = UIColor.white.withAlphaComponent(0.15)
    close.layer.cornerRadius = 20
    close.contentEdgeInsets = UIEdgeInsets(top: 8, left: 16, bottom: 8, right: 16)
    close.translatesAutoresizingMaskIntoConstraints = false
    close.addTarget(self, action: #selector(closeTapped), for: .touchUpInside)
    view.addSubview(close)

    NSLayoutConstraint.activate([
      hologramView.topAnchor.constraint(equalTo: view.topAnchor),
      hologramView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
      hologramView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
      hologramView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
      close.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 16),
      close.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
    ])
  }

  @objc private func closeTapped() {
    dismiss(animated: true)
  }
}

// Legacy fullscreen viewer (kept for reference)
class AnatomyViewerViewController: UIViewController {

  private let assetName: String
  private let modelId: String
  private var sceneView: SCNView!

  init(assetName: String, modelId: String) {
    self.assetName = assetName
    self.modelId = modelId
    super.init(nibName: nil, bundle: nil)
  }

  required init?(coder: NSCoder) { fatalError() }

  override func viewDidLoad() {
    super.viewDidLoad()
    view.backgroundColor = .black
    setupSceneView()
    setupCloseButton()
    loadModel()
  }

  private func setupSceneView() {
    sceneView = SCNView(frame: view.bounds)
    sceneView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    sceneView.backgroundColor = .black
    sceneView.allowsCameraControl = true   // pinch to zoom, drag to rotate
    sceneView.autoenablesDefaultLighting = false
    sceneView.showsStatistics = false
    sceneView.antialiasingMode = .multisampling4X
    sceneView.isJitteringEnabled = false
    sceneView.preferredFramesPerSecond = 60
    sceneView.cameraControlConfiguration.allowsTranslation = false
    sceneView.cameraControlConfiguration.autoSwitchToFreeCamera = false
    view.addSubview(sceneView)
  }

  private func loadModel() {
    // Try .scn first, then .usdz
    if let scene = SCNScene(named: "\(assetName).scn") {
      sceneView.scene = scene
    } else if let scene = SCNScene(named: "\(assetName).usdz") {
      sceneView.scene = scene
    } else {
      // Fallback: show a placeholder sphere
      let scene = SCNScene()
      let sphere = SCNSphere(radius: 1.0)
      sphere.firstMaterial?.diffuse.contents = UIColor.systemPink
      let node = SCNNode(geometry: sphere)
      scene.rootNode.addChildNode(node)
      sceneView.scene = scene

      let label = UILabel()
      label.text = "Asset '\(assetName)' not found\nAdd the .scn or .usdz file to your Xcode project"
      label.numberOfLines = 0
      label.textAlignment = .center
      label.textColor = .white
      label.font = .systemFont(ofSize: 14)
      label.translatesAutoresizingMaskIntoConstraints = false
      view.addSubview(label)
      NSLayoutConstraint.activate([
        label.centerXAnchor.constraint(equalTo: view.centerXAnchor),
        label.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -80),
        label.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
        label.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
      ])
    }

    guard let scene = sceneView.scene else { return }

    // Center and normalize the model
    normalizeModel(in: scene)

    // Studio lighting for clean hologram look
    setupLighting(in: scene)

    // Camera with good default framing
    setupCamera(in: scene)

    // Hologram-style auto-rotation
    startIdleRotation(in: scene)
  }

  private func normalizeModel(in scene: SCNScene) {
    let root = scene.rootNode
    var minVec = SCNVector3(x: Float.greatestFiniteMagnitude, y: Float.greatestFiniteMagnitude, z: Float.greatestFiniteMagnitude)
    var maxVec = SCNVector3(x: -Float.greatestFiniteMagnitude, y: -Float.greatestFiniteMagnitude, z: -Float.greatestFiniteMagnitude)
    var hasGeometry = false

    root.enumerateChildNodes { node, _ in
      guard let geometry = node.geometry else { return }
      hasGeometry = true
      let boundingBox = node.boundingBox
      let worldMin = node.convertPosition(boundingBox.min, to: nil)
      let worldMax = node.convertPosition(boundingBox.max, to: nil)
      minVec.x = min(minVec.x, worldMin.x)
      minVec.y = min(minVec.y, worldMin.y)
      minVec.z = min(minVec.z, worldMin.z)
      maxVec.x = max(maxVec.x, worldMax.x)
      maxVec.y = max(maxVec.y, worldMax.y)
      maxVec.z = max(maxVec.z, worldMax.z)
    }

    guard hasGeometry else { return }
    let size = SCNVector3(
      x: maxVec.x - minVec.x,
      y: maxVec.y - minVec.y,
      z: maxVec.z - minVec.z
    )
    let maxDim = max(size.x, max(size.y, size.z))
    let scale = maxDim > 0 ? 1.5 / maxDim : 1.0

    let center = SCNVector3(
      x: (minVec.x + maxVec.x) / 2,
      y: (minVec.y + maxVec.y) / 2,
      z: (minVec.z + maxVec.z) / 2
    )

    let container = SCNNode()
    container.position = SCNVector3(x: -center.x * scale, y: -center.y * scale, z: -center.z * scale)
    container.scale = SCNVector3(x: scale, y: scale, z: scale)

    let children = root.childNodes
    for child in children {
      child.removeFromParentNode()
      container.addChildNode(child)
    }
    root.addChildNode(container)

    // Apply subtle hologram material tint to untextured geometry
    root.enumerateChildNodes { node, _ in
      guard let material = node.geometry?.firstMaterial else { return }
      if material.diffuse.contents is UIColor {
        material.lightingModel = .physicallyBased
        material.roughness.contents = 0.35
        material.metalness.contents = 0.1
      }
    }
  }

  private func setupLighting(in scene: SCNScene) {
    // Ambient fill
    let ambient = SCNNode()
    ambient.light = SCNLight()
    ambient.light?.type = .ambient
    ambient.light?.color = UIColor(white: 0.7, alpha: 1.0)
    ambient.light?.intensity = 800
    scene.rootNode.addChildNode(ambient)

    // Key light
    let keyLight = SCNNode()
    keyLight.light = SCNLight()
    keyLight.light?.type = .directional
    keyLight.light?.color = UIColor(white: 1.0, alpha: 1.0)
    keyLight.light?.intensity = 1200
    keyLight.light?.castsShadow = true
    keyLight.position = SCNVector3(x: 5, y: 5, z: 8)
    keyLight.eulerAngles = SCNVector3(x: -Float.pi / 4, y: Float.pi / 6, z: 0)
    scene.rootNode.addChildNode(keyLight)

    // Rim light for hologram edge definition
    let rimLight = SCNNode()
    rimLight.light = SCNLight()
    rimLight.light?.type = .directional
    rimLight.light?.color = UIColor(red: 0.6, green: 0.8, blue: 1.0, alpha: 1.0)
    rimLight.light?.intensity = 600
    rimLight.position = SCNVector3(x: -5, y: 2, z: -5)
    rimLight.eulerAngles = SCNVector3(x: 0, y: -Float.pi / 3, z: 0)
    scene.rootNode.addChildNode(rimLight)

    // Ground reflection plane
    let plane = SCNFloor()
    plane.reflectivity = 0.18
    plane.firstMaterial?.diffuse.contents = UIColor.clear
    plane.firstMaterial?.writesToDepthBuffer = false
    let floorNode = SCNNode(geometry: plane)
    floorNode.position = SCNVector3(x: 0, y: -1.0, z: 0)
    scene.rootNode.addChildNode(floorNode)
  }

  private func setupCamera(in scene: SCNScene) {
    let cameraNode = SCNNode()
    cameraNode.camera = SCNCamera()
    cameraNode.camera?.wantsHDR = true
    cameraNode.camera?.wantsExposureAdaptation = false
    cameraNode.camera?.fieldOfView = 45
    cameraNode.position = SCNVector3(x: 0, y: 0.4, z: 3.5)
    cameraNode.eulerAngles = SCNVector3(x: -0.05, y: 0, z: 0)
    cameraNode.camera?.automaticallyAdjustsZRange = true
    scene.rootNode.addChildNode(cameraNode)
  }

  private func startIdleRotation(in scene: SCNScene) {
    let rotation = CABasicAnimation(keyPath: "rotation")
    rotation.fromValue = SCNVector4(x: 0, y: 1, z: 0, w: 0)
    rotation.toValue = SCNVector4(x: 0, y: 1, z: 0, w: Float.pi * 2)
    rotation.duration = 24
    rotation.repeatCount = .greatestFiniteMagnitude
    scene.rootNode.addAnimation(rotation, forKey: "hologramRotation")
  }

  private func setupCloseButton() {
    let btn = UIButton(type: .system)
    var config = UIButton.Configuration.plain()
    config.title = "✕  Close"
    config.baseForegroundColor = .white
    config.background.backgroundColor = UIColor.white.withAlphaComponent(0.15)
    config.background.cornerRadius = 20
    config.contentInsets = NSDirectionalEdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16)
    btn.configuration = config
    btn.translatesAutoresizingMaskIntoConstraints = false
    btn.addTarget(self, action: #selector(closeTapped), for: .touchUpInside)
    view.addSubview(btn)
    NSLayoutConstraint.activate([
      btn.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 16),
      btn.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
    ])
  }

  @objc private func closeTapped() {
    dismiss(animated: true)
  }
}
