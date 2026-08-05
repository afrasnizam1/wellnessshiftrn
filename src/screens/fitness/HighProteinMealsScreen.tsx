import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, AnimatedPressable } from '../../components/ui';
import AppScreen from '../../components/common/AppScreen';
import {
  HIGH_PROTEIN_MEALS,
  HIGH_PROTEIN_SLOT_FILTERS,
  type HighProteinMeal,
  type HighProteinMealSlot,
} from '../../data/highProteinMealsData';

export default function HighProteinMealsScreen() {
  const navigation = useNavigation<any>();
  const [filter, setFilter] = useState<HighProteinMealSlot | 'all'>('all');
  const [selected, setSelected] = useState<HighProteinMeal | null>(null);

  const meals = useMemo(
    () =>
      filter === 'all'
        ? HIGH_PROTEIN_MEALS
        : HIGH_PROTEIN_MEALS.filter((m) => m.slot === filter),
    [filter],
  );

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>High Protein Meals</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=90&auto=format&fit=crop',
          }}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.72)']}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.heroTitle}>High protein · healthy plates</Text>
          <Text style={styles.heroSub}>
            Healthy high-protein recipes with photos, macros, and simple steps — built for satiety and
            recovery.
          </Text>
        </ImageBackground>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {HIGH_PROTEIN_SLOT_FILTERS.map((chip) => {
            const active = filter === chip.key;
            return (
              <TouchableOpacity
                key={chip.key}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setFilter(chip.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{chip.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.count}>{meals.length} meals</Text>

        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} onPress={() => setSelected(meal)} />
        ))}

        <Text style={styles.disclaimer}>
          Portions are guides, not medical advice. Adjust for your calorie and protein goals, or talk to a
          dietitian for personalised plans.
        </Text>
      </ScrollView>

      <MealDetailModal key={selected?.id ?? 'closed'} meal={selected} onClose={() => setSelected(null)} />
    </AppScreen>
  );
}

function MealCard({ meal, onPress }: { meal: HighProteinMeal; onPress: () => void }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <AnimatedPressable onPress={onPress} accessibilityRole="button" accessibilityLabel={meal.name}>
      <AppCard style={styles.card} padded={false}>
        {!imageFailed ? (
          <Image
            source={{ uri: meal.imageUrl }}
            style={styles.cardImage}
            resizeMode="cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <LinearGradient colors={['#D8F5EF', '#B8E8DE']} style={styles.cardImageFallback}>
            <Ionicons name="restaurant-outline" size={32} color={Colors.nutrition} />
          </LinearGradient>
        )}
        <View style={styles.cardBody}>
          <Text style={styles.cardSlot}>{meal.slot.toUpperCase()}</Text>
          <Text style={styles.cardTitle}>{meal.name}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaHighlight}>{meal.proteinG}g protein</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.meta}>{meal.calories} kcal</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.meta}>{meal.minutes} min</Text>
          </View>
          <View style={styles.tagRow}>
            {meal.tags.slice(0, 2).map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </AppCard>
    </AnimatedPressable>
  );
}

function MealDetailModal({
  meal,
  onClose,
}: {
  meal: HighProteinMeal | null;
  onClose: () => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!meal) return null;

  return (
    <Modal visible animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle} numberOfLines={2}>
            {meal.name}
          </Text>
          <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button" accessibilityLabel="Close">
            <Ionicons name="close" size={24} color={Colors.text} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
          {!imageFailed ? (
            <Image
              source={{ uri: meal.imageUrl }}
              style={styles.modalImage}
              resizeMode="cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <LinearGradient colors={['#D8F5EF', '#B8E8DE']} style={styles.modalImage}>
              <Ionicons name="restaurant-outline" size={40} color={Colors.nutrition} />
            </LinearGradient>
          )}

          <View style={styles.statStrip}>
            <View style={styles.statCell}>
              <Text style={styles.statValue}>{meal.proteinG}g</Text>
              <Text style={styles.statLabel}>Protein</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCell}>
              <Text style={styles.statValue}>{meal.calories}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCell}>
              <Text style={styles.statValue}>{meal.minutes}m</Text>
              <Text style={styles.statLabel}>Prep</Text>
            </View>
          </View>

          <Text style={styles.why}>{meal.why}</Text>

          <Text style={styles.sectionLabel}>Ingredients</Text>
          {meal.ingredients.map((item) => (
            <Text key={item} style={styles.bullet}>
              • {item}
            </Text>
          ))}

          <Text style={styles.sectionLabel}>Steps</Text>
          {meal.steps.map((step, i) => (
            <Text key={step} style={styles.bullet}>
              {i + 1}. {step}
            </Text>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 34, fontWeight: '300' },
  headerTitle: { fontSize: Typography.size.lg, fontWeight: '800', color: Colors.text },
  content: { paddingBottom: Spacing['3xl'], gap: Spacing.md },
  hero: {
    marginHorizontal: Spacing.base,
    height: 160,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: Spacing.base,
  },
  heroImage: { borderRadius: Radius.xl },
  heroTitle: {
    color: Colors.white,
    fontSize: Typography.size.xl,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  heroSub: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.88)',
    fontSize: Typography.size.sm,
    lineHeight: 18,
  },
  filters: {
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.nutrition,
    borderColor: Colors.nutrition,
  },
  chipText: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.textSecondary },
  chipTextActive: { color: Colors.white },
  count: {
    paddingHorizontal: Spacing.base,
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  card: {
    marginHorizontal: Spacing.base,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 150 },
  cardImageFallback: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: { padding: Spacing.base, gap: 4 },
  cardSlot: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.nutrition,
    letterSpacing: 0.8,
  },
  cardTitle: {
    fontSize: Typography.size.base,
    fontWeight: '800',
    color: Colors.text,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 2 },
  metaHighlight: { fontSize: Typography.size.sm, fontWeight: '800', color: Colors.nutrition },
  meta: { fontSize: Typography.size.sm, color: Colors.textSecondary, fontWeight: '600' },
  metaDot: { marginHorizontal: 6, color: Colors.textTertiary },
  tagRow: { flexDirection: 'row', gap: Spacing.xs, marginTop: Spacing.xs },
  tag: {
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  tagText: { fontSize: Typography.size.xs, fontWeight: '600', color: Colors.textSecondary },
  disclaimer: {
    marginHorizontal: Spacing.base,
    marginTop: Spacing.sm,
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
    lineHeight: 16,
    textAlign: 'center',
  },
  modalRoot: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
  },
  modalTitle: {
    flex: 1,
    fontSize: Typography.size.lg,
    fontWeight: '800',
    color: Colors.text,
  },
  modalContent: { padding: Spacing.base, paddingBottom: Spacing['3xl'], gap: Spacing.sm },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statStrip: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  statCell: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontSize: Typography.size.lg, fontWeight: '800', color: Colors.text },
  statLabel: { fontSize: 11, fontWeight: '600', color: Colors.textTertiary },
  statDivider: { width: StyleSheet.hairlineWidth, backgroundColor: Colors.border },
  why: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  sectionLabel: {
    marginTop: Spacing.sm,
    fontSize: Typography.size.sm,
    fontWeight: '800',
    color: Colors.text,
  },
  bullet: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
