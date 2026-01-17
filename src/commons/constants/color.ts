/**
 * Color Constants
 * Foundation 색상 토큰 정의
 * 다크모드를 포함한 모든 경우에 색상을 토큰화하여 사용
 */

export const colors = {
  // Blue Scale
  blue: {
    5: "#F0F7FF",
    10: "#DBEEFF",
    20: "#BDDBFF",
    30: "#93BEFF",
    40: "#6DA5FA",
    50: "#497CFF",
    60: "#3A5CF3",
    70: "#274AE1",
    80: "#1530A6",
    90: "#0B2184",
  },

  // Gray Scale
  gray: {
    white: "#FFFFFF",
    5: "#F2F2F2",
    10: "#E4E4E4",
    20: "#D4D3D3",
    30: "#C7C7C7",
    40: "#ABABAB",
    50: "#919191",
    60: "#777777",
    70: "#5F5F5F",
    80: "#333333",
    90: "#1C1C1C",
    black: "#000000",
  },

  // Red Scale
  red: {
    5: "#FDD7DC",
    10: "#F797A4",
    20: "#F4677A",
    30: "#F03851",
    40: "#E4112E",
    50: "#B40E24",
    60: "#850A1B",
  },

  // Green Scale
  green: {
    5: "#D3F3E0",
    10: "#92E6B9",
    20: "#15D66F",
    30: "#12B75F",
    40: "#109C51",
    50: "#0E723C",
    60: "#084424",
  },

  // Yellow Scale
  yellow: {
    5: "#FFE499",
    10: "#FFD666",
    20: "#FFC933",
    30: "#FFB300",
    40: "#EBA500",
    50: "#D69600",
    60: "#B27D00",
  },

  // Cool Gray Scale
  coolGray: {
    1: "#F8F8FA",
    5: "#F6F6F9",
    10: "#EDEEF2",
    20: "#DDDFE5",
    30: "#D2D4DD",
    40: "#C7C9D5",
    50: "#BBBECD",
    60: "#B0B3C4",
  },

  // Gradients
  gradient: {
    primary: "linear-gradient(135deg, #6DA5FA 0%, #92EAF5 100%)",
    skeleton:
      "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 48.5%, rgba(255, 255, 255, 0) 100%)",
  },
} as const;

// Semantic Colors (의미론적 색상 토큰)
export const semanticColors = {
  // System Colors
  system: {
    primary: colors.blue[40],
    secondary: colors.blue[60],
    error: colors.red[30],
    success: colors.green[30],
    warning: colors.yellow[30],
  },

  // Text Colors
  text: {
    primary: colors.gray[90],
    secondary: colors.gray[60],
    disabled: colors.gray[40],
    inverse: colors.gray.white,
  },

  // Background Colors
  background: {
    primary: colors.gray.white,
    secondary: colors.gray[5],
    tertiary: colors.gray[10],
    inverse: colors.gray.black,
  },

  // Border Colors
  border: {
    light: colors.gray[20],
    medium: colors.gray[30],
    dark: colors.gray[50],
  },
} as const;

// Dark Mode Colors
export const darkModeColors = {
  text: {
    primary: colors.gray.white,
    secondary: colors.gray[40],
    disabled: colors.gray[60],
    inverse: colors.gray[90],
  },

  background: {
    primary: colors.gray.black,
    secondary: colors.gray[90],
    tertiary: colors.gray[80],
    inverse: colors.gray.white,
  },

  border: {
    light: colors.gray[80],
    medium: colors.gray[70],
    dark: colors.gray[50],
  },
} as const;

// Color Types
export type ColorScale = keyof typeof colors;
export type ColorShade<T extends ColorScale> = keyof (typeof colors)[T];
export type SemanticColorCategory = keyof typeof semanticColors;
export type SemanticColorShade<T extends SemanticColorCategory> =
  keyof (typeof semanticColors)[T];



















