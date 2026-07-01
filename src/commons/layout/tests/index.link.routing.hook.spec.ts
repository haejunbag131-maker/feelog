import { test, expect } from "@playwright/test";

/**
 * Layout Link Routing Hook 테스트
 * 
 * 테스트 시나리오:
 * 1. 로고 클릭 시 일기목록 페이지(/diaries)로 이동
 * 2. 일기보관함 클릭 시 일기목록 페이지(/diaries)로 이동
 * 3. 사진보관함 클릭은 테스트 skip (요구사항에 따름)
 * 4. Navigation 메뉴 클릭 시 CSS 액티브 상태 변경 확인
 */

test.describe("Layout Link Routing", () => {
  test.beforeEach(async ({ page }) => {
    // 일기목록 페이지로 이동
    await page.goto("/diaries");
    // 페이지 로드 확인: data-testid로 식별
    await page.waitForSelector('[data-testid="layout-container"]');
  });

  test("로고 클릭 시 일기목록 페이지로 이동", async ({ page }) => {
    // Given: 다른 페이지에 있을 수 있음 (현재는 /diaries)
    
    // When: 로고 클릭
    await page.click('[data-testid="layout-logo"]');
    
    // Then: URL이 /diaries로 변경됨
    await expect(page).toHaveURL("/diaries");
  });

  test("일기보관함 클릭 시 일기목록 페이지로 이동", async ({ page }) => {
    // Given: 일기목록 페이지
    
    // When: 일기보관함 클릭
    await page.click('[data-testid="nav-diaries"]');
    
    // Then: URL이 /diaries로 변경됨
    await expect(page).toHaveURL("/diaries");
  });

  test("일기보관함 클릭 시 CSS 액티브 상태 확인", async ({ page }) => {
    // Given: 일기목록 페이지
    
    // When: 일기보관함 클릭
    await page.click('[data-testid="nav-diaries"]');
    
    // Then: 일기보관함 탭이 active 상태
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    await expect(diariesTab).toHaveAttribute("data-active", "true");
    
    // And: 사진보관함 탭은 inactive 상태
    const picturesTab = page.locator('[data-testid="nav-pictures"]');
    await expect(picturesTab).toHaveAttribute("data-active", "false");
  });

  test("사진보관함 클릭 시 사진목록 페이지로 이동", async ({ page }) => {
    // Given: 일기목록 페이지
    
    // When: 사진보관함 클릭
    await page.click('[data-testid="nav-pictures"]');
    
    // Then: URL이 /pictures로 변경됨
    await expect(page).toHaveURL("/pictures");
  });

  test("사진보관함 클릭 시 CSS 액티브 상태 확인", async ({ page }) => {
    // Given: 일기목록 페이지
    
    // When: 사진보관함 클릭
    await page.click('[data-testid="nav-pictures"]');
    
    // Then: 사진보관함 탭이 active 상태
    const picturesTab = page.locator('[data-testid="nav-pictures"]');
    await expect(picturesTab).toHaveAttribute("data-active", "true");
    
    // And: 일기보관함 탭은 inactive 상태
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    await expect(diariesTab).toHaveAttribute("data-active", "false");
  });

  test("현재 경로에 따른 Navigation 액티브 상태 자동 적용", async ({ page }) => {
    // Given: 일기목록 페이지로 직접 이동
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="layout-container"]');
    
    // Then: 일기보관함 탭이 active 상태
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    await expect(diariesTab).toHaveAttribute("data-active", "true");
  });
});

















