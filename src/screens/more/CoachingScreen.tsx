// src/screens/more/CoachingScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { BrandButton } from '../../components/ui';
import {
  COACHES, COACHING_SPECIALTIES, FORMAT_INFO, SESSION_LENGTHS, TIME_SLOTS,
  type CoachProfile, type CoachingBooking, type SessionFormat,
} from '../../data/coachingData';
import AppScreen from '../../components/common/AppScreen';

const BOOKINGS_KEY = 'wellnessShift.coachingBookings';

export default function CoachingScreen() {
  const navigation = useNavigation<any>();
  const [selectedFormat, setSelectedFormat] = useState<SessionFormat | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [bookings, setBookings] = useState<CoachingBooking[]>([]);
  const [bookingCoach, setBookingCoach] = useState<CoachProfile | null>(null);
  const [bookingFormat, setBookingFormat] = useState<SessionFormat>('video');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState(TIME_SLOTS[0]);
  const [bookingDuration, setBookingDuration] = useState<number>(30);

  useEffect(() => {
    AsyncStorage.getItem(BOOKINGS_KEY).then((raw) => {
      if (raw) setBookings(JSON.parse(raw));
    });
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().slice(0, 10));
  }, []);

  const filteredCoaches = COACHES.filter((c) => {
    if (selectedFormat && !c.formats.includes(selectedFormat)) return false;
    if (selectedSpecialty !== 'All' && !c.specialties.includes(selectedSpecialty)) return false;
    return true;
  });

  const openBooking = (coach: CoachProfile) => {
    setBookingCoach(coach);
    setBookingFormat(coach.formats[0]);
  };

  const confirmBooking = async () => {
    if (!bookingCoach) return;
    const booking: CoachingBooking = {
      id: `bk-${Date.now()}`,
      coachId: bookingCoach.id,
      coachName: bookingCoach.name,
      format: bookingFormat,
      date: bookingDate,
      time: bookingTime,
      durationMin: bookingDuration,
      createdAt: new Date().toISOString(),
    };
    const next = [booking, ...bookings];
    setBookings(next);
    await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(next));
    setBookingCoach(null);
    Alert.alert(
      'Session booked',
      `${bookingCoach.name} · ${bookingDate} at ${bookingTime} (${bookingDuration} min)`,
    );
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coaching & Consultations</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>1-on-1 Wellness Sessions</Text>
          <Text style={styles.heroSub}>
            Book certified coaches for video, phone, in-person, or chat consultations.
          </Text>
        </View>

        {bookings.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Upcoming sessions</Text>
            {bookings.slice(0, 3).map((b) => (
              <View key={b.id} style={styles.bookingCard}>
                <Text style={styles.bookingCoach}>{b.coachName}</Text>
                <Text style={styles.bookingMeta}>
                  {b.date} · {b.time} · {FORMAT_INFO[b.format].label} · {b.durationMin} min
                </Text>
              </View>
            ))}
          </>
        )}

        <Text style={styles.sectionLabel}>Specialty</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {COACHING_SPECIALTIES.map((spec) => (
            <TouchableOpacity
              key={spec}
              style={[styles.chip, selectedSpecialty === spec && styles.chipActive]}
              onPress={() => setSelectedSpecialty(spec)}
            >
              <Text style={[styles.chipText, selectedSpecialty === spec && styles.chipTextActive]}>{spec}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionLabel}>Session format</Text>
        <View style={styles.formatRow}>
          {(Object.entries(FORMAT_INFO) as [SessionFormat, typeof FORMAT_INFO[SessionFormat]][]).map(([key, info]) => (
            <TouchableOpacity
              key={key}
              style={[styles.formatChip, selectedFormat === key && styles.formatChipActive]}
              onPress={() => setSelectedFormat(selectedFormat === key ? null : key)}
            >
              <Text style={styles.formatIcon}>{info.icon}</Text>
              <Text style={[styles.formatLabel, selectedFormat === key && styles.formatLabelActive]}>{info.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>{filteredCoaches.length} coaches available</Text>
        {filteredCoaches.map((coach) => (
          <View key={coach.id} style={styles.coachCard}>
            <View style={styles.coachHeader}>
              <View style={styles.coachAvatar}><Text style={{ fontSize: 28 }}>{coach.avatar}</Text></View>
              <View style={styles.coachInfo}>
                <Text style={styles.coachName}>{coach.name}</Text>
                <Text style={styles.coachSpecialty}>{coach.specialty}</Text>
                <Text style={styles.coachNext}>Next: {coach.nextAvailable}</Text>
                <View style={styles.coachMeta}>
                  <Text style={styles.coachRating}>⭐ {coach.rating}</Text>
                  <Text style={styles.coachDot}>·</Text>
                  <Text style={styles.coachPrice}>{coach.price}/session</Text>
                </View>
              </View>
            </View>
            <Text style={styles.coachBio}>{coach.bio}</Text>
            <TouchableOpacity style={styles.bookBtn} onPress={() => openBooking(coach)}>
              <Text style={styles.bookBtnText}>Book session</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      <Modal visible={!!bookingCoach} transparent animationType="slide" onRequestClose={() => setBookingCoach(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Book {bookingCoach?.name}</Text>

            <Text style={styles.modalLabel}>Format</Text>
            <View style={styles.formatRow}>
              {bookingCoach?.formats.map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.formatChip, bookingFormat === f && styles.formatChipActive]}
                  onPress={() => setBookingFormat(f)}
                >
                  <Text style={styles.formatIcon}>{FORMAT_INFO[f].icon}</Text>
                  <Text style={[styles.formatLabel, bookingFormat === f && styles.formatLabelActive]}>
                    {FORMAT_INFO[f].label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalLabel}>Duration</Text>
            <View style={styles.durationRow}>
              {SESSION_LENGTHS.map((min) => (
                <TouchableOpacity
                  key={min}
                  style={[styles.durationChip, bookingDuration === min && styles.chipActive]}
                  onPress={() => setBookingDuration(min)}
                >
                  <Text style={[styles.chipText, bookingDuration === min && styles.chipTextActive]}>{min} min</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalLabel}>Time</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
              {TIME_SLOTS.map((slot) => (
                <TouchableOpacity
                  key={slot}
                  style={[styles.chip, bookingTime === slot && styles.chipActive]}
                  onPress={() => setBookingTime(slot)}
                >
                  <Text style={[styles.chipText, bookingTime === slot && styles.chipTextActive]}>{slot}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <BrandButton label="Confirm booking" onPress={confirmBooking} />
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setBookingCoach(null)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.md },
  hero: { backgroundColor: Colors.primaryBg, borderRadius: Radius.xl, padding: Spacing.xl, gap: Spacing.sm },
  heroTitle: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text },
  heroSub: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  sectionLabel: { fontSize: Typography.size.xs, fontWeight: '700', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8 },
  chipRow: { gap: Spacing.sm, paddingBottom: Spacing.xs },
  chip: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: Radius.pill, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.borderLight },
  chipActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  chipText: { fontSize: Typography.size.sm, color: Colors.textSecondary, fontWeight: '500' },
  chipTextActive: { color: Colors.primary, fontWeight: '700' },
  formatRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  formatChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: Radius.xl, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.white },
  formatChipActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryBg },
  formatIcon: { fontSize: 16 },
  formatLabel: { fontSize: Typography.size.sm, color: Colors.textSecondary, fontWeight: '500' },
  formatLabelActive: { color: Colors.primary, fontWeight: '700' },
  bookingCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm, gap: 4 },
  bookingCoach: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  bookingMeta: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  coachCard: { backgroundColor: Colors.white, borderRadius: Radius.xl, padding: Spacing.base, ...Shadow.sm, gap: Spacing.md },
  coachHeader: { flexDirection: 'row', gap: Spacing.md },
  coachAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.primaryBg, alignItems: 'center', justifyContent: 'center' },
  coachInfo: { flex: 1, gap: 2 },
  coachName: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  coachSpecialty: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '600' },
  coachNext: { fontSize: Typography.size.xs, color: Colors.success, fontWeight: '600' },
  coachMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  coachRating: { fontSize: Typography.size.xs, color: Colors.text },
  coachDot: { fontSize: Typography.size.xs, color: Colors.textTertiary },
  coachPrice: { fontSize: Typography.size.xs, color: Colors.success, fontWeight: '700' },
  coachBio: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  bookBtn: { backgroundColor: Colors.primary, borderRadius: Radius.xl, paddingVertical: Spacing.md, alignItems: 'center' },
  bookBtnText: { color: Colors.white, fontSize: Typography.size.base, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: Colors.white, borderTopLeftRadius: Radius.xl, borderTopRightRadius: Radius.xl, padding: Spacing.xl, gap: Spacing.md, maxHeight: '85%' },
  modalTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  modalLabel: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.textSecondary },
  durationRow: { flexDirection: 'row', gap: Spacing.sm },
  durationChip: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: Radius.pill, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.borderLight },
  cancelBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  cancelText: { color: Colors.textSecondary, fontWeight: '600' },
});
