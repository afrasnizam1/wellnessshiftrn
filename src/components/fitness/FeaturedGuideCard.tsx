import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AnimatedPressable } from '../ui';
import type { LearningGuide } from '../../data/learningGuides';

type Props = {
  guide: LearningGuide;
  onPress: () => void;
};

export default function FeaturedGuideCard({ guide, onPress }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageSource = guide.image ?? (guide.imageUrl ? { uri: guide.imageUrl } : null);
  const useImage = !!imageSource && !imageFailed;

  const overlay = (
    <>
      <View style={styles.scrim} />
      <LinearGradient
        colors={['rgba(0,0,0,0.35)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.55)']}
        locations={[0, 0.45, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.iconWrap}>
        <Ionicons name={guide.icon} size={18} color={Colors.white} />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.title} numberOfLines={2}>{guide.title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>{guide.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={13} color="rgba(255,255,255,0.9)" style={styles.chevron} />
    </>
  );

  return (
    <AnimatedPressable style={styles.card} onPress={onPress}>
      {useImage ? (
        <ImageBackground
          source={imageSource}
          style={styles.fill}
          imageStyle={styles.image}
          onError={() => setImageFailed(true)}
        >
          {overlay}
        </ImageBackground>
      ) : (
        <LinearGradient colors={guide.fallbackColors} style={styles.fill}>
          {overlay}
        </LinearGradient>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 132,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginRight: Spacing.md,
  },
  fill: { flex: 1 },
  image: { borderRadius: Radius.lg },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  iconWrap: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Spacing.md,
    paddingTop: Spacing.xl,
  },
  title: {
    color: Colors.white,
    fontSize: Typography.size.sm,
    fontWeight: '800',
    letterSpacing: -0.2,
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 11,
    marginTop: 4,
    lineHeight: 15,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  chevron: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
  },
});
