export interface Constellation {
  id: string;
  name: string;
  latinName: string;
  mythology: string;
  stars: number;
  visibility: string;
  season: string;
  emoji: string;
  description: string;
  color: string;
}

export interface Planet {
  id: string;
  name: string;
  distanceFromSun: string;
  diameter: string;
  moons: number;
  orbitalPeriod: string;
  description: string;
  color: string;
  glowColor: string;
  size: number;
  emoji: string;
  funFact: string;
}

export interface CelestialFact {
  id: string;
  title: string;
  fact: string;
  icon: string;
  category: string;
}

export const CONSTELLATIONS: Constellation[] = [
  {
    id: '1',
    name: 'Orion',
    latinName: 'Orion',
    mythology: 'Greek',
    stars: 7,
    visibility: 'Northern & Southern',
    season: 'Winter',
    emoji: '⚔️',
    description: 'The Hunter — one of the most recognized constellations in the night sky, featuring the famous Orion\'s Belt of three bright stars.',
    color: '#4FC3F7',
  },
  {
    id: '2',
    name: 'Ursa Major',
    latinName: 'Ursa Major',
    mythology: 'Greek',
    stars: 7,
    visibility: 'Northern',
    season: 'Spring',
    emoji: '🐻',
    description: 'The Great Bear — contains the famous Big Dipper asterism. Two of its stars point toward Polaris, the North Star.',
    color: '#CE93D8',
  },
  {
    id: '3',
    name: 'Cassiopeia',
    latinName: 'Cassiopeia',
    mythology: 'Greek',
    stars: 5,
    visibility: 'Northern',
    season: 'All Year',
    emoji: '👑',
    description: 'The Queen — recognizable by its distinctive W or M shape. Named after the vain queen of Ethiopian mythology.',
    color: '#F48FB1',
  },
  {
    id: '4',
    name: 'Leo',
    latinName: 'Leo',
    mythology: 'Greek',
    stars: 9,
    visibility: 'Northern & Southern',
    season: 'Spring',
    emoji: '🦁',
    description: 'The Lion — a zodiac constellation featuring the bright star Regulus. Represents the Nemean Lion slain by Hercules.',
    color: '#FFD54F',
  },
  {
    id: '5',
    name: 'Scorpius',
    latinName: 'Scorpius',
    mythology: 'Greek',
    stars: 18,
    visibility: 'Southern',
    season: 'Summer',
    emoji: '🦂',
    description: 'The Scorpion — a zodiac constellation with the red supergiant Antares at its heart, representing the scorpion that killed Orion.',
    color: '#EF9A9A',
  },
  {
    id: '6',
    name: 'Cygnus',
    latinName: 'Cygnus',
    mythology: 'Greek',
    stars: 9,
    visibility: 'Northern',
    season: 'Summer',
    emoji: '🦢',
    description: 'The Swan — contains Deneb, one of the most luminous stars visible to the naked eye, and forms part of the Summer Triangle.',
    color: '#80CBC4',
  },
  {
    id: '7',
    name: 'Lyra',
    latinName: 'Lyra',
    mythology: 'Greek',
    stars: 5,
    visibility: 'Northern',
    season: 'Summer',
    emoji: '🎵',
    description: 'The Lyre — small but prominent constellation containing Vega, one of the brightest stars. Named after Orpheus\'s magical lyre.',
    color: '#B39DDB',
  },
  {
    id: '8',
    name: 'Perseus',
    latinName: 'Perseus',
    mythology: 'Greek',
    stars: 19,
    visibility: 'Northern',
    season: 'Autumn',
    emoji: '🗡️',
    description: 'The Hero — constellation representing Perseus who slew Medusa. Contains Algol, the famous "Demon Star" eclipsing binary.',
    color: '#A5D6A7',
  },
];

