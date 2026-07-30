// src/screens/anatomy/AnatomyExplorerScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../components/common/AppScreen';
import { AppCard } from '../../components/ui';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { Screen } from '../../navigation/screenNames';
import AnatomyViewer, { ANATOMY_MODELS, type AnatomyModel } from '../../components/anatomy/AnatomyViewer';

interface AnatomyHotspot {
  id: string;
  name: string;
  description: string;
  position: [number, number, number];
  system: string;
}

const ANATOMY_CATEGORIES = [
  {
    id: 'skeletal',
    name: 'Skeletal System',
    description: 'Bones, joints, and connective tissues',
    icon: 'fitness-outline',
    color: Colors.textSecondary,
  },
  {
    id: 'muscular',
    name: 'Muscular System',
    description: 'Muscles, tendons, and fascia',
    icon: 'barbell-outline',
    color: '#FF6B6B',
  },
  {
    id: 'circulatory',
    name: 'Circulatory System',
    description: 'Heart, blood vessels, and blood',
    icon: 'heart-outline',
    color: '#FF4444',
  },
  {
    id: 'nervous',
    name: 'Nervous System',
    description: 'Brain, spinal cord, and nerves',
    icon: 'flash-outline',
    color: '#FFB800',
  },
  {
    id: 'respiratory',
    name: 'Respiratory System',
    description: 'Lungs and airways',
    icon: 'lungs-outline',
    color: '#4ECDC4',
  },
  {
    id: 'digestive',
    name: 'Digestive System',
    description: 'Stomach, intestines, and digestive organs',
    icon: 'nutrition-outline',
    color: '#95E77E',
  },
];

const LEARNING_MODULES = [
  {
    id: 'basics',
    title: 'Anatomy Basics',
    description: 'Fundamental concepts and terminology',
    duration: '15 min',
    difficulty: 'Beginner',
    icon: 'book-outline',
  },
  {
    id: 'skeletal',
    title: 'Skeletal System',
    description: 'Bone structure and joint mechanics',
    duration: '25 min',
    difficulty: 'Intermediate',
    icon: 'fitness-outline',
  },
  {
    id: 'muscles',
    title: 'Muscle Groups',
    description: 'Major muscles and their functions',
    duration: '20 min',
    difficulty: 'Intermediate',
    icon: 'barbell-outline',
  },
  {
    id: 'movement',
    title: 'Movement Patterns',
    description: 'How body systems work together',
    duration: '30 min',
    difficulty: 'Advanced',
    icon: 'walk-outline',
  },
];

