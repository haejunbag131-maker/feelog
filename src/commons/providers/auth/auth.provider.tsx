"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { paths } from "@/commons/constants/url";

/**
 * 로그인 유저 정보 타입
 */
interface User {
  _id: string;
  name: string;
}

/**
 * Auth Context 타입
 */
interface AuthContextType {
  // 로그인 상태
  isLoggedIn: boolean;
  // 로그인 유저 정보
  user: User | null;
  // 로그인 함수 (로그인 페이지로 이동)
  login: () => void;
  // 로그아웃 함수
  logout: () => void;
  // 로그인 상태 확인 함수
  checkLoginStatus: () => boolean;
  // 로그인 유저 정보 조회 함수
  getUser: () => User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Hook
 * AuthProvider 내부에서만 사용 가능
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * localStorage 키 상수
 */
const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  USER: "user",
} as const;

/**
 * Auth Provider 컴포넌트
 * 인증 관련 상태와 기능을 제공하는 Provider
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  /**
   * localStorage에서 accessToken 조회
   */
  const getAccessToken = useCallback((): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }, []);

  /**
   * localStorage에서 user 정보 조회
   */
  const getUserFromStorage = useCallback((): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  }, []);

  /**
   * 로그인 상태 업데이트
   */
  const updateLoginStatus = useCallback(() => {
    const token = getAccessToken();
    const userData = getUserFromStorage();
    setIsLoggedIn(!!token);
    setUser(userData);
  }, [getAccessToken, getUserFromStorage]);

  /**
   * 초기 로그인 상태 설정
   */
  useEffect(() => {
    updateLoginStatus();
  }, [updateLoginStatus]);

  /**
   * storage 이벤트 리스너 (다른 탭에서 localStorage 변경 감지)
   */
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === STORAGE_KEYS.ACCESS_TOKEN ||
        e.key === STORAGE_KEYS.USER
      ) {
        updateLoginStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [updateLoginStatus]);

  /**
   * 커스텀 이벤트 리스너 (동일 탭에서 localStorage 변경 감지)
   */
  useEffect(() => {
    const handleCustomStorageChange = () => {
      updateLoginStatus();
    };

    window.addEventListener("localStorageChange", handleCustomStorageChange);
    return () => {
      window.removeEventListener("localStorageChange", handleCustomStorageChange);
    };
  }, [updateLoginStatus]);

  /**
   * 로그인 함수
   * 로그인 페이지로 이동
   */
  const login = useCallback(() => {
    router.push(paths.auth.login);
  }, [router]);

  /**
   * 로그아웃 함수
   * localStorage에서 accessToken과 user 제거 후 로그인 페이지로 이동
   */
  const logout = useCallback(() => {
    if (typeof window === "undefined") return;

    // 화면에서 로그인 상태와 사용자 데이터를 즉시 제거
    setIsLoggedIn(false);
    setUser(null);

    // localStorage에서 accessToken 제거
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);

    // localStorage에서 user 제거
    localStorage.removeItem(STORAGE_KEYS.USER);

    // 이전 사용자의 일기/회고를 포함한 서버 캐시 제거
    queryClient.clear();

    // 커스텀 이벤트 발생 (동일 탭에서 변경 감지)
    window.dispatchEvent(new Event("localStorageChange"));

    // 로그인 페이지로 이동
    router.push(paths.auth.login);
  }, [queryClient, router]);

  /**
   * 로그인 상태 확인 함수
   * accessToken 유무만 확인 (복호화 없음)
   */
  const checkLoginStatus = useCallback((): boolean => {
    return !!getAccessToken();
  }, [getAccessToken]);

  /**
   * 로그인 유저 정보 조회 함수
   */
  const getUser = useCallback((): User | null => {
    return getUserFromStorage();
  }, [getUserFromStorage]);

  const value: AuthContextType = {
    isLoggedIn,
    user,
    login,
    logout,
    checkLoginStatus,
    getUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};




