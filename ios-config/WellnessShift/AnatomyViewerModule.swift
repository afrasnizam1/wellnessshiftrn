// ios/WellnessShift/AnatomyViewerModule.swift
// Native module that opens your existing SceneKit/RealityKit anatomy viewer
// from React Native. Add this file to your Xcode project target.

import Foundation
import UIKit
import SceneKit  // Change to RealityKit if you use ARKit/RealityKit

@objc(AnatomyViewerModule)
class AnatomyViewerModule: NSObject {

  // Maps RN model IDs to your actual asset file names
  private let assetMap: [String: String] = [
    "heart-hologram": "HeartModel",      // → HeartModel.scn or .usdz
    "brain-model":    "BrainModel",
    "lung-model":     "LungModel",
    "stomach-model":  "StomachModel",
    "skeleton-model": "SkeletonModel",
    "muscle-model":   "MuscleModel",
    "nervous-system": "NervousSystem",
  ]

  @objc(openModel:)
  func openModel(_ modelId: String) {
    guard let assetName = assetMap[modelId] else {
      print("AnatomyViewerModule: unknown modelId '\(modelId)'")
      return
    }

    DispatchQueue.main.async {
      guard let rootVC = UIApplication.shared.connectedScenes
        .compactMap({ $0 as? UIWindowScene })
        .first?.windows
        .first?.rootViewController else { return }

      let viewerVC = AnatomyViewerViewController(assetName: assetName, modelId: modelId)
      viewerVC.modalPresentationStyle = .fullScreen
      rootVC.present(viewerVC, animated: true)
    }
  }

  @objc static func requiresMainQueueSetup() -> Bool { return false }
}

// ── Anatomy Viewer View Controller ────────────────────────────────────────────

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
    sceneView.autoenablesDefaultLighting = true
    sceneView.showsStatistics = false
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

    // Add a camera
    let cameraNode = SCNNode()
    cameraNode.camera = SCNCamera()
    cameraNode.position = SCNVector3(x: 0, y: 0, z: 3)
    sceneView.scene?.rootNode.addChildNode(cameraNode)
  }

  private func setupCloseButton() {
    let btn = UIButton(type: .system)
    btn.setTitle("✕  Close", for: .normal)
    btn.setTitleColor(.white, for: .normal)
    btn.titleLabel?.font = .systemFont(ofSize: 16, weight: .semibold)
    btn.backgroundColor = UIColor.white.withAlphaComponent(0.15)
    btn.layer.cornerRadius = 20
    btn.contentEdgeInsets = UIEdgeInsets(top: 8, left: 16, bottom: 8, right: 16)
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
