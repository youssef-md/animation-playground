import React from 'react';
import {
  MaterialCommunityIcons,
  Entypo,
  Octicons,
  Ionicons,
  SimpleLineIcons,
  AntDesign,
} from '@expo/vector-icons';

import { colors } from './colors';

const defaultIconStyle = { size: 32 };

// Trocar Dot Inversion e Skew Scroll, deixando o código!

export const sections = [
  {
    title: 'Animated Accordion',
    color: colors[0],
    githubLink:
      'https://github.com/youssef-md/rn-animation-playground/blob/master/src/screens/AnimatedAccordion/index.tsx',
    icon: <Entypo color={colors[0]} name="list" {...defaultIconStyle} />,
  },
  {
    title: 'Animated Wallet',
    color: colors[2],
    githubLink:
      'https://github.com/youssef-md/rn-animation-playground/blob/master/src/screens/AnimatedWallet/index.tsx',
    icon: (
      <MaterialCommunityIcons
        color={colors[2]}
        name="wallet-outline"
        {...defaultIconStyle}
      />
    ),
  },
  {
    title: 'Tinder Cards',
    color: colors[4],
    githubLink:
      'https://github.com/youssef-md/rn-animation-playground/blob/master/src/screens/TinderCards/index.tsx',
    icon: (
      <SimpleLineIcons color={colors[4]} name="fire" {...defaultIconStyle} />
    ),
  },
  {
    title: 'Shared Transition',
    color: colors[1],
    githubLink: '',
    icon: (
      <MaterialCommunityIcons
        color={colors[1]}
        name="cards"
        {...defaultIconStyle}
      />
    ),
  },
  {
    title: 'Headphone Carousel',
    color: colors[5],
    githubLink:
      'https://github.com/youssef-md/rn-animation-playground/blob/master/src/screens/HeadphoneCarousel/index.tsx',
    icon: (
      <Ionicons color={colors[5]} name="md-headset" {...defaultIconStyle} />
    ),
  },
  {
    title: 'Movies Carousel',
    color: colors[6],
    githubLink:
      'https://github.com/youssef-md/rn-animation-playground/blob/master/src/screens/MoviesCarousel/index.tsx',
    icon: (
      <MaterialCommunityIcons
        color={colors[6]}
        name="movie-open-outline"
        {...defaultIconStyle}
      />
    ),
  },
  {
    title: 'Path Morphing',
    color: colors[7],
    githubLink:
      'https://github.com/youssef-md/rn-animation-playground/blob/master/src/screens/PathMorphing/index.tsx',
    icon: (
      <MaterialCommunityIcons
        color={colors[7]}
        name="svg"
        {...defaultIconStyle}
      />
    ),
  },

  // Buggy behavior
  // {
  //   title: 'Skew Scroll',
  //   color: colors[1],
  //   githubLink:
  //     'https://github.com/youssef-md/rn-animation-playground/blob/master/src/screens/SkewScroll/index.tsx',
  //   icon: (
  //     <MaterialCommunityIcons
  //       color={colors[1]}
  //       name="skew-more"
  //       {...defaultIconStyle}
  //     />
  //   ),
  // },
  // {
  //   title: 'List Picker',
  //   color: colors[1],
  //   githubLink:
  //     'https://github.com/youssef-md/rn-animation-playground/tree/master/src/screens/ListPicker',
  //   icon: <AntDesign color={colors[1]} name="select1" {...defaultIconStyle} />,
  // },
  // {
  //   title: 'Dot Inversion',
  //   color: colors[3],
  //   githubLink:
  //     'https://github.com/youssef-md/rn-animation-playground/blob/master/src/screens/DotInversion/index.tsx',
  //   icon: (
  //     <Octicons color={colors[3]} name="primitive-dot" {...defaultIconStyle} />
  //   ),
  // },
];
