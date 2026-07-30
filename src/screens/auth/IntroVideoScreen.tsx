import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import { Colors, Typography, Spacing, Shadow } from '../../theme';
import { BrandButton, AnimatedPressable } from '../../components/ui';
import WellnessShiftLogoBadge from '../../components/auth/WellnessShiftLogoBadge';
import { appConfig } from '../../config/appConfig';
import { onboardingStorage } from '../../services/onboardingStorage';
import {
  pendingCanShowResults,
  pendingOnboardingStorage,
} from '../../services/pendingOnboardingStorage';
import { resolvePostAuthOnboardingRoute } from '../../services/onboardingRoutes';
import { refreshPreAuthRouteFromPending, resetOnboardingStack, notifyWelcomeVideoCompleted } from '../../services/onboardingNavigation';
import { userService, wellnessService } from '../../services/firebase';
import { useAppStore } from '../../store';
import { Screen } from '../../navigation/screenNames';

/** Full in+out cycle — a short warmup before the welcome message. */
const BREATH_CYCLE_MS = 11000;
const BREATH_HALF_MS = BREATH_CYCLE_MS / 2;

const SCENES = [
  {
    title: 'Welcome to Wellness Shift',
    subtitle: 'One wellness score — powered by your habits and your clinician’s care.',
  },
  {
    title: 'Built around you',
    subtitle: 'Workouts, nutrition, sleep, mood, and care plans all move the same number.',
  },
  {
    title: 'Ready when you are',
    subtitle: 'Track progress alone — or loop in your doctor when you need them.',
  },
] as const;

const SCENE_MS = 2800;

type Stage = 'breath' | 'welcome';

