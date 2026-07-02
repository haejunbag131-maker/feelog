"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DiaryData } from "@/components/diaries/hooks/index.binding.hook";
import { authenticatedFetch } from "@/commons/lib/authenticated-fetch";

/**
 * 일기 목록 조회 Hook
 */
export function useDiaries() {
  return useQuery({
    queryKey: ["diaries"],
    queryFn: async () => {
      const res = await authenticatedFetch("/api/diaries");
      if (!res.ok) {
        throw new Error("일기 조회에 실패했습니다.");
      }
      const data = await res.json();
      return (data.diaries || []) as DiaryData[];
    },
  });
}

/**
 * 일기 생성 Hook
 */
export function useCreateDiary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (diary: Omit<DiaryData, "id" | "createdAt">) => {
      const res = await authenticatedFetch("/api/diaries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(diary),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "일기 생성에 실패했습니다.");
      }

      return (await res.json()) as DiaryData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },
  });
}

/**
 * 일기 수정 Hook
 */
export function useUpdateDiary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (diary: DiaryData) => {
      const res = await authenticatedFetch("/api/diaries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(diary),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "일기 수정에 실패했습니다.");
      }

      return (await res.json()) as DiaryData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },
  });
}

/**
 * 일기 삭제 Hook
 */
export function useDeleteDiary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await authenticatedFetch(`/api/diaries?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "일기 삭제에 실패했습니다.");
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },
  });
}

