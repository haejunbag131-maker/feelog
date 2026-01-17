"use client";

import { usePathname } from "next/navigation";
import { getUIVisibility, UIVisibility } from "@/commons/constants/url";

/**
 * Layout Area Hook 반환 타입
 */
export interface LayoutAreaReturn {
  visibility: UIVisibility;
  showHeader: boolean;
  showLogo: boolean;
  showBanner: boolean;
  showNavigation: boolean;
  showFooter: boolean;
}

/**
 * Layout Area Hook
 * 
 * Layout 컴포넌트의 각 영역(header, banner, navigation, footer) 노출 여부를 관리하는 커스텀 훅
 * URL 경로에 따라 url.ts의 메타데이터를 기반으로 노출 여부를 결정
 * 
 * @returns {LayoutAreaReturn} 각 영역의 노출 여부
 * - visibility: 전체 UI 노출 설정 객체
 * - showHeader: header 영역 노출 여부
 * - showLogo: header 내 로고 노출 여부
 * - showBanner: banner 영역 노출 여부
 * - showNavigation: navigation 영역 노출 여부
 * - showFooter: footer 영역 노출 여부
 */
export const useLayoutArea = (): LayoutAreaReturn => {
  const pathname = usePathname();
  
  // URL 메타데이터에서 UI 노출 설정 가져오기
  const visibility = getUIVisibility(pathname);

  return {
    visibility,
    showHeader: visibility.header.show,
    showLogo: visibility.header.logo,
    showBanner: visibility.banner,
    showNavigation: visibility.navigation,
    showFooter: visibility.footer,
  };
};

















