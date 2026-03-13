import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarField from '@/components/StarField';
import GlowingOrb from '@/components/GlowingOrb';
import { Colors } from '@/constants/colors';

const FAMOUS_STARS: Record<string, {
  name: string;
  constellation: string;
  type: string;
  distance: string;
  magnitude: string;
  color: string;
  glowColor: string;
  temperature: string;
  description: string;
  funFacts: string[];
}> = {
  sirius: {
    name: 'Sirius',
    constellation: 'Canis Major',
    type: 'Main Sequence (A-type)',
    distance: '8.6 light-years',
    magnitude: '-1.46',
    color: '#B0D8FF',
    glowColor: '#B0D8FF22',
    temperature: '9,940 K',
    description: 'Sirius is the brightest star in the night sky. Known as the "Dog Star", it is located in the constellation Canis Major. It is actually a binary system — Sirius A and Sirius B.',
    funFacts: [
      'Sirius is twice as massive as the Sun and 25 times more luminous',
      'The ancient Egyptians used Sirius to predict the Nile flood',
      'Sirius B is a white dwarf the size of Earth but with the mass of the Sun',
      'It will remain the brightest star for about the next 210,000 years',
    ],
  },
  vega: {
    name: 'Vega',
    constellation: 'Lyra',
    type: 'Main Sequence (A-type)',
    distance: '25 light-years',
    magnitude: '0.03',
    color: '#D0E8FF',
    glowColor: '#D0E8FF22',
    temperature: '9,602 K',
    description: 'Vega is one of the most luminous stars near the Sun and forms part of the Summer Triangle asterism. It was the North Star approximately 14,000 years ago and will be again in about 12,000 years.',
    funFacts: [
      'Vega was the first star (other than the Sun) to be photographed',
      'It rotates so fast it is noticeably flattened at the poles',
      'Vega is used as a standard reference point for measuring star brightness',
      'It has an infrared excess suggesting a debris disk similar to our Kuiper Belt',
    ],
  },
};

export default function StarDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const star = FAMOUS_STARS[id ?? 'sirius'] ?? FAMOUS_STARS['sirius'];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#05051a', '#0a0a2e', '#0d1b4b']}
        style={StyleSheet.absoluteFill}
      />
      <StarField starCount={150} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.orbContainer}>
          <GlowingOrb
            size={90}
            color={star.color}
            glowColor={star.glowColor}
            pulseDuration={2000}
          />
        </View>

        <Text style={styles.starName}>{star.name}</Text>
        <Text style={styles.constellation}>{star.constellation}</Text>

        <View style={styles.statsRow}>
          {[
            { label: 'Distance', value: star.distance },
            { label: 'Magnitude', value: star.magnitude },
            { label: 'Temperature', value: star.temperature },
          ].map((s) => (
            <View key={s.label} style={styles.statItem}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <LinearGradient
            colors={[star.color + '15', 'rgba(10,10,46,0.95)']}
            style={styles.cardGradient}
          >
            <Text style={styles.cardTitle}>About</Text>
            <Text style={styles.cardDesc}>{star.description}</Text>
          </LinearGradient>
        </View>

        <View style={styles.card}>
          <LinearGradient
            colors={['rgba(79, 195, 247, 0.1)', 'rgba(10,10,46,0.95)']}
            style={styles.cardGradient}
          >
            <Text style={styles.cardTitle}>Fun Facts</Text>
            {star.funFacts.map((fact, i) => (
              <View key={i} style={styles.factRow}>
                <View style={[styles.factDot, { backgroundColor: star.color }]} />
                <Text style={styles.factText}>{fact}</Text>
              </View>
            ))}
          </LinearGradient>
        </View>

        <View style={styles.typeCard}>
          <Text style={styles.typeLabel}>SPECTRAL TYPE</Text>
          <Text style={styles.typeValue}>{star.type}</Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05051a',
  },
  content: {
    paddingTop: 120,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  orbContainer: {
    marginBottom: 20,
  },
  starName: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.text.primary,
    textAlign: 'center',
  },
  constellation: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 1,
    marginBottom: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    alignSelf: 'stretch',
  },
  statItem: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.border.subtle,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.text.muted,
    letterSpacing: 0.5,
  },
  card: {
    alignSelf: 'stretch',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  cardGradient: {
    padding: 18,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 10,
  },
  cardDesc: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  factRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  factDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    flexShrink: 0,
  },
  factText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  typeCard: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    marginBottom: 14,
  },
  typeLabel: {
    fontSize: 10,
    color: Colors.text.muted,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  typeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  bottomPadding: {
    height: 60,
  },
});
