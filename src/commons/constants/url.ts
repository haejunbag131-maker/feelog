/**
 * URL Constants
 * 애플리케이션의 모든 URL 경로와 메타 정보를 관리
 * 다이나믹 라우팅 지원 및 링크 이동시 사용
 */

// URL 경로 정의
export const paths = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
  diaries: {
    list: "/diaries",
    detail: (id: string | number) => `/diaries/${id}`,
  },
  pictures: {
    list: "/pictures",
  },
} as const;

// 접근 권한 타입
export type AccessLevel = "public" | "member";

// UI 노출 설정 타입
export interface UIVisibility {
  header: {
    show: boolean;
    logo: boolean;
    darkModeToggle: boolean;
  };
  banner: boolean;
  navigation: boolean;
  footer: boolean;
}

// URL 메타 정보 타입
export interface URLMetadata {
  path: string | ((...args: string[]) => string);
  accessLevel: AccessLevel;
  ui: UIVisibility;
  description: string;
}

// URL 메타 정보 정의
export const urlMetadata = {
  auth: {
    login: {
      path: paths.auth.login,
      accessLevel: "public" as AccessLevel,
      ui: {
        header: {
          show: false,
          logo: false,
          darkModeToggle: false,
        },
        banner: false,
        navigation: false,
        footer: false,
      },
      description: "로그인 페이지",
    },
    signup: {
      path: paths.auth.signup,
      accessLevel: "public" as AccessLevel,
      ui: {
        header: {
          show: false,
          logo: false,
          darkModeToggle: false,
        },
        banner: false,
        navigation: false,
        footer: false,
      },
      description: "회원가입 페이지",
    },
  },
  diaries: {
    list: {
      path: paths.diaries.list,
      accessLevel: "public" as AccessLevel,
      ui: {
        header: {
          show: true,
          logo: true,
          darkModeToggle: false,
        },
        banner: true,
        navigation: true,
        footer: true,
      },
      description: "일기 목록 페이지",
    },
    detail: {
      path: paths.diaries.detail,
      accessLevel: "member" as AccessLevel,
      ui: {
        header: {
          show: true,
          logo: true,
          darkModeToggle: false,
        },
        banner: false,
        navigation: false,
        footer: true,
      },
      description: "일기 상세 페이지",
    },
  },
  pictures: {
    list: {
      path: paths.pictures.list,
      accessLevel: "public" as AccessLevel,
      ui: {
        header: {
          show: true,
          logo: true,
          darkModeToggle: false,
        },
        banner: true,
        navigation: true,
        footer: true,
      },
      description: "사진 목록 페이지",
    },
  },
} as const;

// Utility Functions

/**
 * 주어진 경로에 해당하는 URL 메타 정보를 조회
 * @param pathname - 현재 경로
 * @returns URL 메타 정보 또는 undefined
 */
export const getURLMetadata = (pathname: string): URLMetadata | undefined => {
  // 정확히 일치하는 경로 찾기
  for (const category of Object.values(urlMetadata)) {
    for (const metadata of Object.values(category)) {
      if (typeof metadata.path === "string") {
        if (metadata.path === pathname) {
          return metadata as URLMetadata;
        }
      }
    }
  }

  // 다이나믹 라우팅 경로 매칭 (/diaries/[id] 형식)
  if (pathname.startsWith("/diaries/") && pathname !== "/diaries") {
    return urlMetadata.diaries.detail as URLMetadata;
  }

  return undefined;
};

/**
 * 현재 경로의 UI 노출 설정을 조회
 * @param pathname - 현재 경로
 * @returns UI 노출 설정 또는 기본값
 */
export const getUIVisibility = (pathname: string): UIVisibility => {
  const metadata = getURLMetadata(pathname);
  return (
    metadata?.ui || {
      header: {
        show: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    }
  );
};

/**
 * 현재 경로의 접근 권한 레벨을 조회
 * @param pathname - 현재 경로
 * @returns 접근 권한 레벨
 */
export const getAccessLevel = (pathname: string): AccessLevel => {
  const metadata = getURLMetadata(pathname);
  return metadata?.accessLevel || "public";
};

/**
 * 회원 전용 페이지인지 확인
 * @param pathname - 현재 경로
 * @returns 회원 전용 여부
 */
export const isMemberOnly = (pathname: string): boolean => {
  return getAccessLevel(pathname) === "member";
};

// Type Exports
export type PathCategory = keyof typeof paths;
export type AuthPath = keyof typeof paths.auth;
export type DiaryPath = keyof typeof paths.diaries;
export type PicturePath = keyof typeof paths.pictures;



