export default function AnatomyExplorerScreen() {
  const navigation = useNavigation<any>();
  const [selectedModel, setSelectedModel] = useState<AnatomyModel>(ANATOMY_MODELS.humanSkeleton);
  const [selectedHotspot, setSelectedHotspot] = useState<AnatomyHotspot | null>(null);
  const [showHotspotModal, setShowHotspotModal] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [enableGyroscope, setEnableGyroscope] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleHotspotPress = (hotspot: AnatomyHotspot) => {
    setSelectedHotspot(hotspot);
    setShowHotspotModal(true);
    slideAnim.setValue(0);
    Animated.spring(slideAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 65,
      friction: 8,
    }).start();
  };

  const closeModal = () => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 8,
    }).start(() => {
      setShowHotspotModal(false);
      setSelectedHotspot(null);
    });
  };

  const selectModel = (modelId: string) => {
    const model = ANATOMY_MODELS[modelId as keyof typeof ANATOMY_MODELS];
    if (model) {
      setSelectedModel(model);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Anatomy Explorer</Text>
          <Text style={styles.subtitle}>Interactive 3D human anatomy learning</Text>
        </View>

        <AppCard style={styles.viewerCard}>
          <View style={styles.viewerHeader}>
            <Text style={styles.viewerTitle}>{selectedModel.name}</Text>
            <View style={styles.viewerControls}>
              <TouchableOpacity
                style={[
                  styles.controlButton,
                  autoRotate && styles.controlButtonActive,
                ]}
                onPress={() => setAutoRotate(!autoRotate)}
              >
                <Ionicons
                  name="refresh-outline"
                  size={20}
                  color={autoRotate ? Colors.white : Colors.textSecondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.controlButton,
                  enableGyroscope && styles.controlButtonActive,
                ]}
                onPress={() => setEnableGyroscope(!enableGyroscope)}
              >
                <Ionicons
                  name="phone-portrait-outline"
                  size={20}
                  color={enableGyroscope ? Colors.white : Colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.viewerContainer}>
            <AnatomyViewer
              model={selectedModel}
              onHotspotPress={handleHotspotPress}
              showControls={false}
              autoRotate={autoRotate}
              enableGyroscope={enableGyroscope}
            />
          </View>
        </AppCard>

        <AppCard style={styles.modelsCard}>
          <Text style={styles.sectionTitle}>Select System</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.modelSelector}>
              {Object.values(ANATOMY_MODELS).map((model) => (
                <TouchableOpacity
                  key={model.id}
                  style={[
                    styles.modelOption,
                    selectedModel.id === model.id && styles.modelOptionSelected,
                  ]}
                  onPress={() => selectModel(model.id)}
                >
                  <Ionicons
                    name="body-outline"
                    size={24}
                    color={selectedModel.id === model.id ? Colors.white : Colors.textSecondary}
                  />
                  <Text style={[
                    styles.modelName,
                    selectedModel.id === model.id && styles.modelNameSelected,
                  ]}>
                    {model.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </AppCard>

        <AppCard style={styles.categoriesCard}>
          <Text style={styles.sectionTitle}>Body Systems</Text>
          <View style={styles.categoryGrid}>
            {ANATOMY_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => {
                  const modelId = category.id === 'skeletal' ? 'humanSkeleton' :
                                category.id === 'muscular' ? 'muscularSystem' :
                                category.id === 'circulatory' ? 'circulatorySystem' : null;
                  if (modelId) selectModel(modelId);
                }}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <Ionicons
                    name={category.icon as any}
                    size={24}
                    color={category.color}
                  />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </AppCard>

        <AppCard style={styles.learningCard}>
          <View style={styles.learningHeader}>
            <Text style={styles.sectionTitle}>Learning Modules</Text>
            <TouchableOpacity onPress={() => navigation.navigate(Screen.anatomyLearning)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.moduleList}>
            {LEARNING_MODULES.slice(0, 3).map((module) => (
              <TouchableOpacity
                key={module.id}
                style={styles.moduleCard}
                onPress={() => navigation.navigate(Screen.anatomyModule, { moduleId: module.id })}
              >
                <View style={styles.moduleIcon}>
                  <Ionicons name={module.icon as any} size={20} color={Colors.primary} />
                </View>
                <View style={styles.moduleInfo}>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.moduleDescription}>{module.description}</Text>
                  <View style={styles.moduleMeta}>
                    <Text style={styles.moduleDuration}>{module.duration}</Text>
                    <Text style={styles.moduleDifficulty}>{module.difficulty}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </View>
        </AppCard>

        <AppCard style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Ionicons name="bulb-outline" size={20} color={Colors.warning} />
            <Text style={styles.tipsTitle}>Interactive Tips</Text>
          </View>
          <Text style={styles.tipsText}>
            • Tap on red hotspots to learn about specific body parts{'\n'}
            • Use two fingers to zoom in/out{'\n'}
            • Drag to rotate the model{'\n'}
            • Enable gyroscope to move with your device
          </Text>
        </AppCard>
      </ScrollView>

      <Modal
        visible={showHotspotModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.hotspotModal,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.hotspotHeader}>
              <Text style={styles.hotspotTitle}>
                {selectedHotspot?.name}
              </Text>
              <TouchableOpacity
                onPress={closeModal}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel="Close"
              >
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.hotspotDescription}>
              {selectedHotspot?.description}
            </Text>
            
            <View style={styles.hotspotActions}>
              <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.relatedButton}>
                <Text style={styles.relatedText}>View Related</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { 
    padding: Spacing.base, 
    paddingTop: Spacing.xl, 
    gap: Spacing.md, 
    paddingBottom: Spacing['2xl'] 
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: { 
    fontSize: Typography.size['2xl'], 
    fontWeight: '800', 
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  viewerCard: {
    gap: Spacing.md,
  },
  viewerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewerTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  viewerControls: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonActive: {
    backgroundColor: Colors.primary,
  },
  viewerContainer: {
    height: 300,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.backgroundSecondary,
  },
  modelsCard: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  modelSelector: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  modelOption: {
    alignItems: 'center',
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    minWidth: 100,
  },
  modelOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  modelName: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  modelNameSelected: {
    color: Colors.white,
  },
  categoriesCard: {
    gap: Spacing.md,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  categoryCard: {
    width: '48%',
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  learningCard: {
    gap: Spacing.md,
  },
  learningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: Typography.size.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  moduleList: {
    gap: Spacing.sm,
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
  },
  moduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  moduleDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  moduleMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  moduleDuration: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  moduleDifficulty: {
    fontSize: Typography.size.xs,
    color: Colors.primary,
    fontWeight: '600',
  },
  tipsCard: {
    gap: Spacing.md,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  tipsTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  tipsText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.black + '60',
    justifyContent: 'flex-end',
  },
  hotspotModal: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  hotspotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hotspotTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
  },
  closeButton: {
    padding: Spacing.xs,
  },
  hotspotDescription: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  hotspotActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  learnMoreButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  learnMoreText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
  relatedButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  relatedText: {
    color: Colors.textSecondary,
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
});
