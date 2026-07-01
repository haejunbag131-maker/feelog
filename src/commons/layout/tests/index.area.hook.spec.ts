import { test, expect } from "@playwright/test";

/**
 * Layout Area Hook 테스트
 * 
 * 테스트 시나리오:
 * URL에 따라 Layout의 각 영역(header, banner, navigation, footer) 노출 여부를 제어
 * 
 * 테스트 제외 경로:
 * - /auth/login
 * - /auth/signup
 * - /pictures
 */

test.describe("Layout Area Visibility", () => {
  test("일기목록 페이지(/diaries)에서 모든 영역 표시", async ({ page }) => {
    // Given: 일기목록 페이지로 이동
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="layout-container"]');
    
    // Then: header 영역 표시
    const header = page.locator('[data-testid="layout-header"]');
    await expect(header).toBeVisible();
    
    // And: header 내 로고 표시
    const logo = page.locator('[data-testid="layout-logo"]');
    await expect(logo).toBeVisible();
    
    // And: banner 영역 표시
    const banner = page.locator('[data-testid="layout-banner"]');
    await expect(banner).toBeVisible();
    
    // And: navigation 영역 표시
    const navigation = page.locator('[data-testid="layout-navigation"]');
    await expect(navigation).toBeVisible();
    
    // And: footer 영역 표시
    const footer = page.locator('[data-testid="layout-footer"]');
    await expect(footer).toBeVisible();
  });

  test("일기상세 페이지(/diaries/:id)에서 일부 영역만 표시", async ({ page }) => {
    // Given: 로그인 상태 설정 (일기 상세 페이지는 회원 전용)
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "test-token");
      localStorage.setItem("user", JSON.stringify({ _id: "test-user-123", name: "테스트 유저" }));
    });

    // API 모킹 - 일기 데이터 반환
    const testDiary = {
      id: 1,
      title: "테스트 일기",
      content: "테스트 내용",
      emotion: "HAPPY",
      createdAt: new Date().toISOString(),
    };

    await page.route("**/api/diaries*", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ diaries: [testDiary] }),
      });
    });

    // And: 일기상세 페이지로 이동 (예: /diaries/1)
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="layout-container"]', { timeout: 10000 });
    
    // Then: header 영역 표시
    const header = page.locator('[data-testid="layout-header"]');
    await expect(header).toBeVisible();
    
    // And: header 내 로고 표시
    const logo = page.locator('[data-testid="layout-logo"]');
    await expect(logo).toBeVisible();
    
    // And: banner 영역 숨김
    const banner = page.locator('[data-testid="layout-banner"]');
    await expect(banner).not.toBeVisible();
    
    // And: navigation 영역 숨김
    const navigation = page.locator('[data-testid="layout-navigation"]');
    await expect(navigation).not.toBeVisible();
    
    // And: footer 영역 표시
    const footer = page.locator('[data-testid="layout-footer"]');
    await expect(footer).toBeVisible();
  });

  test("로그인 페이지(/auth/login)에서 모든 영역 숨김", async ({ page }) => {
    // Given: 로그인 페이지로 이동
    await page.goto("/auth/login");
    await page.waitForSelector('[data-testid="login-container"]');
    
    // Then: header 영역 숨김
    const header = page.locator('[data-testid="layout-header"]');
    await expect(header).not.toBeVisible();
    
    // And: banner 영역 숨김
    const banner = page.locator('[data-testid="layout-banner"]');
    await expect(banner).not.toBeVisible();
    
    // And: navigation 영역 숨김
    const navigation = page.locator('[data-testid="layout-navigation"]');
    await expect(navigation).not.toBeVisible();
    
    // And: footer 영역 숨김
    const footer = page.locator('[data-testid="layout-footer"]');
    await expect(footer).not.toBeVisible();
  });

  test("회원가입 페이지(/auth/signup)에서 모든 영역 숨김", async ({ page }) => {
    // Given: 회원가입 페이지로 이동
    await page.goto("/auth/signup");
    await page.waitForSelector('[data-testid="signup-container"]');
    
    // Then: header 영역 숨김
    const header = page.locator('[data-testid="layout-header"]');
    await expect(header).not.toBeVisible();
    
    // And: banner 영역 숨김
    const banner = page.locator('[data-testid="layout-banner"]');
    await expect(banner).not.toBeVisible();
    
    // And: navigation 영역 숨김
    const navigation = page.locator('[data-testid="layout-navigation"]');
    await expect(navigation).not.toBeVisible();
    
    // And: footer 영역 숨김
    const footer = page.locator('[data-testid="layout-footer"]');
    await expect(footer).not.toBeVisible();
  });

  test("사진목록 페이지(/pictures)에서 모든 영역 표시", async ({ page }) => {
    // Given: 사진목록 페이지로 이동
    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="layout-container"]');
    
    // Then: header 영역 표시
    const header = page.locator('[data-testid="layout-header"]');
    await expect(header).toBeVisible();
    
    // And: header 내 로고 표시
    const logo = page.locator('[data-testid="layout-logo"]');
    await expect(logo).toBeVisible();
    
    // And: banner 영역 표시
    const banner = page.locator('[data-testid="layout-banner"]');
    await expect(banner).toBeVisible();
    
    // And: navigation 영역 표시
    const navigation = page.locator('[data-testid="layout-navigation"]');
    await expect(navigation).toBeVisible();
    
    // And: footer 영역 표시
    const footer = page.locator('[data-testid="layout-footer"]');
    await expect(footer).toBeVisible();
  });
});