export const PLANETS: Planet[] = [
  {
    id: '1',
    name: 'Mercury',
    distanceFromSun: '57.9M km',
    diameter: '4,879 km',
    moons: 0,
    orbitalPeriod: '88 days',
    description: 'The smallest planet and closest to the Sun. Mercury has extreme temperature swings from -180°C at night to 430°C during the day.',
    color: '#B5B5B5',
    glowColor: '#8a8a8a33',
    size: 40,
    emoji: '⚫',
    funFact: 'A day on Mercury is longer than a year on Mercury!',
  },
  {
    id: '2',
    name: 'Venus',
    distanceFromSun: '108.2M km',
    diameter: '12,104 km',
    moons: 0,
    orbitalPeriod: '225 days',
    description: 'The hottest planet with temperatures reaching 465°C. Its thick atmosphere of CO₂ creates a runaway greenhouse effect.',
    color: '#E8C97A',
    glowColor: '#E8C97A33',
    size: 55,
    emoji: '🌕',
    funFact: 'Venus rotates backwards compared to most planets!',
  },
  {
    id: '3',
    name: 'Earth',
    distanceFromSun: '149.6M km',
    diameter: '12,742 km',
    moons: 1,
    orbitalPeriod: '365 days',
    description: 'Our home planet — the only known world to harbor life. About 71% of Earth\'s surface is covered by water.',
    color: '#4FC3F7',
    glowColor: '#4FC3F733',
    size: 56,
    emoji: '🌍',
    funFact: 'Earth is the densest planet in the Solar System!',
  },
  {
    id: '4',
    name: 'Mars',
    distanceFromSun: '227.9M km',
    diameter: '6,779 km',
    moons: 2,
    orbitalPeriod: '687 days',
    description: 'The Red Planet has the tallest volcano in the solar system — Olympus Mons — standing 21 km high.',
    color: '#EF6C52',
    glowColor: '#EF6C5233',
    size: 48,
    emoji: '🔴',
    funFact: 'Mars has the largest dust storms in the solar system!',
  },
  {
    id: '5',
    name: 'Jupiter',
    distanceFromSun: '778.5M km',
    diameter: '139,820 km',
    moons: 95,
    orbitalPeriod: '12 years',
    description: 'The largest planet. The Great Red Spot is a storm that has been raging for over 400 years, larger than Earth itself.',
    color: '#C49A6C',
    glowColor: '#C49A6C33',
    size: 90,
    emoji: '🟤',
    funFact: 'Jupiter\'s magnetic field is 20,000 times stronger than Earth\'s!',
  },
  {
    id: '6',
    name: 'Saturn',
    distanceFromSun: '1.43B km',
    diameter: '116,460 km',
    moons: 146,
    orbitalPeriod: '29 years',
    description: 'Famous for its stunning ring system made of ice and rock. Saturn is so light it could float on water!',
    color: '#F0D080',
    glowColor: '#F0D08033',
    size: 80,
    emoji: '🪐',
    funFact: 'Saturn\'s rings are only about 10 meters thick on average!',
  },
  {
    id: '7',
    name: 'Uranus',
    distanceFromSun: '2.87B km',
    diameter: '50,724 km',
    moons: 28,
    orbitalPeriod: '84 years',
    description: 'An ice giant that rotates on its side with an axial tilt of 98°. It appears blue-green due to methane in its atmosphere.',
    color: '#7DE8E8',
    glowColor: '#7DE8E833',
    size: 65,
    emoji: '🔵',
    funFact: 'Uranus is the coldest planet at -224°C despite not being the farthest!',
  },
  {
    id: '8',
    name: 'Neptune',
    distanceFromSun: '4.5B km',
    diameter: '49,244 km',
    moons: 16,
    orbitalPeriod: '165 years',
    description: 'The windiest planet with gusts reaching 2,100 km/h. Neptune has a large storm called the Great Dark Spot.',
    color: '#4169E1',
    glowColor: '#4169E133',
    size: 63,
    emoji: '🌀',
    funFact: 'One year on Neptune equals 165 Earth years!',
  },
];

export const CELESTIAL_FACTS: CelestialFact[] = [
  {
    id: '1',
    title: 'The Sun\'s Age',
    fact: 'Our Sun is about 4.6 billion years old and is roughly halfway through its main-sequence lifetime.',
    icon: '☀️',
    category: 'Solar System',
  },
  {
    id: '2',
    title: 'Speed of Light',
    fact: 'Light from the Sun takes about 8 minutes and 20 seconds to reach Earth, traveling at 299,792 km/s.',
    icon: '⚡',
    category: 'Physics',
  },
  {
    id: '3',
    title: 'Milky Way Size',
    fact: 'Our galaxy is approximately 100,000 light-years in diameter and contains 200-400 billion stars.',
    icon: '🌌',
    category: 'Galaxy',
  },
  {
    id: '4',
    title: 'Observable Universe',
    fact: 'The observable universe contains an estimated 2 trillion galaxies and is about 93 billion light-years in diameter.',
    icon: '🔭',
    category: 'Universe',
  },
  {
    id: '5',
    title: 'Black Holes',
    fact: 'The supermassive black hole at the center of our galaxy, Sagittarius A*, has a mass of 4 million suns.',
    icon: '🕳️',
    category: 'Phenomena',
  },
  {
    id: '6',
    title: 'Star Formation',
    fact: 'New stars are born every year in our galaxy. The Milky Way creates about 3 solar masses worth of new stars annually.',
    icon: '✨',
    category: 'Stars',
  },
];
