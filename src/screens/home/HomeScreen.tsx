import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Screen } from '../../navigation/screenNames';
import { navigationRef } from '../../navigation/navigationRef';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  RefreshControl, Platform, useWindowDimensions,
} from 'react-native';
import AppScreen from '../../components/common/AppScreen';
import { AppCard, SectionHeader, QuickActionCard, AnimatedPressable, ListRow, IconBadge } from '../../components/ui';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useShallow } from 'zustand/react/shallow';
import { Colors, Typography, Spacing, Radius, WELLNESS_CATEGORIES } from '../../theme';
import { useAppStore } from '../../store';
import type { WellnessCategoryKey } from '../../types';
import WellnessOrbitRing, { getOrbitPanelSize } from '../../components/home/WellnessOrbitRing';
import CategoryScoreRow from '../../components/home/CategoryScoreRow';
import { useWellnessScoreChangeFeedback } from '../../hooks/useWellnessScoreChangeFeedback';
import { trackChartCategoryTap } from '../../components/analytics';
import ActivityBar from '../../components/home/ActivityBar';
import TrialCountdownBanner from '../../components/home/TrialCountdownBanner';
import MarketingHero from '../../components/home/MarketingHero';
import ProgressSignals from '../../components/home/ProgressSignals';
import StartHereOnboardingModal from '../../components/home/StartHereOnboardingModal';
import DayOneChecklistModal from '../../components/home/DayOneChecklistModal';
import InAppGuideModal, { type InAppGuideDestination } from '../../components/home/InAppGuideModal';
import HomeNextSteps from '../../components/home/HomeNextSteps';
import DailyMotivationQuote from '../../components/home/DailyMotivationQuote';
import DailyPlanCard from '../../components/home/DailyPlanCard';
import CarePlanBanner from '../../components/home/CarePlanBanner';
import MedicalDisclaimerBanner from '../../components/common/MedicalDisclaimerBanner';
import { SensitiveCSQMask } from '../../components/common/SensitiveCSQMask';
import CheckInStreakCard from '../../components/home/CheckInStreakCard';
import StreakRecoveryCard from '../../components/home/StreakRecoveryCard';
import GoalReminderCard from '../../components/home/GoalReminderCard';
import NextBestActions from '../../components/home/NextBestActions';
import WeeklyStepChallenge from '../../components/home/WeeklyStepChallenge';
import AssessmentInsights from '../../components/home/AssessmentInsights';
import BiologicalAgeCard from '../../components/home/BiologicalAgeCard';
import BodyMetricsCard from '../../components/home/BodyMetricsCard';
import HomePurposeLeadCard from '../../components/home/HomePurposeLeadCard';
import ClinicianRecommendationsCard from '../../components/home/ClinicianRecommendationsCard';
import { healthKitService } from '../../services/healthkit';
import { applyLifestyleMetricsToWellnessScore } from '../../services/lifestyleScoreService';
import { clinicianService } from '../../services/clinicianService';
import { gamificationService } from '../../services/gamificationService';
import { getRouteForModuleId } from '../../utils/fitnessModuleRouter';
import { greetingName } from '../../utils/greetingName';
import { getOrGeneratePlan } from '../../services/planGenerator';
import { syncUnseenCarePlan } from '../../services/carePlanUnseen';
import {
  wellnessService,
  carePlanService,
  planService,
  wellnessScoreService,
  userService,
} from '../../services/firebase';
import { checkInService } from '../../services/checkInService';
import { onboardingStorage } from '../../services/onboardingStorage';
import type { AppPurpose } from '../../types/onboardingPrefs';
import { format } from 'date-fns';

