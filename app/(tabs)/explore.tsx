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
import Animated, { FadeInDown } from 'react-native-reanimated';
import StarField from '@/components/StarField';
import { CELESTIAL_FACTS } from '@/constants/data';
import { Colors } from '@/constants/colors';

const { width } = Dimensions.get('window');

const TOPICS = [
  {
    id: '1',
    title: 'Nebulae',
    subtitle: 'Stellar nurseries',
    emoji: '🌌',
    color: '#CE93D8',
    description: 'Nebulae are giant clouds of gas and dust in space. They are often the birthplace of stars and can stretch across hundreds of light-years.',
    facts: [
      'The Crab Nebula is the remnant of a supernova explosion observed in 1054 AD',
      'The Eagle Nebula\'s "Pillars of Creation" are 6 trillion miles tall',
      'Nebulae can emit light, reflect it, or absorb it depending on their type',
    ],
  },
  {
    id: '2',
    title: 'Black Holes',
    subtitle: 'Gravity\'s extremes',
    emoji: '🕳️',
    color: '#F48FB1',
    description: 'Black holes are regions of spacetime where gravity is so strong that nothing — not even light — can escape from inside them.',
    facts: [
      'The first image of a black hole was captured in 2019 (M87*)',
      'If the Sun became a black hole, its event horizon would be about 3 km wide',
      'Time passes more slowly near a black hole due to gravitational time dilation',
    ],
  },
  {
    id: '3',
    title: 'Supernovae',
    subtitle: 'Stellar explosions',
    emoji: '💥',
    color: '#FFD54F',
    description: 'A supernova is a powerful and luminous stellar explosion that occurs at the end of massive stars\' lives, briefly outshining entire galaxies.',
    facts: [
      'A supernova can briefly outshine its entire host galaxy',
      'Most elements heavier than iron are created in supernovae',
      'Supernova remnants expand at thousands of kilometers per second',
    ],
  },
  {
    id: '4',
    title: 'Exoplanets',
    subtitle: 'Worlds beyond',
    emoji: '🌍',
    color: '#80CBC4',
    description: 'Exoplanets are planets orbiting stars outside our Solar System. Over 5,500 have been confirmed, with many potentially habitable.',
    facts: [
      'The first confirmed exoplanet around a sun-like star was discovered in 1995',
      'Kepler-22b was the first confirmed exoplanet in the habitable zone',
      'Some exoplanets rain glass sideways due to extreme winds',
    ],
  },
  {
    id: '5',
    title: 'Dark Matter',
    subtitle: 'The invisible cosmos',
    emoji: '🔮',
    color: '#4FC3F7',
    description: 'Dark matter is a hypothetical type of matter that doesn\'t interact with the electromagnetic force but would have gravitational effects.',
    facts: [
      'About 27% of the universe is thought to be dark matter',
      'Dark matter was first postulated in 1933 by Fritz Zwicky',
      'Scientists infer dark matter\'s existence from gravitational effects on visible matter',
    ],
  },
  {
    id: '6',
    title: 'Pulsars',
    subtitle: 'Cosmic lighthouses',
    emoji: '⚡',
    color: '#A5D6A7',
    description: 'Pulsars are highly magnetized rotating neutron stars that emit beams of electromagnetic radiation out of their magnetic poles.',
    facts: [
      'Some pulsars rotate hundreds of times per second',
      'The first pulsar was discovered in 1967 by Jocelyn Bell Burnell',
      'Pulsars are the most accurate natural clocks in the universe',
    ],
  },
];

