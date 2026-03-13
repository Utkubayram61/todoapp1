import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import StarField from '@/components/StarField';
import { CONSTELLATIONS, Constellation } from '@/constants/data';
import { Colors } from '@/constants/colors';

const { width } = Dimensions.get('window');

const SEASONS = ['All', 'Winter', 'Spring', 'Summer', 'Autumn', 'All Year'];

export default function ConstellationsScreen() {
  const [search, setSearch] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('All');

  const filtered = CONSTELLATIONS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.mythology.toLowerCase().includes(search.toLowerCase());
    const matchSeason = selectedSeason === 'All' || c.season === selectedSeason;
    return matchSearch && matchSeason;
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#05051a', '#0d0820', '#0a0a2e']}
        style={StyleSheet.absoluteFill}
      />
      <StarField starCount={120} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Constellations</Text>
          <Text style={styles.headerSub}>{filtered.length} patterns in the sky</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color={Colors.text.muted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search constellations..."
            placeholderTextColor={Colors.text.muted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={Colors.text.muted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Season Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.seasonScroll}
          style={styles.seasonContainer}
        >
          {SEASONS.map((season) => (
            <TouchableOpacity
              key={season}
              onPress={() => setSelectedSeason(season)}
              style={[
                styles.seasonChip,
                selectedSeason === season && styles.seasonChipActive,
              ]}
            >
              <Text
                style={[
                  styles.seasonChipText,
                  selectedSeason === season && styles.seasonChipTextActive,
                ]}
              >
                {season}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {filtered.map((constellation, index) => (
            <ConstellationCard
              key={constellation.id}
              item={constellation}
              index={index}
            />
          ))}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ConstellationCard({ item, index }: { item: Constellation; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Animated.View entering={FadeInDown.delay(index * 60).springify()}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setExpanded(!expanded)}
        style={styles.card}
      >
        <LinearGradient
          colors={[item.color + '18', 'rgba(10,10,46,0.95)']}
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardTop}>
            <View style={[styles.colorBar, { backgroundColor: item.color }]} />
            <View style={styles.cardMain}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <Text style={styles.cardLatin}>{item.latinName}</Text>
                </View>
                <Text style={styles.cardEmoji}>{item.emoji}</Text>
              </View>
              <View style={styles.tags}>
                <View style={[styles.tag, { borderColor: item.color + '60' }]}>
                  <Text style={[styles.tagText, { color: item.color }]}>{item.season}</Text>
                </View>
                <View style={styles.tag}>
                  <Ionicons name="star" size={10} color={Colors.text.muted} />
                  <Text style={styles.tagText}>{item.stars} stars</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.mythology}</Text>
                </View>
              </View>
            </View>
          </View>

          {expanded && (
            <View style={styles.expandedContent}>
              <View style={styles.divider} />
              <Text style={styles.descriptionText}>{item.description}</Text>
              <View style={styles.metaGrid}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>VISIBILITY</Text>
                  <Text style={styles.metaValue}>{item.visibility}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>MYTHOLOGY</Text>
                  <Text style={styles.metaValue}>{item.mythology}</Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.expandToggle}>
            <Ionicons
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={Colors.text.muted}
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    gap: 10,
  },
  searchIcon: {
    marginRight: 2,
  },
  searchInput: {
    flex: 1,
    color: Colors.text.primary,
    fontSize: 15,
  },
  seasonContainer: {
    marginBottom: 16,
  },
  seasonScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  seasonChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  seasonChipActive: {
    backgroundColor: 'rgba(79, 195, 247, 0.2)',
    borderColor: Colors.accent.blue,
  },
  seasonChipText: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  seasonChipTextActive: {
    color: Colors.accent.blue,
    fontWeight: '700',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  cardGradient: {
    padding: 16,
  },
  cardTop: {
    flexDirection: 'row',
    gap: 12,
  },
  colorBar: {
    width: 3,
    borderRadius: 2,
    alignSelf: 'stretch',
  },
  cardMain: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  cardLatin: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  cardEmoji: {
    fontSize: 28,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  tagText: {
    fontSize: 11,
    color: Colors.text.muted,
    fontWeight: '500',
  },
  expandedContent: {
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border.subtle,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: 14,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 10,
    color: Colors.text.muted,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 13,
    color: Colors.text.primary,
    fontWeight: '600',
  },
  expandToggle: {
    alignItems: 'center',
    marginTop: 8,
  },
  bottomPadding: {
    height: 100,
  },
});
