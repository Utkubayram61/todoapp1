import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import StarField from '@/components/StarField';
import GlowingOrb from '@/components/GlowingOrb';
import { PLANETS, Planet } from '@/constants/data';
import { Colors } from '@/constants/colors';

const { width } = Dimensions.get('window');

export default function PlanetsScreen() {
  const [selected, setSelected] = useState<Planet>(PLANETS[2]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#05051a', '#0a0520', '#0a0a2e']}
        style={StyleSheet.absoluteFill}
      />
      <StarField starCount={100} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Solar System</Text>
          <Text style={styles.headerSub}>Our cosmic neighborhood</Text>
        </View>

        {/* Planet Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selectorScroll}
          style={styles.selectorContainer}
        >
          {PLANETS.map((planet) => (
            <TouchableOpacity
              key={planet.id}
              onPress={() => setSelected(planet)}
              style={[
                styles.selectorItem,
                selected.id === planet.id && {
                  borderColor: planet.color,
                  backgroundColor: planet.color + '20',
                },
              ]}
            >
              <Text style={styles.selectorEmoji}>{planet.emoji}</Text>
              <Text
                style={[
                  styles.selectorName,
                  selected.id === planet.id && { color: planet.color },
                ]}
              >
                {planet.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Planet Detail */}
        <Animated.View key={selected.id} entering={FadeIn.duration(400)} style={styles.detailCard}>
          <LinearGradient
            colors={[selected.color + '20', 'rgba(10,10,46,0.98)', 'rgba(5,5,26,0.98)']}
            style={styles.detailGradient}
          >
            <View style={styles.detailTop}>
              <View style={styles.detailInfo}>
                <Text style={styles.detailName}>{selected.name}</Text>
                <Text style={styles.detailSub}>Planet #{selected.id} from the Sun</Text>
                <Text style={styles.detailDesc}>{selected.description}</Text>
              </View>
              <GlowingOrb
                size={selected.size}
                color={selected.color}
                glowColor={selected.glowColor}
              />
            </View>

            {/* Fun Fact */}
            <View style={[styles.funFactCard, { borderColor: selected.color + '40' }]}>
              <Ionicons name="bulb-outline" size={16} color={selected.color} />
              <Text style={styles.funFactText}>{selected.funFact}</Text>
            </View>

            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              {[
                { label: 'Distance from Sun', value: selected.distanceFromSun, icon: 'sunny-outline' },
                { label: 'Diameter', value: selected.diameter, icon: 'resize-outline' },
                { label: 'Moons', value: selected.moons.toString(), icon: 'moon-outline' },
                { label: 'Orbital Period', value: selected.orbitalPeriod, icon: 'time-outline' },
              ].map((stat) => (
                <View key={stat.label} style={[styles.statItem, { borderColor: selected.color + '25' }]}>
                  <LinearGradient
                    colors={[selected.color + '12', 'transparent']}
                    style={styles.statGradient}
                  >
                    <Ionicons name={stat.icon as any} size={18} color={selected.color} />
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </LinearGradient>
                </View>
              ))}
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Order in Solar System */}
        <View style={styles.orderSection}>
          <Text style={styles.orderTitle}>Solar System Order</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.orderScroll}
          >
            {PLANETS.map((planet, i) => (
              <TouchableOpacity
                key={planet.id}
                onPress={() => setSelected(planet)}
                style={styles.orderItem}
              >
                <View
                  style={[
                    styles.orderOrb,
                    {
                      width: planet.size * 0.4,
                      height: planet.size * 0.4,
                      borderRadius: planet.size * 0.2,
                      backgroundColor: planet.color,
                      opacity: selected.id === planet.id ? 1 : 0.4,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.orderName,
                    selected.id === planet.id && { color: planet.color },
                  ]}
                >
                  {planet.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.text.primary,
  },
  headerSub: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  selectorContainer: {
    marginBottom: 20,
    marginHorizontal: -20,
  },
  selectorScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  selectorItem: {
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    gap: 4,
  },
  selectorEmoji: {
    fontSize: 22,
  },
  selectorName: {
    fontSize: 11,
    color: Colors.text.secondary,
    fontWeight: '600',
  },
  detailCard: {
    borderRadius: 24,
    overflow: 'hidden',
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    marginBottom: 16,
  },
  detailGradient: {
    padding: 20,
    flex: 1,
  },
  detailTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailInfo: {
    flex: 1,
    marginRight: 16,
  },
  detailName: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text.primary,
  },
  detailSub: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginBottom: 10,
  },
  detailDesc: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  funFactCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    marginBottom: 16,
  },
  funFactText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text.secondary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statItem: {
    width: (width - 62) / 2,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
  },
  statGradient: {
    padding: 14,
    gap: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.text.muted,
    letterSpacing: 0.5,
  },
  orderSection: {
    marginBottom: 100,
    marginHorizontal: -20,
  },
  orderTitle: {
    fontSize: 14,
    color: Colors.text.muted,
    marginBottom: 12,
    paddingHorizontal: 20,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  orderScroll: {
    paddingHorizontal: 20,
    gap: 16,
    alignItems: 'center',
  },
  orderItem: {
    alignItems: 'center',
    gap: 6,
  },
  orderOrb: {},
  orderName: {
    fontSize: 10,
    color: Colors.text.muted,
    fontWeight: '500',
  },
});
