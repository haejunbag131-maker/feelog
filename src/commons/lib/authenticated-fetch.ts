"use client";

/**
 * 저장된 access token을 API 요청에 포함합니다.
 */
export function authenticatedFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
) {
  const headers = new Headers(init.headers);
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return fetch(input, {
    ...init,
    headers,
  });
}
