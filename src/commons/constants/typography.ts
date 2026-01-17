/**
 * Typography Constants
 * Foundation 타이포그래피 토큰 정의
 * 모바일/데스크톱, 한글/영문을 포함한 모든 경우에 typography를 토큰화하여 사용
 */

// Font Families
export const fontFamilies = {
  korean:
    "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  english:
    "SUIT Variable, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
} as const;

// Font Weights
export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

// Typography Styles - Web (Desktop)
export const webTypography = {
  headline: {
    headline01: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.semibold,
      fontSize: 48,
      lineHeight: 60,
    },
    headline02: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.semibold,
      fontSize: 36,
      lineHeight: 48,
    },
    headline03: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.semibold,
      fontSize: 28,
      lineHeight: 36,
    },
  },
} as const;

// Typography Styles - Mobile
export const mobileTypography = {
  headline: {
    headline01: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.bold,
      fontSize: 24,
      lineHeight: 32,
    },
    headline02: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.extrabold,
      fontSize: 22,
      lineHeight: 30,
    },
    headline03: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.bold,
      fontSize: 20,
      lineHeight: 28,
    },
  },
  title: {
    title01: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.bold,
      fontSize: 18,
      lineHeight: 24,
    },
    title02: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.bold,
      fontSize: 16,
      lineHeight: 22,
    },
    title03: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.bold,
      fontSize: 14,
      lineHeight: 20,
    },
    subTitle01: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.semibold,
      fontSize: 14,
      lineHeight: 22,
    },
    subTitle02: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.semibold,
      fontSize: 12,
      lineHeight: 18,
    },
  },
  body: {
    body01Medium: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.medium,
      fontSize: 16,
      lineHeight: 24,
    },
    body02Medium: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.medium,
      fontSize: 14,
      lineHeight: 22,
    },
    body03Medium: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.medium,
      fontSize: 12,
      lineHeight: 18,
    },
    body01Regular: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.regular,
      fontSize: 16,
      lineHeight: 22,
    },
    body02Regular: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.regular,
      fontSize: 14,
      lineHeight: 20,
    },
    body03Regular: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.regular,
      fontSize: 12,
      lineHeight: 16,
    },
  },
  caption: {
    caption01: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.semibold,
      fontSize: 12,
      lineHeight: 14,
    },
    caption02Medium: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.semibold,
      fontSize: 10,
      lineHeight: 12,
    },
    caption02Regular: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.medium,
      fontSize: 10,
      lineHeight: 12,
    },
    caption03: {
      fontFamily: fontFamilies.korean,
      fontWeight: fontWeights.semibold,
      fontSize: 8,
      lineHeight: 10,
    },
  },
} as const;

// English Typography Variants (SUIT 폰트 사용)
export const englishTypography = {
  // 영문용으로 fontFamily를 SUIT로 변경한 변형들
  // 필요시 여기에 추가하여 사용
  headline: {
    headline01: {
      ...mobileTypography.headline.headline01,
      fontFamily: fontFamilies.english,
    },
    headline02: {
      ...mobileTypography.headline.headline02,
      fontFamily: fontFamilies.english,
    },
    headline03: {
      ...mobileTypography.headline.headline03,
      fontFamily: fontFamilies.english,
    },
  },
  title: {
    title01: {
      ...mobileTypography.title.title01,
      fontFamily: fontFamilies.english,
    },
    title02: {
      ...mobileTypography.title.title02,
      fontFamily: fontFamilies.english,
    },
    title03: {
      ...mobileTypography.title.title03,
      fontFamily: fontFamilies.english,
    },
    subTitle01: {
      ...mobileTypography.title.subTitle01,
      fontFamily: fontFamilies.english,
    },
    subTitle02: {
      ...mobileTypography.title.subTitle02,
      fontFamily: fontFamilies.english,
    },
  },
  body: {
    body01Medium: {
      ...mobileTypography.body.body01Medium,
      fontFamily: fontFamilies.english,
    },
    body02Medium: {
      ...mobileTypography.body.body02Medium,
      fontFamily: fontFamilies.english,
    },
    body03Medium: {
      ...mobileTypography.body.body03Medium,
      fontFamily: fontFamilies.english,
    },
    body01Regular: {
      ...mobileTypography.body.body01Regular,
      fontFamily: fontFamilies.english,
    },
    body02Regular: {
      ...mobileTypography.body.body02Regular,
      fontFamily: fontFamilies.english,
    },
    body03Regular: {
      ...mobileTypography.body.body03Regular,
      fontFamily: fontFamilies.english,
    },
  },
  caption: {
    caption01: {
      ...mobileTypography.caption.caption01,
      fontFamily: fontFamilies.english,
    },
    caption02Medium: {
      ...mobileTypography.caption.caption02Medium,
      fontFamily: fontFamilies.english,
    },
    caption02Regular: {
      ...mobileTypography.caption.caption02Regular,
      fontFamily: fontFamilies.english,
    },
    caption03: {
      ...mobileTypography.caption.caption03,
      fontFamily: fontFamilies.english,
    },
  },
} as const;

// Typography Types
export type FontFamily = (typeof fontFamilies)[keyof typeof fontFamilies];
export type FontWeight = (typeof fontWeights)[keyof typeof fontWeights];

export type WebHeadlineVariant = keyof typeof webTypography.headline;
export type MobileHeadlineVariant = keyof typeof mobileTypography.headline;
export type TitleVariant = keyof typeof mobileTypography.title;
export type BodyVariant = keyof typeof mobileTypography.body;
export type CaptionVariant = keyof typeof mobileTypography.caption;

// Typography record types for safe access
type TypographyRecord = Record<
  string,
  Record<
    string,
    {
      fontFamily: string;
      fontWeight: number;
      fontSize: number;
      lineHeight: number;
    }
  >
>;

// Utility function to get typography style as CSS string
export const getTypographyStyle = (
  variant: string,
  device: "web" | "mobile" = "mobile",
  language: "korean" | "english" = "korean"
) => {
  let typography;

  if (device === "web" && variant.startsWith("headline")) {
    typography = webTypography.headline[variant as WebHeadlineVariant];
  } else if (language === "english") {
    // English typography에서 찾기
    const [category, name] = variant.split(".");
    if (category && name) {
      typography = (englishTypography as TypographyRecord)[category]?.[name];
    }
  } else {
    // Korean mobile typography에서 찾기
    const [category, name] = variant.split(".");
    if (category && name) {
      typography = (mobileTypography as TypographyRecord)[category]?.[name];
    }
  }

  if (!typography) {
    console.warn(`Typography variant "${variant}" not found`);
    return "";
  }

  return `
    font-family: ${typography.fontFamily};
    font-weight: ${typography.fontWeight};
    font-size: ${typography.fontSize}px;
    line-height: ${typography.lineHeight}px;
  `.trim();
};



















