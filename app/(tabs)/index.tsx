import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarField from '@/components/StarField';
import ShootingStar from '@/components/ShootingStar';
import GlowingOrb from '@/components/GlowingOrb';
import { CELESTIAL_FACTS, CONSTELLATIONS } from '@/constants/data';
import { Colors } from '@/constants/colors';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour >= 5 && hour < 12
      ? 'Good Morning'
      : hour >= 12 && hour < 18
      ? 'Good Afternoon'
      : 'Good Evening';

  const dailyFact = CELESTIAL_FACTS[Math.floor(Math.random() * CELESTIAL_FACTS.length)];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#05051a', '#0a0a2e', '#0d1b4b', '#0a2a6e']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.3, y: 1 }}
      />

      <StarField starCount={180} />

      <ShootingStar delay={2000} />
      <ShootingStar delay={7000} />
      <ShootingStar delay={13000} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.title}>Night Sky</Text>
            </View>
            <TouchableOpacity style={styles.settingsBtn}>
              <Ionicons name="options-outline" size={24} color={Colors.text.accent} />
            </TouchableOpacity>
          </View>

          {/* Moon Phase Card */}
          <View style={styles.moonCard}>
            <LinearGradient
              colors={['rgba(14,14,60,0.95)', 'rgba(10,10,46,0.98)']}
              style={styles.moonCardGradient}
            >
              <View style={styles.moonContent}>
                <View style={styles.moonInfo}>
                  <Text style={styles.moonPhaseLabel}>Tonight's Moon</Text>
                  <Text style={styles.moonPhaseName}>Waxing Gibbous</Text>
                  <Text style={styles.moonPercent}>78% Illuminated</Text>
                  <View style={styles.moonMeta}>
                    <View style={styles.moonMetaItem}>
                      <Ionicons name="arrow-up-outline" size={14} color={Colors.accent.blue} />
                      <Text style={styles.moonMetaText}>Rise: 14:32</Text>
                    </View>
                    <View style={styles.moonMetaItem}>
                      <Ionicons name="arrow-down-outline" size={14} color={Colors.accent.purple} />
                      <Text style={styles.moonMetaText}>Set: 03:18</Text>
                    </View>
                  </View>
                </View>
                <GlowingOrb
                  size={70}
                  color="#E8D5A3"
                  glowColor="#E8D5A320"
                />
              </View>
            </LinearGradient>
          </View>

          {/* Daily Fact */}
          <View style={styles.factCard}>
            <LinearGradient
              colors={['rgba(79, 195, 247, 0.12)', 'rgba(14, 14, 60, 0.9)']}
              style={styles.factCardGradient}
            >
              <View style={styles.factHeader}>
                <Text style={styles.factEmoji}>{dailyFact.icon}</Text>
                <View style={styles.factBadge}>
                  <Text style={styles.factBadgeText}>DAILY FACT</Text>
                </View>
              </View>
              <Text style={styles.factTitle}>{dailyFact.title}</Text>
              <Text style={styles.factText}>{dailyFact.fact}</Text>
            </LinearGradient>
          </View>

          {/* Tonight's Highlights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tonight's Highlights</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.highlightsScroll}
            >
              {[
                { icon: '🌟', label: 'Sirius', sub: 'Brightest Star', color: '#4FC3F7' },
                { icon: '♈', label: 'Jupiter', sub: 'Visible 21:00', color: '#C49A6C' },
                { icon: '🌠', label: 'Geminids', sub: '120 meteors/hr', color: '#CE93D8' },
                { icon: '🌌', label: 'Milky Way', sub: 'Core visible', color: '#F48FB1' },
              ].map((item, i) => (
                <View key={i} style={[styles.highlightItem, { borderColor: item.color + '40' }]}>
                  <LinearGradient
                    colors={[item.color + '20', 'transparent']}
                    style={styles.highlightGradient}
                  >
                    <Text style={styles.highlightIcon}>{item.icon}</Text>
                    <Text style={[styles.highlightLabel, { color: item.color }]}>{item.label}</Text>
                    <Text style={styles.highlightSub}>{item.sub}</Text>
                  </LinearGradient>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Featured Constellations */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Constellations</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/constellations')}>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            {CONSTELLATIONS.slice(0, 3).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.constellationRow}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={[item.color + '15', 'rgba(14,14,60,0.8)']}
                  style={styles.constellationRowGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <View style={[styles.constellationDot, { backgroundColor: item.color }]} />
                  <View style={styles.constellationInfo}>
                    <Text style={styles.constellationName}>{item.name}</Text>
                    <Text style={styles.constellationSub}>{item.season} · {item.mythology}</Text>
                  </View>
                  <Text style={styles.constellationEmoji}>{item.emoji}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05051a',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: Colors.text.secondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.text.primary,
    letterSpacing: 1,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  moonCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(232, 213, 163, 0.2)',
  },
  moonCardGradient: {
    padding: 20,
  },
  moonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moonInfo: {
    flex: 1,
  },
  moonPhaseLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  moonPhaseName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text.accent,
    marginBottom: 4,
  },
  moonPercent: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  moonMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  moonMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  moonMetaText: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  factCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 247, 0.2)',
  },
  factCardGradient: {
    padding: 20,
  },
  factHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  factEmoji: {
    fontSize: 28,
  },
  factBadge: {
    backgroundColor: 'rgba(79, 195, 247, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 247, 0.3)',
  },
  factBadgeText: {
    fontSize: 10,
    color: Colors.accent.blue,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  factTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  factText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.accent.blue,
    fontWeight: '600',
  },
  highlightsScroll: {
    gap: 12,
    paddingRight: 4,
  },
  highlightItem: {
    width: (width - 72) / 3,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  highlightGradient: {
    padding: 14,
    alignItems: 'center',
    gap: 6,
  },
  highlightIcon: {
    fontSize: 28,
  },
  highlightLabel: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  highlightSub: {
    fontSize: 10,
    color: Colors.text.muted,
    textAlign: 'center',
  },
  constellationRow: {
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  constellationRowGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 14,
  },
  constellationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  constellationInfo: {
    flex: 1,
  },
  constellationName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  constellationSub: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  constellationEmoji: {
    fontSize: 24,
  },
  bottomPadding: {
    height: 100,
  },
});
