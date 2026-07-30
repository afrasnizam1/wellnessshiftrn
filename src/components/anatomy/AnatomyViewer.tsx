// src/components/anatomy/AnatomyViewer.tsx
import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GLView } from 'expo-gl';
import { Gyroscope } from 'expo-sensors';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Colors, Typography, Spacing, Radius } from '../../theme';

interface AnatomyModel {
  id: string;
  name: string;
  modelUrl: string;
  systems: string[];
  hotspots: Array<{
    id: string;
    name: string;
    description: string;
    position: [number, number, number];
    system: string;
  }>;
}

interface AnatomyViewerProps {
  model: AnatomyModel;
  onHotspotPress?: (hotspot: any) => void;
  showControls?: boolean;
  autoRotate?: boolean;
  enableGyroscope?: boolean;
}

const ANATOMY_MODELS: Record<string, AnatomyModel> = {
  humanSkeleton: {
    id: 'humanSkeleton',
    name: 'Human Skeleton',
    modelUrl: 'https://assets.wellnessshift.co/models/anatomy/skeleton.glb',
    systems: ['skeletal', 'joints', 'ligaments'],
    hotspots: [
      {
        id: 'skull',
        name: 'Skull',
        description: 'Protects the brain and supports facial structures',
        position: [0, 1.2, 0],
        system: 'skeletal',
      },
      {
        id: 'spine',
        name: 'Spinal Column',
        description: 'Provides support and flexibility for the body',
        position: [0, 0.6, 0],
        system: 'skeletal',
      },
      {
        id: 'ribcage',
        name: 'Rib Cage',
        description: 'Protects vital organs like heart and lungs',
        position: [0, 0.8, 0.2],
        system: 'skeletal',
      },
    ],
  },
  muscularSystem: {
    id: 'muscularSystem',
    name: 'Muscular System',
    modelUrl: 'https://assets.wellnessshift.co/models/anatomy/muscles.glb',
    systems: ['muscles', 'tendons', 'fascia'],
    hotspots: [
      {
        id: 'heart',
        name: 'Heart',
        description: 'Pumps blood throughout the body',
        position: [0, 0.7, 0.1],
        system: 'muscles',
      },
      {
        id: 'diaphragm',
        name: 'Diaphragm',
        description: 'Primary muscle for breathing',
        position: [0, 0.5, 0],
        system: 'muscles',
      },
    ],
  },
  circulatorySystem: {
    id: 'circulatorySystem',
    name: 'Circulatory System',
    modelUrl: 'https://assets.wellnessshift.co/models/anatomy/circulatory.glb',
    systems: ['heart', 'arteries', 'veins'],
    hotspots: [
      {
        id: 'heart',
        name: 'Heart',
        description: 'Central organ of circulatory system',
        position: [0, 0.7, 0.1],
        system: 'heart',
      },
      {
        id: 'aorta',
        name: 'Aorta',
        description: 'Largest artery in the body',
        position: [0.1, 0.7, 0],
        system: 'arteries',
      },
    ],
  },
};