const HEALTH_SYNC_MIN_MS = 60_000;

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const {
    user,
    wellnessScore,
    dailyPlan,
    activity,
    carePlan,
    setActivity,
    setDailyPlan,
    setWellnessScore,
    setCarePlan,
    setHasUnseenCarePlan,
    setUser,
    markTaskComplete,
    setGymVisit,
    checkInStreak,
    hasCheckedInToday,
    streakFreezes,
    streakBroken,
    longestStreak,
    setCheckInMeta,
    clinicianRecommendations,
    setClinicianRecommendations,
    hasUnseenCarePlan,
  } = useAppStore(
    useShallow((s) => ({
      user: s.user,
      wellnessScore: s.wellnessScore,
      dailyPlan: s.dailyPlan,
      activity: s.activity,
      carePlan: s.carePlan,
      setActivity: s.setActivity,
      setDailyPlan: s.setDailyPlan,
      setWellnessScore: s.setWellnessScore,
      setCarePlan: s.setCarePlan,
      setHasUnseenCarePlan: s.setHasUnseenCarePlan,
      hasUnseenCarePlan: s.hasUnseenCarePlan,
      setUser: s.setUser,
      markTaskComplete: s.markTaskComplete,
      setGymVisit: s.setGymVisit,
      checkInStreak: s.checkInStreak,
      hasCheckedInToday: s.hasCheckedInToday,
      streakFreezes: s.streakFreezes,
      streakBroken: s.streakBroken,
      longestStreak: s.longestStreak,
      setCheckInMeta: s.setCheckInMeta,
      clinicianRecommendations: s.clinicianRecommendations,
      setClinicianRecommendations: s.setClinicianRecommendations,
    })),
  );

  const [refreshing, setRefreshing] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [healthAvailable, setHealthAvailable] = useState(false);
  const [weeklySteps, setWeeklySteps] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<WellnessCategoryKey | null>(null);
  const scoreFeedback = useWellnessScoreChangeFeedback(wellnessScore);
  const [showStartHere, setShowStartHere] = useState(false);
  const [showDayOne, setShowDayOne] = useState(false);
  const [showInAppGuide, setShowInAppGuide] = useState(false);
  const [startHereDone, setStartHereDone] = useState(true);
  const [dayOneDone, setDayOneDone] = useState(true);
  const [appPurpose, setAppPurpose] = useState<AppPurpose | null>(null);
  const [screenFocused, setScreenFocused] = useState(true);
  const offeredDayOne = useRef(false);
  const lastHealthSyncAt = useRef(0);
  const healthSyncInFlight = useRef(false);
  const lastHomeInitUid = useRef<string | null>(null);
  const funnelComplete = !!user?.onboardingComplete;
  const CSQ_SCREEN = 'Home - Dashboard';
  const WELLNESS_RING = { screen: CSQ_SCREEN, chart: 'Wellness Ring' } as const;
  const { width: windowWidth } = useWindowDimensions();
  const ringLayoutSize = 162;
  const ringPanelSide = getOrbitPanelSize(ringLayoutSize);
  const categoryListHeight = 8 * 22 + 4;
  const ringRowNaturalWidth = ringPanelSide + Spacing.sm + 148;
  const ringRowNaturalHeight = Math.max(ringPanelSide, categoryListHeight);
  const ringRowScale = Math.min(1, (windowWidth - 68) / ringRowNaturalWidth);
  const ringRowScaledWidth = ringRowNaturalWidth * ringRowScale;
  const ringRowScaledHeight = ringRowNaturalHeight * ringRowScale;
  const ringRowTransform =
    ringRowScale < 1
      ? [
          { translateX: (-ringRowNaturalWidth * (1 - ringRowScale)) / 2 },
          { translateY: (-ringRowNaturalHeight * (1 - ringRowScale)) / 2 },
          { scale: ringRowScale },
        ]
      : [{ scale: 1 }];

  const toggleCategory = useCallback((key: WellnessCategoryKey) => {
    setSelectedCategory((prev) => (prev === key ? null : key));
  }, []);

  const selectCategoryFromList = useCallback((key: WellnessCategoryKey) => {
    setSelectedCategory((prev) => {
      const next = prev === key ? null : key;
      if (next) {
        trackChartCategoryTap({ screen: CSQ_SCREEN, chart: 'Category List' }, next);
      }
      return next;
    });
  }, []);

  const syncHealthKit = useCallback(
    async (opts?: { force?: boolean; applyLifestyle?: boolean }) => {
      if (healthSyncInFlight.current) return;
      const now = Date.now();
      if (!opts?.force && now - lastHealthSyncAt.current < HEALTH_SYNC_MIN_MS) {
        return;
      }

      healthSyncInFlight.current = true;
      try {
        const connected = await healthKitService.isConnected();
        setHealthAvailable(connected);
        if (!connected) {
          lastHealthSyncAt.current = Date.now();
          return;
        }

        const [snapshot, history] = await Promise.all([
          healthKitService.getTodayActivity(),
          healthKitService.getActivityHistory(7),
        ]);
        setActivity(snapshot);
        setWeeklySteps(history.reduce((sum, d) => sum + d.steps, 0));

        if (opts?.applyLifestyle !== false && user?.uid) {
          const updated = await applyLifestyleMetricsToWellnessScore(user.uid, snapshot);
          if (updated) setWellnessScore(updated);
        }
        lastHealthSyncAt.current = Date.now();
      } catch {
        // HealthKit can fail on simulator / denied permission
      } finally {
        healthSyncInFlight.current = false;
      }
    },
    [user?.uid, setActivity, setWellnessScore],
  );

  const loadCheckInMeta = useCallback(async () => {
    if (!user) return;
    try {
      let freezes = user.streakFreezes ?? 0;
      const status = await checkInService.getStreakStatus(user.uid, freezes);
      if (status.broken && freezes > 0) {
        const freezeResult = await checkInService.maybeApplyStreakFreeze(user.uid, freezes);
        if (freezeResult.used) {
          freezes = freezeResult.remaining;
          await userService.updateProfile(user.uid, { streakFreezes: freezes });
          setUser({ ...user, streakFreezes: freezes });
        }
      }
      const [checkedIn, todaysCheckIn] = await Promise.all([
        checkInService.hasCheckedInToday(user.uid),
        checkInService.getTodaysCheckIn(user.uid),
      ]);
      const refreshedStatus = await checkInService.getStreakStatus(user.uid, freezes);
      setCheckInMeta({
        streak: refreshedStatus.current,
        hasCheckedInToday: checkedIn,
        todaysCheckIn,
        streakFreezes: freezes,
        streakBroken: refreshedStatus.broken,
        longestStreak: refreshedStatus.longest,
      });
    } catch {}
  }, [user, setUser, setCheckInMeta]);

  const fetchLatestScore = useCallback(async () => {
    if (!user) return null;
    try {
      const score = await wellnessService.getLatestScore(user.uid);
      if (score) setWellnessScore(score);
      return score;
    } catch {
      return useAppStore.getState().wellnessScore;
    }
  }, [user, setWellnessScore]);

  const initHome = useCallback(async () => {
    await syncHealthKit({ force: true, applyLifestyle: true });
    await loadCheckInMeta();
    const score = await fetchLatestScore();
    const currentUser = useAppStore.getState().user;
    const currentCarePlan = useAppStore.getState().carePlan;
    if (currentUser && score) {
      const plan = await getOrGeneratePlan(
        currentUser.uid,
        score,
        currentCarePlan,
        currentUser.primaryGoal ?? undefined,
        {
          experienceLevel: currentUser.experienceLevel,
          trainingDaysPerWeek: currentUser.trainingDaysPerWeek,
        },
      );
      setDailyPlan(plan);
    }
  }, [syncHealthKit, loadCheckInMeta, fetchLatestScore, setDailyPlan]);

  useEffect(() => {
    if (!user?.uid) return;

    if (lastHomeInitUid.current !== user.uid) {
      lastHomeInitUid.current = user.uid;
      lastHealthSyncAt.current = 0;
      initHome();
    }

    let cancelled = false;
    (async () => {
      const done = await onboardingStorage.hasCompletedStartHere(user.uid);
      if (cancelled) return;
      if (
        done ||
        funnelComplete ||
        user.quizComplete ||
        (user.healthGoals?.length ?? 0) > 0 ||
        !!user.primaryGoal
      ) {
        if (!done) await onboardingStorage.markStartHereComplete(user.uid);
        setStartHereDone(true);
        return;
      }
      setStartHereDone(false);
    })();
    onboardingStorage.hasCompletedDayOneChecklist(user.uid).then((done) => {
      if (!cancelled) setDayOneDone(done);
    });
    onboardingStorage.shouldShowAppTour(user.uid).then((show) => {
      if (!cancelled && show) setShowInAppGuide(true);
    });
    (async () => {
      const fromProfile = user.appPurpose as AppPurpose | undefined;
      if (fromProfile) {
        if (!cancelled) setAppPurpose(fromProfile);
        return;
      }
      const stored = await onboardingStorage.getAppPurpose(user.uid);
      if (cancelled) return;
      if (stored) {
        setAppPurpose(stored as AppPurpose);
        return;
      }
      if (user.primaryGoal === 'clinician' || user.healthGoals?.includes('clinician')) {
        setAppPurpose('clinician');
        return;
      }
      if (user.primaryGoal === 'condition' || user.healthGoals?.includes('condition')) {
        setAppPurpose('clinician');
      }
    })();

    const unsubPlans = carePlanService.watchCarePlans(user.uid, (plans) => {
      const latest = plans[0] ?? null;
      setCarePlan(latest);
      syncUnseenCarePlan(user.uid, latest, setHasUnseenCarePlan).catch(() => {});
    });
    const unsubRecs = clinicianService.watchFitnessHubRecommendations(
      user.uid,
      setClinicianRecommendations,
    );
    return () => {
      cancelled = true;
      unsubPlans();
      unsubRecs();
    };
    // Intentionally uid-scoped — avoid re-init on array identity churn from setUser.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  useFocusEffect(
    useCallback(() => {
      setScreenFocused(true);
      // Skip lifestyle rewrite on every tab return — activity refresh only, throttled.
      syncHealthKit({ applyLifestyle: false });
      return () => setScreenFocused(false);
    }, [syncHealthKit]),
  );

  const maybeOfferDayOne = useCallback(() => {
    if (!user || dayOneDone || offeredDayOne.current) return;
    offeredDayOne.current = true;
    setTimeout(() => setShowDayOne(true), 700);
  }, [user, dayOneDone]);

  const openClinicianModule = useCallback(
    (moduleId: string) => {
      const route = getRouteForModuleId(moduleId);
      if (route) {
        navigation.navigate(Screen.tabFitness, { screen: route.screen, params: route.params });
      } else {
        navigation.navigate(Screen.tabFitness, { screen: Screen.fitnessHub });
      }
    },
    [navigation],
  );

  const handleInAppGuideAction = (destination: InAppGuideDestination) => {
    setShowInAppGuide(false);
    if (user) onboardingStorage.markInAppGuideComplete(user.uid);
    maybeOfferDayOne();
    switch (destination) {
      case 'home':
        navigation.navigate(Screen.tabHome, { screen: Screen.homeDashboard });
        break;
      case 'dailyCheckIn':
        navigation.navigate(Screen.dailyCheckIn);
        break;
      case 'dailyPlan':
        navigation.navigate(Screen.dailyPlan);
        break;
      case 'aiInsights':
        navigation.navigate(Screen.tabAiInsights);
        break;
      case 'fitness':
        navigation.navigate(Screen.tabFitness);
        break;
      case 'anatomy':
        navigation.navigate(Screen.tabMore, { screen: Screen.anatomyExplorer });
        break;
      case 'foods':
        navigation.navigate(Screen.tabFitness, { screen: Screen.nutritionBasics });
        break;
      case 'clinician':
        navigation.navigate(Screen.tabMyCare, { screen: Screen.connectClinician });
        break;
      case 'analytics':
        navigation.navigate(Screen.tabAnalytics);
        break;
      case 'more':
        navigation.navigate(Screen.tabMore);
        break;
    }
  };

  const dismissInAppGuide = () => {
    setShowInAppGuide(false);
    if (user) onboardingStorage.markInAppGuideComplete(user.uid);
    maybeOfferDayOne();
  };

  const loadPlan = async () => {
    if (!user || !wellnessScore) return;
    try {
      const plan = await getOrGeneratePlan(user.uid, wellnessScore, carePlan, user.primaryGoal ?? undefined, {
        experienceLevel: user.experienceLevel,
        trainingDaysPerWeek: user.trainingDaysPerWeek,
      });
      setDailyPlan(plan);
    } catch {}
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await initHome();
    setRefreshing(false);
  }, [initHome]);

  const handleTaskComplete = async (taskId: string) => {
    if (!user || !dailyPlan) return;
    const task = dailyPlan.tasks.find((t) => t.id === taskId);
    if (!task || task.status === 'complete') return;

    markTaskComplete(taskId);
    await planService.updateTaskStatus(user.uid, dailyPlan.date, taskId, 'complete');

    const updatedScore = await wellnessScoreService.applyTaskCompletionBoost(
      user.uid,
      task.category,
      task.scoreBoost
    );
    if (updatedScore) {
      setWellnessScore(updatedScore);
    }
    gamificationService.recordEvent(user.uid, 'tasksCompleted').catch(() => {});
    if (task.category === 'mental' || task.category === 'sleep') {
      gamificationService.recordEvent(user.uid, 'mindfulnessSessions').catch(() => {});
    }
  };

  const handleGymVisit = async (visited: boolean) => {
    if (!user || !dailyPlan) return;
    setGymVisit(visited);
    await planService.updateGymVisit(user.uid, dailyPlan.date, visited);
    if (visited) {
      const updatedScore = await wellnessScoreService.applyTaskCompletionBoost(
        user.uid,
        'fitness',
        0.2
      );
      if (updatedScore) setWellnessScore(updatedScore);
      gamificationService.recordEvent(user.uid, 'gymVisits').catch(() => {});
    }
  };

  const openProfile = useCallback(() => {
    navigation.navigate(Screen.tabMore, { screen: Screen.profile });
  }, [navigation]);

  const openWellnessQuiz = useCallback(() => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(Screen.wellnessQuiz);
    }
  }, []);

  const openPurposeLead = useCallback(() => {
    if (appPurpose === 'clinician') {
      navigation.navigate(Screen.tabMyCare, { screen: Screen.connectClinician });
      return;
    }
    if (appPurpose === 'wellness_score' || appPurpose === 'all') {
      navigation.navigate(Screen.tabAnalytics);
      return;
    }
    navigation.navigate(Screen.tabFitness);
  }, [appPurpose, navigation]);

  const openBodyMetrics = useCallback(() => {
    navigation.navigate(Screen.bodyMetrics);
  }, [navigation]);

  const openHealthPermissions = useCallback(() => {
    navigation.navigate(Screen.healthPermissions);
  }, [navigation]);

  const openActivityDashboard = useCallback(() => {
    navigation.navigate(Screen.activityDashboard);
  }, [navigation]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const nameForGreeting = greetingName(user);

  const weeklyStepsTotal = weeklySteps || (activity?.steps ?? 0) * 5;
  const scoreImproved = wellnessScore && wellnessScore.overall >= 8;
  const hasAssessment = !!wellnessScore;

  return (
    <AppScreen>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
        }
        showsVerticalScrollIndicator={false}
      >
        <TrialCountdownBanner />

        {!hasAssessment && (
          <MarketingHero onStartQuiz={openWellnessQuiz} />
        )}

        {carePlan ? (
          <CarePlanBanner
            carePlan={carePlan}
            isNew={hasUnseenCarePlan}
            onPress={() => {
              if (user?.clinicianId) {
                navigation.navigate(Screen.tabMyCare, { screen: Screen.carePlan });
              } else {
                navigation.navigate(Screen.tabMore, { screen: Screen.carePlan });
              }
            }}
          />
        ) : null}

        <View style={styles.greetingRow}>
          <AnimatedPressable
            onPress={openProfile}
            accessibilityRole="button"
            accessibilityLabel="Open profile"
          >
            <LinearGradient colors={['#F24D80', '#FF6699']} style={styles.avatarCircle}>
              <SensitiveCSQMask>
                <Text style={styles.avatarLetter}>
                  {nameForGreeting[0]?.toUpperCase() ?? 'P'}
                </Text>
              </SensitiveCSQMask>
            </LinearGradient>
          </AnimatedPressable>
          <View style={styles.greetingText}>
            <Text style={styles.greetingLine}>{greeting()} 👋</Text>
            <SensitiveCSQMask>
              <Text style={styles.greetingName}>{nameForGreeting}</Text>
            </SensitiveCSQMask>
          </View>
          <View style={styles.datePill}>
            <Text style={styles.dateText}>{format(new Date(), 'EEE, d MMM')}</Text>
          </View>
        </View>

        {user?.primaryGoal && (
          <GoalReminderCard goal={user.primaryGoal as any} />
        )}

        {appPurpose ? (
          <HomePurposeLeadCard
            purpose={appPurpose}
            linkedToClinician={!!user?.clinicianId}
            onPress={openPurposeLead}
          />
        ) : null}

        <AppCard style={styles.scoreCard} padded={false}>
          <View style={styles.scoreCardInner}>
          <View style={[styles.scoreRingScaler, { width: ringRowScaledWidth, height: ringRowScaledHeight }]}>
            <View style={[styles.scoreRow, { width: ringRowNaturalWidth, height: ringRowNaturalHeight, transform: ringRowTransform }]}>
            <WellnessOrbitRing
              score={wellnessScore?.overall ?? 0}
              categories={wellnessScore?.categories}
              size={ringLayoutSize}
              spin={screenFocused}
              selectedCategory={selectedCategory}
              onCategorySelect={(key) => toggleCategory(key)}
              onCenterPress={() => setSelectedCategory(null)}
              analytics={WELLNESS_RING}
              scoreFeedback={scoreFeedback}
            />
            <View style={styles.categoryList}>
              {WELLNESS_CATEGORIES.slice(0, 8).map((cat) => {
                const isSelected = selectedCategory === cat.key;
                const catScore = wellnessScore?.categories?.[cat.key as WellnessCategoryKey] ?? 0;
                return (
                  <CategoryScoreRow
                    key={cat.key}
                    cat={cat}
                    score={catScore}
                    isSelected={isSelected}
                    feedback={scoreFeedback}
                    analytics={{ screen: CSQ_SCREEN, chart: 'Category List' }}
                    onPress={() => selectCategoryFromList(cat.key as WellnessCategoryKey)}
                  />
                );
              })}
            </View>
          </View>
          </View>

          {wellnessScore && (
            <AnimatedPressable
              style={styles.analyticsLink}
              onPress={() => navigation.navigate(Screen.tabAnalytics)}
            >
              <Text style={styles.analyticsLinkText}>View full analytics</Text>
              <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
            </AnimatedPressable>
          )}

          {!wellnessScore && (
            <AnimatedPressable
              style={styles.quizCTA}
              onPress={openWellnessQuiz}
            >
              <Ionicons name="clipboard-outline" size={18} color={Colors.primary} />
              <Text style={styles.quizCTAText}>Take wellness assessment to get your score</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
            </AnimatedPressable>
          )}
          </View>
        </AppCard>

        <BiologicalAgeCard
          dateOfBirth={user?.dateOfBirth}
          wellnessScore={wellnessScore}
          heightCm={user?.heightCm}
          weightKg={user?.weightKg}
          onImproveScore={openWellnessQuiz}
          onAddDateOfBirth={openProfile}
        />

        <BodyMetricsCard
          activity={activity}
          healthConnected={healthAvailable}
          onPress={openBodyMetrics}
          onConnectHealth={openHealthPermissions}
        />

        <ActivityBar
          activity={activity}
          onRefresh={() => {
            void syncHealthKit({ force: true, applyLifestyle: true });
          }}
          onPress={openActivityDashboard}
        />

        <View style={styles.guidanceGroup}>
          <DailyMotivationQuote />
          {hasAssessment && (
            <HomeNextSteps
              startHereDone={startHereDone || funnelComplete}
              dayOneDone={dayOneDone}
              hasCheckedInToday={hasCheckedInToday}
              healthConnected={healthAvailable}
              dailyPlan={dailyPlan}
              carePlan={carePlan}
              onStartHere={() => setShowStartHere(true)}
              onDayOne={() => setShowDayOne(true)}
              onCheckIn={() => navigation.navigate(Screen.dailyCheckIn)}
              onDailyPlan={() => navigation.navigate(Screen.dailyPlan)}
              onCarePlan={() => navigation.navigate(Screen.tabMyCare, { screen: Screen.carePlan })}
              onConnectHealth={() => navigation.navigate(Screen.healthPermissions)}
              onOpenAiInsights={() => navigation.navigate(Screen.tabAiInsights)}
            />
          )}
        </View>

        {showDisclaimer && (
          <MedicalDisclaimerBanner onDismiss={() => setShowDisclaimer(false)} />
        )}

        {scoreImproved && !scoreFeedback && (
          <View style={styles.celebrationBanner}>
            <Text style={styles.celebrationText}>🎉 Your wellness score is excellent! Keep it up!</Text>
          </View>
        )}

        {streakBroken && !hasCheckedInToday ? (
          <StreakRecoveryCard
            longest={longestStreak}
            freezes={streakFreezes}
            onPress={() => navigation.navigate(Screen.dailyCheckIn)}
          />
        ) : (
          <CheckInStreakCard
            streak={checkInStreak}
            needsCheckIn={!hasCheckedInToday}
            onPress={() => navigation.navigate(Screen.dailyCheckIn)}
          />
        )}

        {clinicianRecommendations && (
          <ClinicianRecommendationsCard
            recommendation={clinicianRecommendations}
            onModulePress={openClinicianModule}
            onViewAll={() => navigation.navigate(Screen.tabFitness, { screen: Screen.fitnessHub })}
          />
        )}

        {hasAssessment && dailyPlan && (
          <ProgressSignals
            streak={checkInStreak}
            dailyPlan={dailyPlan}
            wellnessScore={wellnessScore}
            hideStreak={!hasCheckedInToday}
          />
        )}

        {hasAssessment && (
          <AnimatedPressable onPress={() => navigation.navigate(Screen.activityDashboard)}>
            <AppCard style={styles.activityDashCard}>
              <ListRow
                title="Today's Activity"
                subtitle={`${activity?.steps?.toLocaleString() ?? '—'} steps · tap for dashboard`}
                iconName="pulse-outline"
                iconColor={Colors.brand}
                showDivider={false}
              />
            </AppCard>
          </AnimatedPressable>
        )}

        {hasAssessment && dailyPlan ? (
          <DailyPlanCard
            plan={dailyPlan}
            onStart={() => navigation.navigate(Screen.dailyPlan)}
            onTaskPress={(task) => navigation.navigate(Screen.taskDetail, { task })}
            onTaskComplete={handleTaskComplete}
            onGymVisit={handleGymVisit}
          />
        ) : hasAssessment ? (
          <TouchableOpacity style={styles.planEmptyCTA} onPress={loadPlan}>
            <IconBadge name="calendar-outline" color={Colors.primary} size="md" />
            <View>
              <Text style={styles.planEmptyTitle}>No plan yet</Text>
              <Text style={styles.planEmptySub}>Tap to generate today's plan</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
          </TouchableOpacity>
        ) : null}

        {hasAssessment && wellnessScore && (
          <AssessmentInsights wellnessScore={wellnessScore} />
        )}

        {hasAssessment && (
          <View style={styles.groupedSection}>
            <Text style={styles.groupedTitle}>Today's Insights</Text>
            <WeeklyStepChallenge weeklySteps={weeklyStepsTotal} />
          </View>
        )}

        {hasAssessment && (
          <NextBestActions
            activity={activity}
            carePlan={carePlan}
            onCheckIn={() => navigation.navigate(Screen.dailyCheckIn)}
              onCarePlan={() => navigation.navigate(Screen.tabMyCare, { screen: Screen.carePlan })}
          />
        )}

        <SectionHeader title="Quick Access" icon="flash-outline" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActionsRow}
        >
          {SHORTCUTS.map((s) => (
            <QuickActionCard
              key={s.label}
              label={s.label}
              subtitle={s.subtitle}
              icon={s.icon}
              colors={s.colors}
              onPress={() => navigation.navigate(s.tab, s.params)}
            />
          ))}
        </ScrollView>

        {hasAssessment && (
          <AppCard style={styles.retakeCard}>
            <TouchableOpacity
              style={styles.retakeRow}
              onPress={openWellnessQuiz}
            >
              <View style={styles.retakeIconWrap}>
                <IconBadge name="arrow-redo-outline" color={Colors.primary} size="sm" />
              </View>
              <View style={styles.retakeInfo}>
                <Text style={styles.retakeTitle}>Deeper check-in</Text>
                <Text style={styles.retakeSub}>10 more questions to refine your score</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
            </TouchableOpacity>
          </AppCard>
        )}

        {!healthAvailable && (
          <TouchableOpacity
            style={styles.hkPrompt}
            onPress={() => navigation.navigate(Screen.healthPermissions)}
          >
            <IconBadge
              name={Platform.OS === 'android' ? 'phone-portrait-outline' : 'heart-outline'}
              color={Colors.brand}
              size="sm"
            />
            <Text style={styles.hkPromptText}>
              {Platform.OS === 'android'
                ? 'Connect Health Connect for activity tracking'
                : 'Connect Apple Health for activity tracking'}
            </Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.brand} />
          </TouchableOpacity>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <StartHereOnboardingModal
        visible={showStartHere}
        onClose={() => setShowStartHere(false)}
        onComplete={() => setStartHereDone(true)}
      />
      <InAppGuideModal
        visible={showInAppGuide}
        primaryGoal={user?.primaryGoal}
        onAction={handleInAppGuideAction}
        onDismiss={dismissInAppGuide}
      />
      <DayOneChecklistModal
        visible={showDayOne}
        onClose={() => setShowDayOne(false)}
        onMarkComplete={() => setDayOneDone(true)}
        onOpenCheckIn={() => {
          setShowDayOne(false);
          navigation.navigate(Screen.dailyCheckIn);
        }}
        onOpenAchievements={() => {
          setShowDayOne(false);
          navigation.navigate(Screen.tabMore, { screen: Screen.achievements });
        }}
      />
    </AppScreen>
  );
}

