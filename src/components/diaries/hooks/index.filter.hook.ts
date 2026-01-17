"use client";

import { useState, useCallback, useMemo } from "react";
import { EmotionType } from "@/commons/constants/enum";
import { DiaryCardData } from "./index.binding.hook";

/**
 * 일기 필터 Hook 반환 타입
 */
export interface DiariesFilterHookReturn {
  filteredDiaries: DiaryCardData[];
  handleFilterChange: (emotion: EmotionType | "all") => void;
  selectedFilter: EmotionType | "all";
}

/**
 * 일기 필터 Hook
 *
 * 일기 목록을 emotion 타입에 따라 필터링합니다.
 * "all"을 선택하면 모든 일기를 표시하고, 특정 emotion을 선택하면 해당 emotion의 일기만 표시합니다.
 *
 * @param allDiaries - 전체 일기 목록 (DiaryCardData[])
 * @returns {DiariesFilterHookReturn} 필터 관련 상태 및 함수
 * - filteredDiaries: 필터링된 일기 카드 데이터 배열
 * - handleFilterChange: 필터를 변경하는 함수
 * - selectedFilter: 현재 선택된 필터
 */
export const useFilterHook = (
  allDiaries: DiaryCardData[]
): DiariesFilterHookReturn => {
  const [selectedFilter, setSelectedFilter] = useState<EmotionType | "all">("all");

  /**
   * 선택된 필터에 따라 일기를 필터링
   */
  const filteredDiaries = useMemo(() => {
    if (selectedFilter === "all") {
      return allDiaries;
    }

    return allDiaries.filter((diary) => diary.emotion === selectedFilter);
  }, [selectedFilter, allDiaries]);

  /**
   * 필터를 변경하는 함수
   * @param emotion - 선택된 emotion 타입 또는 "all"
   */
  const handleFilterChange = useCallback((emotion: EmotionType | "all") => {
    setSelectedFilter(emotion);
  }, []);

  return {
    filteredDiaries,
    handleFilterChange,
    selectedFilter,
  };
};
