export default function ExploreScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#05051a', '#0d0a20', '#0a0a2e']}
        style={StyleSheet.absoluteFill}
      />
      <StarField starCount={100} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSub}>Discover the universe</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Daily Facts Section */}
          <Text style={styles.sectionTitle}>Cosmic Facts</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.factsScroll}
            style={styles.factsContainer}
          >
            {CELESTIAL_FACTS.map((fact, i) => (
              <Animated.View key={fact.id} entering={FadeInDown.delay(i * 80).springify()}>
                <View style={styles.factCard}>
                  <LinearGradient
                    colors={['rgba(79, 195, 247, 0.12)', 'rgba(14, 14, 60, 0.95)']}
                    style={styles.factCardGradient}
                  >
                    <Text style={styles.factIcon}>{fact.icon}</Text>
                    <Text style={styles.factTitle}>{fact.title}</Text>
                    <Text style={styles.factText}>{fact.fact}</Text>
                    <View style={styles.factCategory}>
                      <Text style={styles.factCategoryText}>{fact.category}</Text>
                    </View>
                  </LinearGradient>
                </View>
              </Animated.View>
            ))}
          </ScrollView>

          {/* Deep Space Topics */}
          <Text style={styles.sectionTitle}>Deep Space Topics</Text>
          <View style={styles.topicsGrid}>
            {TOPICS.map((topic, i) => (
              <Animated.View
                key={topic.id}
                entering={FadeInDown.delay(i * 60).springify()}
                style={styles.topicWrapper}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelected(selected === topic.id ? null : topic.id)}
                  style={[
                    styles.topicCard,
                    selected === topic.id && { borderColor: topic.color + '60' },
                  ]}
                >
                  <LinearGradient
                    colors={[topic.color + '18', 'rgba(10,10,46,0.97)']}
                    style={styles.topicGradient}
                  >
                    <View style={styles.topicHeader}>
                      <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                      <View style={styles.topicTitles}>
                        <Text style={[styles.topicTitle, selected === topic.id && { color: topic.color }]}>
                          {topic.title}
                        </Text>
                        <Text style={styles.topicSubtitle}>{topic.subtitle}</Text>
                      </View>
                      <Ionicons
                        name={selected === topic.id ? 'chevron-up' : 'chevron-down'}
                        size={16}
                        color={Colors.text.muted}
                      />
                    </View>

                    {selected === topic.id && (
                      <View style={styles.topicExpanded}>
                        <View style={styles.topicDivider} />
                        <Text style={styles.topicDesc}>{topic.description}</Text>
                        <Text style={[styles.factsHeading, { color: topic.color }]}>
                          Key Facts
                        </Text>
                        {topic.facts.map((f, fi) => (
                          <View key={fi} style={styles.topicFact}>
                            <View style={[styles.factDot, { backgroundColor: topic.color }]} />
                            <Text style={styles.topicFactText}>{f}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {/* Observation Tips */}
          <View style={styles.tipsCard}>
            <LinearGradient
              colors={['rgba(232, 213, 163, 0.12)', 'rgba(10, 10, 46, 0.95)']}
              style={styles.tipsGradient}
            >
              <View style={styles.tipsHeader}>
                <Ionicons name="telescope-outline" size={22} color={Colors.text.accent} />
                <Text style={styles.tipsTitle}>Stargazing Tips</Text>
              </View>
              {[
                { icon: '🌑', tip: 'Go outside 20–30 minutes before observing to let your eyes dark-adapt' },
                { icon: '📍', tip: 'Find a location away from city lights — even 30 km can make a huge difference' },
                { icon: '📱', tip: 'Use a red light torch to preserve your night vision while reading star maps' },
                { icon: '🌡️', tip: 'Dress in layers — temperatures drop quickly at night, even in summer' },
              ].map((tip, i) => (
                <View key={i} style={styles.tipRow}>
                  <Text style={styles.tipIcon}>{tip.icon}</Text>
                  <Text style={styles.tipText}>{tip.tip}</Text>
                </View>
              ))}
            </LinearGradient>
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
  header: {
    paddingHorizontal: 20,
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
  content: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  factsContainer: {
    marginHorizontal: -20,
    marginBottom: 28,
  },
  factsScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  factCard: {
    width: width * 0.72,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 247, 0.2)',
  },
  factCardGradient: {
    padding: 18,
  },
  factIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  factTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  factText: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  factCategory: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(79, 195, 247, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  factCategoryText: {
    fontSize: 11,
    color: Colors.accent.blue,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  topicsGrid: {
    gap: 10,
    marginBottom: 28,
  },
  topicWrapper: {},
  topicCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  topicGradient: {
    padding: 16,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  topicEmoji: {
    fontSize: 28,
  },
  topicTitles: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  topicSubtitle: {
    fontSize: 12,
    color: Colors.text.muted,
    marginTop: 2,
  },
  topicExpanded: {
    marginTop: 14,
  },
  topicDivider: {
    height: 1,
    backgroundColor: Colors.border.subtle,
    marginBottom: 12,
  },
  topicDesc: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: 14,
  },
  factsHeading: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  topicFact: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  factDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    flexShrink: 0,
  },
  topicFactText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  tipsCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: 'rgba(232, 213, 163, 0.2)',
  },
  tipsGradient: {
    padding: 20,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.accent,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  tipIcon: {
    fontSize: 20,
    marginTop: 1,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  bottomPadding: {
    height: 100,
  },
});