export default function AnatomyViewer({
  model,
  onHotspotPress,
  showControls = true,
  autoRotate = true,
  enableGyroscope = false,
}: AnatomyViewerProps) {
  const glViewRef = useRef<any>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<number>(0);
  
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSystem, setSelectedSystem] = useState<string>('all');
  const [hotspots, setHotspots] = useState(model.hotspots);
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (enableGyroscope) {
      Gyroscope.setUpdateInterval(16);
      const subscription = Gyroscope.addListener((data) => {
        setGyroscopeData({
          x: data.x,
          y: data.y,
          z: data.z,
        });
      });
      return () => subscription.remove();
    }
  }, [enableGyroscope]);

  useEffect(() => {
    const filteredHotspots = selectedSystem === 'all' 
      ? model.hotspots 
      : model.hotspots.filter(h => h.system === selectedSystem);
    setHotspots(filteredHotspots);
  }, [selectedSystem, model.hotspots]);

  const initializeScene = (gl: any) => {
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 3);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: gl,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setPixelRatio(gl.drawingBufferWidth / gl.drawingBufferHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    rendererRef.current = renderer;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Add controls
    const controls = new OrbitControls(camera, gl);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = false;
    controls.minDistance = 1.5;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI * 0.9;
    controlsRef.current = controls;

    // Load model
    loadModel(scene);

    // Start animation loop
    animate();

    setIsLoading(false);
  };

  const loadModel = async (scene: THREE.Scene) => {
    try {
      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(model.modelUrl);
      const modelScene = gltf.scene;
      
      // Center and scale model
      const box = new THREE.Box3().setFromObject(modelScene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      modelScene.position.sub(center);
      const scale = 2 / Math.max(size.x, size.y, size.z);
      modelScene.scale.setScalar(scale);
      
      // Enable shadows
      modelScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Enhance materials
          if (child.material) {
            child.material = new THREE.MeshPhysicalMaterial({
              ...child.material,
              roughness: 0.7,
              metalness: 0.1,
              clearcoat: 0.1,
              clearcoatRoughness: 0.5,
            });
          }
        }
      });

      scene.add(modelScene);
      modelRef.current = modelScene;

      // Add hotspots
      addHotspots(scene);

    } catch (error) {
      console.warn('Failed to load 3D model:', error);
      // Load fallback geometry
      loadFallbackModel(scene);
    }
  };

  const loadFallbackModel = (scene: THREE.Scene) => {
    // Create a simple human figure as fallback
    const group = new THREE.Group();
    
    // Torso
    const torsoGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.2, 8);
    const torsoMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfdbcb4,
      roughness: 0.7,
      metalness: 0.1,
    });
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    torso.position.y = 0.6;
    torso.castShadow = true;
    group.add(torso);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const head = new THREE.Mesh(headGeometry, torsoMaterial);
    head.position.y = 1.5;
    head.castShadow = true;
    group.add(head);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.8, 8);
    const leftArm = new THREE.Mesh(armGeometry, torsoMaterial);
    leftArm.position.set(-0.5, 0.8, 0);
    leftArm.rotation.z = Math.PI / 6;
    leftArm.castShadow = true;
    group.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, torsoMaterial);
    rightArm.position.set(0.5, 0.8, 0);
    rightArm.rotation.z = -Math.PI / 6;
    rightArm.castShadow = true;
    group.add(rightArm);

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.12, 1.0, 8);
    const leftLeg = new THREE.Mesh(legGeometry, torsoMaterial);
    leftLeg.position.set(-0.2, -0.5, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, torsoMaterial);
    rightLeg.position.set(0.2, -0.5, 0);
    rightLeg.castShadow = true;
    group.add(rightLeg);

    scene.add(group);
    modelRef.current = group;

    // Add hotspots
    addHotspots(scene);
  };

  const addHotspots = (scene: THREE.Scene) => {
    hotspots.forEach((hotspot) => {
      const geometry = new THREE.SphereGeometry(0.05, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: 0xff4444,
        transparent: true,
        opacity: 0.8,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...hotspot.position);
      mesh.userData = { hotspot, type: 'hotspot' };
      scene.add(mesh);

      // Add pulsing animation
      const pulseGeometry = new THREE.RingGeometry(0.05, 0.1, 16);
      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: 0xff4444,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      pulse.position.set(...hotspot.position);
      pulse.lookAt(new THREE.Vector3(0, hotspot.position[1], 1));
      pulse.userData = { type: 'pulse', originalScale: 1 };
      scene.add(pulse);
    });
  };

  const animate = () => {
    frameRef.current = requestAnimationFrame(animate);

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      // Auto-rotate model
      if (autoRotate && modelRef.current) {
        modelRef.current.rotation.y += 0.005;
      }

      // Apply gyroscope data
      if (enableGyroscope && modelRef.current) {
        modelRef.current.rotation.x += gyroscopeData.x * 0.01;
        modelRef.current.rotation.y += gyroscopeData.y * 0.01;
      }

      // Animate hotspots
      sceneRef.current.traverse((child) => {
        if (child.userData.type === 'pulse') {
          const scale = 1 + Math.sin(Date.now() * 0.003) * 0.3;
          child.scale.setScalar(scale);
        }
      });

      controlsRef.current?.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  const handleTouch = (event: any) => {
    if (!cameraRef.current || !sceneRef.current || !glViewRef.current) return;

    const { locationX, locationY } = event.nativeEvent;
    const rect = glViewRef.current.getBoundingClientRect();
    
    const mouse = new THREE.Vector2();
    mouse.x = ((locationX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((locationY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    const intersects = raycaster.intersectObjects(sceneRef.current.children, true);
    
    for (const intersect of intersects) {
      if (intersect.object.userData.hotspot) {
        onHotspotPress?.(intersect.object.userData.hotspot);
        break;
      }
    }
  };

  const onContextCreate = (gl: any) => {
    glViewRef.current = gl;
    initializeScene(gl);
  };

  return (
    <View style={styles.container}>
      <GLView
        style={styles.glView}
        onContextCreate={onContextCreate}
        onTouchStart={handleTouch}
      />
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading 3D Model...</Text>
        </View>
      )}

      {showControls && (
        <View style={styles.controls}>
          <View style={styles.systemSelector}>
            <TouchableOpacity
              style={[
                styles.systemButton,
                selectedSystem === 'all' && styles.systemButtonActive,
              ]}
              onPress={() => setSelectedSystem('all')}
            >
              <Text style={[
                styles.systemButtonText,
                selectedSystem === 'all' && styles.systemButtonTextActive,
              ]}>
                All Systems
              </Text>
            </TouchableOpacity>
            
            {model.systems.map((system) => (
              <TouchableOpacity
                key={system}
                style={[
                  styles.systemButton,
                  selectedSystem === system && styles.systemButtonActive,
                ]}
                onPress={() => setSelectedSystem(system)}
              >
                <Text style={[
                  styles.systemButtonText,
                  selectedSystem === system && styles.systemButtonTextActive,
                ]}>
                  {system.charAt(0).toUpperCase() + system.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  glView: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background + '80',
  },
  loadingText: {
    fontSize: Typography.size.base,
    color: Colors.text,
    fontWeight: '600',
  },
  controls: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: Spacing.md,
    right: Spacing.md,
  },
  systemSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    padding: Spacing.sm,
    borderRadius: Radius.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  systemButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    backgroundColor: Colors.backgroundSecondary,
  },
  systemButtonActive: {
    backgroundColor: Colors.primary,
  },
  systemButtonText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  systemButtonTextActive: {
    color: Colors.white,
  },
});

export { ANATOMY_MODELS };
export type { AnatomyModel };