const SHORTCUTS = [
  { icon: 'camera-outline', label: 'Food Scan', subtitle: 'AI macros', colors: ['#2EDBBD', '#27AE60'] as [string, string], tab: Screen.tabHome, params: { screen: Screen.foodScan } },
  { icon: 'pulse-outline', label: 'Recovery', subtitle: 'Strain & sleep', colors: ['#389EFA', '#5B6EE1'] as [string, string], tab: Screen.tabHome, params: { screen: Screen.bodyMetrics } },
  { icon: 'folder-open-outline', label: 'Records', subtitle: 'GP vault', colors: ['#F24D80', '#FF8561'] as [string, string], tab: Screen.tabMyCare, params: { screen: Screen.healthRecords } },
  { icon: 'game-controller-outline', label: 'Brain Games', subtitle: 'Train focus', colors: ['#7A57F5', '#946BFA'] as [string, string], tab: Screen.tabFitness, params: { screen: Screen.brainGame, params: { gameId: 'memory-match' } } },
  { icon: 'leaf-outline', label: 'Breathing', subtitle: 'Calm down', colors: ['#2EDBBD', '#389EFA'] as [string, string], tab: Screen.tabFitness, params: { screen: Screen.breathingExercise } },
  { icon: 'moon-outline', label: 'Meditate', subtitle: 'Mindfulness', colors: ['#946BFA', '#7A57F5'] as [string, string], tab: Screen.tabFitness, params: { screen: Screen.meditationTimer } },
  { icon: 'trending-up-outline', label: 'Progress', subtitle: 'Your stats', colors: ['#389EFA', '#2EDBBD'] as [string, string], tab: Screen.tabAnalytics, params: { screen: Screen.analyticsDashboard } },
  { icon: 'chatbubble-ellipses-outline', label: 'AI Coach', subtitle: 'Ask anything', colors: ['#F24D80', '#FF6699'] as [string, string], tab: Screen.tabAiInsights, params: { screen: Screen.aiHealthCoach } },
];

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.base, gap: Spacing.sm, paddingBottom: Spacing['2xl'] },
  guidanceGroup: { gap: 6 },
  activityDashCard: { padding: 0, overflow: 'hidden' },
  celebrationBanner: {
    backgroundColor: Colors.successLight,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(52, 199, 89, 0.25)',
  },
  celebrationText: { fontSize: Typography.size.sm, color: Colors.success, fontWeight: '700', textAlign: 'center' },
  greetingRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.sm },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: { color: Colors.white, fontSize: Typography.size.lg, fontWeight: '800' },
  greetingText: { flex: 1 },
  greetingLine: { fontSize: Typography.size.sm, color: Colors.textSecondary, fontWeight: '500' },
  greetingName: { fontSize: Typography.size.xl, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
  datePill: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  dateText: { fontSize: Typography.size.xs, color: Colors.textSecondary, fontWeight: '600' },
  scoreCard: { overflow: 'visible' },
  scoreCardInner: {
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.sm,
    paddingRight: Spacing.lg,
    paddingLeft: Spacing.sm,
    overflow: 'visible',
  },
  scoreRingScaler: {
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  categoryList: { flex: 1, gap: 2, minWidth: 0 },
  analyticsLink: {
    marginTop: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: Spacing.xs,
  },
  analyticsLinkText: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '600' },
  quizCTA: {
    marginTop: Spacing.md,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  quizCTAText: { flex: 1, fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '600' },
  planEmptyCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
  },
  planEmptyIcon: { fontSize: 32 },
  planEmptyTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  planEmptySub: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  chevron: { fontSize: 22, color: Colors.textTertiary, fontWeight: '300' },
  groupedSection: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  groupedTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text, letterSpacing: -0.3 },
  quickActionsRow: { paddingRight: Spacing.base, paddingBottom: Spacing.xs },
  retakeCard: { padding: 0 },
  retakeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.base },
  retakeIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retakeInfo: { flex: 1 },
  retakeTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  retakeSub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  hkPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(242, 77, 128, 0.08)',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.brandMuted,
  },
  hkPromptText: { flex: 1, fontSize: Typography.size.sm, color: Colors.brand, fontWeight: '600' },
});