export default function IntroVideoScreen() {
  const navigation = useNavigation<any>();
  const { user, setUser, hasSeenIntro } = useAppStore();
  const [finishing, setFinishing] = useState(false);
  // Always start with breathe-in/out on this screen (launch welcome).
  const [stage, setStage] = useState<Stage>('breath');
  const [breathPhase, setBreathPhase] = useState<'in' | 'out'>('in');
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(BREATH_HALF_MS / 1000));
  const [sceneIndex, setSceneIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [useVideo, setUseVideo] = useState(Boolean(appConfig.introVideoUrl?.trim()));
  const [videoUri, setVideoUri] = useState(appConfig.introVideoUrl.trim());
  const finishingRef = useRef(false);
  const triedFallback = useRef(false);
  const breathDoneRef = useRef(false);

  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(18)).current;
  const orb = useRef(new Animated.Value(0.82)).current;
  const ringScale = useRef(new Animated.Value(0.9)).current;
  const glow = useRef(new Animated.Value(0.35)).current;
  const progress = useRef(new Animated.Value(0)).current;

  const finish = useCallback(async () => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    setFinishing(true);

    try {
      // Guest / cold-start: mark pending and continue pre-auth funnel.
      if (!user) {
        await pendingOnboardingStorage.markWelcomeVideoComplete();
        notifyWelcomeVideoCompleted();
        const route = await refreshPreAuthRouteFromPending(hasSeenIntro);
        resetOnboardingStack(navigation, route);
        return;
      }

      await onboardingStorage.markWelcomeVideoSeen(user.uid);
      await pendingOnboardingStorage.markWelcomeVideoComplete();
      notifyWelcomeVideoCompleted();

      // Already fully onboarded — RootNavigator will remount into the main app.
      if (user.onboardingComplete) {
        return;
      }

      const score = await wellnessService.getLatestScore(user.uid);
      const resultsSeen = await onboardingStorage.hasCompletedWellnessResults(user.uid);
      const pending = await pendingOnboardingStorage.get();
      const route = await resolvePostAuthOnboardingRoute(user, {
        hasScore: !!score,
        resultsSeen,
        awaitingResults: pendingCanShowResults(pending),
      });

      if (route === 'complete') {
        await onboardingStorage.markMainOnboardingSupplementsComplete(user.uid);
        await onboardingStorage.setPendingInAppGuide(user.uid, true);
        await userService.updateProfile(user.uid, { onboardingComplete: true });
        setUser({ ...user, onboardingComplete: true });
        return;
      }

      // Don't replay IntroVideo after finishing it.
      if (route === Screen.introVideo) {
        return;
      }

      navigation.replace(route);
    } catch {
      finishingRef.current = false;
      setFinishing(false);
    }
  }, [hasSeenIntro, navigation, setUser, user]);

  // After signup: only skip if THIS account already finished the post-auth welcome.
  // Guest `welcomeVideoComplete` must not skip the post-signup breathe replay.
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const seen = await onboardingStorage.hasSeenWelcomeVideo(user.uid);
      if (cancelled || !seen) return;
      finish();
    })();
    return () => {
      cancelled = true;
    };
  }, [finish, user]);

  // ── Breath warmup on every mount of this launch screen ───────────────────
  useEffect(() => {
    if (stage !== 'breath') return;

    breathDoneRef.current = false;
    setBreathPhase('in');
    setSecondsLeft(Math.ceil(BREATH_HALF_MS / 1000));
    orb.setValue(0.82);
    ringScale.setValue(0.9);
    glow.setValue(0.35);
    progress.setValue(0);

    const breathAnim = Animated.sequence([
      Animated.parallel([
        Animated.timing(orb, {
          toValue: 1.14,
          duration: BREATH_HALF_MS,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(ringScale, {
          toValue: 1.32,
          duration: BREATH_HALF_MS,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0.9,
          duration: BREATH_HALF_MS,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0.5,
          duration: BREATH_HALF_MS,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
      Animated.parallel([
        Animated.timing(orb, {
          toValue: 0.82,
          duration: BREATH_HALF_MS,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(ringScale, {
          toValue: 0.9,
          duration: BREATH_HALF_MS,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0.35,
          duration: BREATH_HALF_MS,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 1,
          duration: BREATH_HALF_MS,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
    ]);

    breathAnim.start(({ finished }) => {
      if (!finished || breathDoneRef.current) return;
      breathDoneRef.current = true;
      setStage('welcome');
    });

    const phaseFlip = setTimeout(() => setBreathPhase('out'), BREATH_HALF_MS);

    const tick = setInterval(() => {
      setSecondsLeft((s) => Math.max(1, s - 1));
    }, 1000);

    const resetTick = setTimeout(() => {
      setSecondsLeft(Math.ceil(BREATH_HALF_MS / 1000));
    }, BREATH_HALF_MS);

    return () => {
      breathAnim.stop();
      clearTimeout(phaseFlip);
      clearTimeout(resetTick);
      clearInterval(tick);
    };
  }, [glow, orb, progress, ringScale, stage]);

  // Soft pulse while on welcome scenes
  useEffect(() => {
    if (stage !== 'welcome') return;
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(orb, {
            toValue: 1.06,
            duration: 1600,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(glow, {
            toValue: 0.75,
            duration: 1600,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(orb, {
            toValue: 0.94,
            duration: 1600,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(glow, {
            toValue: 0.4,
            duration: 1600,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [glow, orb, stage]);

  useEffect(() => {
    if (stage !== 'welcome') return;
    fade.setValue(0);
    rise.setValue(18);
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(rise, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, rise, sceneIndex, stage]);

  useEffect(() => {
    if (!useVideo || videoReady) return;
    const timer = setTimeout(() => {
      setUseVideo(false);
      setVideoReady(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, [useVideo, videoReady]);

  useEffect(() => {
    if (stage !== 'welcome') return;
    if (useVideo && videoReady) return;
    if (sceneIndex >= SCENES.length - 1) {
      const timer = setTimeout(() => finish(), SCENE_MS);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setSceneIndex((i) => i + 1), SCENE_MS);
    return () => clearTimeout(timer);
  }, [finish, sceneIndex, stage, useVideo, videoReady]);

  const onVideoError = () => {
    const fallback = appConfig.introVideoFallbackUrl?.trim();
    if (fallback && !triedFallback.current && fallback !== videoUri) {
      triedFallback.current = true;
      setVideoUri(fallback);
      setVideoReady(false);
      return;
    }
    setUseVideo(false);
    setVideoReady(false);
  };

  const skipBreath = () => {
    if (stage !== 'breath' || breathDoneRef.current) return;
    breathDoneRef.current = true;
    setStage('welcome');
  };

  const scene = SCENES[sceneIndex];
  const showCinematic = !useVideo || !videoReady;
  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#140F1F', '#241536', '#3A1C4D']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.ambient, styles.ambientTop]} />
      <View style={[styles.ambient, styles.ambientBottom]} />

      {useVideo && stage === 'welcome' ? (
        <Video
          source={{ uri: videoUri }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          muted={false}
          repeat={false}
          playInBackground={false}
          ignoreSilentSwitch="obey"
          onReadyForDisplay={() => setVideoReady(true)}
          onEnd={finish}
          onError={onVideoError}
          controls={false}
        />
      ) : null}

      {useVideo && stage === 'welcome' && videoReady ? <View style={styles.videoScrim} /> : null}

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.top}>
          <Text style={styles.brand}>
            {stage === 'breath' ? 'A quiet moment' : 'Welcome'}
          </Text>
          {stage === 'breath' ? (
            <View style={styles.breathTrack}>
              <Animated.View style={[styles.breathFill, { width: progressWidth }]} />
            </View>
          ) : showCinematic ? (
            <View style={styles.progressRow}>
              {SCENES.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.progressDot,
                    i < sceneIndex && styles.progressDotDone,
                    i === sceneIndex && styles.progressDotActive,
                  ]}
                />
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.stage}>
          {stage === 'breath' ? (
            <>
              <Text style={styles.prompt}>
                {breathPhase === 'in' ? 'Breathe in' : 'Breathe out'}
              </Text>
              <Text style={styles.hint}>
                {breathPhase === 'in'
                  ? 'Slowly fill your lungs — you’re warming up'
                  : 'Gently release — then we’ll begin'}
              </Text>

              <View style={styles.orbStage}>
                <Animated.View
                  style={[
                    styles.ringOuter,
                    { opacity: glow, transform: [{ scale: ringScale }] },
                  ]}
                />
                <Animated.View
                  style={[styles.ringMid, { transform: [{ scale: ringScale }] }]}
                />
                <Animated.View style={{ transform: [{ scale: orb }] }}>
                  <LinearGradient
                    colors={['#FF8FB3', '#F24D80', '#D93A6A']}
                    start={{ x: 0.2, y: 0 }}
                    end={{ x: 0.9, y: 1 }}
                    style={styles.breathOrb}
                  />
                </Animated.View>
              </View>

              <Text style={styles.countdown}>{secondsLeft}</Text>
              <Text style={styles.sub}>
                Eleven seconds to arrive — then your welcome begins.
              </Text>
            </>
          ) : showCinematic ? (
            <>
              <Animated.View style={[styles.logoStage, { opacity: glow, transform: [{ scale: orb }] }]}>
                <View style={styles.ring} />
                <WellnessShiftLogoBadge diameter={120} />
              </Animated.View>
              <Animated.View style={{ opacity: fade, transform: [{ translateY: rise }] }}>
                <Text style={styles.title}>{scene.title}</Text>
                <Text style={styles.subtitle}>{scene.subtitle}</Text>
              </Animated.View>
            </>
          ) : (
            <View style={styles.videoCaption}>
              <Text style={styles.title}>Welcome to Wellness Shift</Text>
              <Text style={styles.subtitle}>Your journey starts now.</Text>
            </View>
          )}

          {useVideo && stage === 'welcome' && !videoReady ? (
            <ActivityIndicator color={Colors.brandLight} style={styles.loader} />
          ) : null}
        </View>

        <View style={styles.footer}>
          {stage === 'breath' ? (
            <>
              <Text style={styles.footerHint}>Follow the orb — inhale, then exhale</Text>
              <AnimatedPressable
                onPress={skipBreath}
                accessibilityRole="button"
                accessibilityLabel="Skip breathing warmup"
              >
                <Text style={styles.skip}>Skip warmup</Text>
              </AnimatedPressable>
            </>
          ) : (
            <>
              <BrandButton
                label={finishing ? 'Continuing…' : 'Get started'}
                onPress={finish}
                loading={finishing}
                disabled={finishing}
                style={styles.cta}
              />
              <AnimatedPressable
                onPress={finish}
                disabled={finishing}
                accessibilityRole="button"
                accessibilityLabel="Skip welcome"
              >
                <Text style={styles.skip}>Skip</Text>
              </AnimatedPressable>
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#140F1F' },
  safe: { flex: 1 },
  ambient: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(242, 77, 128, 0.14)',
  },
  ambientTop: { top: -90, right: -70 },
  ambientBottom: {
    bottom: 60,
    left: -110,
    backgroundColor: 'rgba(148, 107, 250, 0.14)',
  },
  videoScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 6, 18, 0.45)',
  },
  top: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    alignItems: 'center',
    gap: Spacing.md,
  },
  brand: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: Typography.size.xs,
    fontWeight: '700',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  breathTrack: {
    width: '72%',
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  breathFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: Colors.brandLight,
  },
  progressRow: { flexDirection: 'row', gap: 8 },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  progressDotActive: {
    width: 22,
    backgroundColor: Colors.brandLight,
  },
  progressDotDone: {
    backgroundColor: 'rgba(242, 77, 128, 0.7)',
  },
  stage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    // Shift the visual centre upward so the logo / breath orb sits higher.
    paddingBottom: Spacing['3xl'],
    gap: Spacing.sm,
  },
  prompt: {
    color: Colors.white,
    fontSize: Typography.size['3xl'],
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  hint: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: Typography.size.base,
    fontWeight: '500',
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  orbStage: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -Spacing.lg,
    marginBottom: Spacing.sm,
  },
  ringOuter: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 143, 179, 0.35)',
    backgroundColor: 'rgba(242, 77, 128, 0.06)',
  },
  ringMid: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  breathOrb: {
    width: 128,
    height: 128,
    borderRadius: 64,
    ...Shadow.lg,
    shadowColor: Colors.brand,
    shadowOpacity: 0.45,
  },
  countdown: {
    marginTop: Spacing.sm,
    color: Colors.brandLight,
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    letterSpacing: -0.5,
    fontVariant: ['tabular-nums'],
  },
  sub: {
    marginTop: Spacing.sm,
    color: 'rgba(255,255,255,0.62)',
    fontSize: Typography.size.sm,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  logoStage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -Spacing['2xl'],
    marginBottom: Spacing.md,
    ...Shadow.lg,
    shadowColor: Colors.brand,
    shadowOpacity: 0.4,
  },
  ring: {
    position: 'absolute',
    width: 168,
    height: 168,
    borderRadius: 84,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 143, 179, 0.35)',
    backgroundColor: 'rgba(242, 77, 128, 0.06)',
  },
  title: {
    color: Colors.white,
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    letterSpacing: -0.6,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: Typography.size.base,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
    alignSelf: 'center',
  },
  videoCaption: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: Spacing.xl,
    right: Spacing.xl,
    alignItems: 'center',
  },
  loader: { marginTop: Spacing.lg },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
    alignItems: 'center',
  },
  footerHint: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: Typography.size.sm,
    fontWeight: '500',
  },
  cta: { alignSelf: 'stretch' },
  skip: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: Typography.size.sm,
    fontWeight: '600',
    paddingVertical: Spacing.xs,
  },
});
