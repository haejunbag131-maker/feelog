import { test, expect } from "@playwright/test";

/**
 * Layout Auth Hook 테스트
 * 
 * 테스트 시나리오:
 * 1. 비로그인 유저: /diaries 접속 -> 로그인 버튼 노출 -> 클릭 -> /auth/login 이동
 * 2. 로그인 유저: 로그인 -> /diaries 이동 -> 유저이름, 로그아웃 버튼 노출 -> 로그아웃 -> /auth/login 이동 -> /diaries 접속 -> 로그인 버튼 노출
 * 
 * 테스트 대상:
 * - useAuthHook Hook
 * - 인증 프로바이더 연동
 * - 로그인 상태에 따른 UI 분기
 */

test.describe("Layout Auth Hook - 비로그인 유저", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화 (비로그인 상태)
    await page.goto("/diaries");
    await page.evaluate(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    });
  });

  test("비회원으로 /diaries에 접속하여 페이지 로드 확인", async ({ page }) => {
    // Given: 비로그인 상태
    
    // When: /diaries 접속
    await page.goto("/diaries");
    
    // Then: 페이지 로드 확인 (data-testid로 식별)
    await page.waitForSelector('[data-testid="layout-container"]');
  });

  test("layout의 로그인버튼 노출여부 확인", async ({ page }) => {
    // Given: 비로그인 상태로 /diaries 접속
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="layout-container"]');
    
    // Then: 로그인 버튼이 노출되어야 함
    const loginButton = page.locator('[data-testid="login-button"]');
    await expect(loginButton).toBeVisible();
    
    // And: 로그아웃 버튼은 노출되지 않아야 함
    const logoutButton = page.locator('[data-testid="logout-button"]');
    await expect(logoutButton).not.toBeVisible();
    
    // And: 유저이름은 노출되지 않아야 함
    const userName = page.locator('[data-testid="layout-auth-status"]').locator('[data-testid="user-name"]');
    await expect(userName).not.toBeVisible();
  });

  test("로그인버튼 클릭하여 /auth/login 페이지로 이동", async ({ page }) => {
    // Given: 비로그인 상태로 /diaries 접속
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="layout-container"]');
    
    // When: 로그인 버튼 클릭
    const loginButton = page.locator('[data-testid="login-button"]');
    await loginButton.click();
    
    // Then: /auth/login 페이지로 이동
    await expect(page).toHaveURL("/auth/login");
    
    // And: 로그인 페이지 로드 확인
    await page.waitForSelector('[data-testid="login-container"]');
  });
});

test.describe("Layout Auth Hook - 로그인 유저", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto("/auth/login");
    await page.evaluate(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    });
  });

  test("비회원으로 /auth/login에 접속하여 페이지 로드 확인", async ({ page }) => {
    // Given: 비로그인 상태
    
    // When: /auth/login 접속
    await page.goto("/auth/login");
    
    // Then: 페이지 로드 확인
    await page.waitForSelector('[data-testid="login-container"]');
  });

  test("로그인 성공 후, 완료 모달 클릭하여 /diaries 페이지 로드 확인", async ({ page }) => {
    // Given: 로그인 페이지
    await page.goto("/auth/login");
    await page.waitForSelector('[data-testid="login-container"]');
    
    // When: 로그인 시도
    await page.fill('[data-testid="login-email-input"]', "a@c.com");
    await page.fill('[data-testid="login-password-input"]', "1234qwer");
    
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await submitButton.click();
    
    // 로그인완료모달 대기
    const successModal = page.locator('[data-testid="login-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: 2000 });
    
    // 완료 모달 클릭
    const confirmButton = successModal.locator('button').filter({ hasText: '확인' });
    await confirmButton.click();
    
    // Then: /diaries 페이지 로드 확인
    await expect(page).toHaveURL("/diaries");
    await page.waitForSelector('[data-testid="layout-container"]');
  });

  test("layout에서 유저이름, 로그아웃버튼 노출여부 확인", async ({ page }) => {
    // Given: 로그인 상태로 /diaries 접속
    await page.goto("/auth/login");
    await page.waitForSelector('[data-testid="login-container"]');
    
    // 로그인
    await page.fill('[data-testid="login-email-input"]', "a@c.com");
    await page.fill('[data-testid="login-password-input"]', "1234qwer");
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await submitButton.click();
    
    const successModal = page.locator('[data-testid="login-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: 2000 });
    const confirmButton = successModal.locator('button').filter({ hasText: '확인' });
    await confirmButton.click();
    
    await expect(page).toHaveURL("/diaries");
    await page.waitForSelector('[data-testid="layout-container"]');
    
    // Then: 유저이름이 노출되어야 함
    const userName = page.locator('[data-testid="layout-auth-status"]').locator('[data-testid="user-name"]');
    await expect(userName).toBeVisible();
    
    // And: 로그아웃 버튼이 노출되어야 함
    const logoutButton = page.locator('[data-testid="logout-button"]');
    await expect(logoutButton).toBeVisible();
    
    // And: 로그인 버튼은 노출되지 않아야 함
    const loginButton = page.locator('[data-testid="login-button"]');
    await expect(loginButton).not.toBeVisible();
  });

  test("로그아웃버튼 클릭하여 /auth/login 페이지 로드 확인", async ({ page }) => {
    // Given: 로그인 상태로 /diaries 접속
    await page.goto("/auth/login");
    await page.waitForSelector('[data-testid="login-container"]');
    
    // 로그인
    await page.fill('[data-testid="login-email-input"]', "a@c.com");
    await page.fill('[data-testid="login-password-input"]', "1234qwer");
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await submitButton.click();
    
    const successModal = page.locator('[data-testid="login-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: 2000 });
    const confirmButton = successModal.locator('button').filter({ hasText: '확인' });
    await confirmButton.click();
    
    await expect(page).toHaveURL("/diaries");
    await page.waitForSelector('[data-testid="layout-container"]');
    
    // When: 로그아웃 버튼 클릭
    const logoutButton = page.locator('[data-testid="logout-button"]');
    await logoutButton.click();
    
    // Then: /auth/login 페이지 로드 확인
    await expect(page).toHaveURL("/auth/login");
    await page.waitForSelector('[data-testid="login-container"]');
  });

  test("로그아웃 후 다이어리 재진입 시 이전 목록 캐시가 노출되지 않아야 한다", async ({
    page,
  }) => {
    await page.route("**/api/diaries", async (route) => {
      const authorization = route.request().headers()["authorization"];

      if (!authorization) {
        await route.fulfill({
          status: 401,
          contentType: "application/json",
          body: JSON.stringify({ error: "로그인이 필요합니다." }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          diaries: [
            {
              id: 999,
              title: "로그아웃 캐시 테스트",
              content: "로그인 상태에서만 보여야 합니다.",
              emotion: "HAPPY",
              createdAt: "2026-07-02T00:00:00.000Z",
              userId: "test-user-id",
              userName: "테스트 사용자",
            },
          ],
        }),
      });
    });

    await page.goto("/diaries");
    await page.evaluate(() => {
      localStorage.setItem("accessToken", "test-access-token");
      localStorage.setItem(
        "user",
        JSON.stringify({ _id: "test-user-id", name: "테스트 사용자" })
      );
    });
    await page.reload();

    await expect(page.locator('[data-testid="diary-card-999"]')).toBeVisible();

    await page.locator('[data-testid="logout-button"]').click();
    await expect(page).toHaveURL("/auth/login");

    await page.goto("/diaries");
    await expect(page.locator('[data-testid="diary-card-999"]')).toHaveCount(0);
  });

  test("/diaries에 접속하여 페이지 로드 확인", async ({ page }) => {
    // Given: 로그인 후 로그아웃한 상태
    await page.goto("/auth/login");
    await page.waitForSelector('[data-testid="login-container"]');
    
    // 로그인
    await page.fill('[data-testid="login-email-input"]', "a@c.com");
    await page.fill('[data-testid="login-password-input"]', "1234qwer");
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await submitButton.click();
    
    const successModal = page.locator('[data-testid="login-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: 2000 });
    const confirmButton = successModal.locator('button').filter({ hasText: '확인' });
    await confirmButton.click();
    
    await expect(page).toHaveURL("/diaries");
    
    // 로그아웃
    const logoutButton = page.locator('[data-testid="logout-button"]');
    await logoutButton.click();
    
    await expect(page).toHaveURL("/auth/login");
    
    // When: /diaries 접속
    await page.goto("/diaries");
    
    // Then: 페이지 로드 확인
    await page.waitForSelector('[data-testid="layout-container"]');
  });

  test("layout에 로그인버튼 노출여부 확인", async ({ page }) => {
    // Given: 로그인 후 로그아웃한 상태
    await page.goto("/auth/login");
    await page.waitForSelector('[data-testid="login-container"]');
    
    // 로그인
    await page.fill('[data-testid="login-email-input"]', "a@c.com");
    await page.fill('[data-testid="login-password-input"]', "1234qwer");
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await submitButton.click();
    
    const successModal = page.locator('[data-testid="login-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: 2000 });
    const confirmButton = successModal.locator('button').filter({ hasText: '확인' });
    await confirmButton.click();
    
    await expect(page).toHaveURL("/diaries");
    
    // 로그아웃
    const logoutButton = page.locator('[data-testid="logout-button"]');
    await logoutButton.click();
    
    await expect(page).toHaveURL("/auth/login");
    
    // /diaries 접속
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="layout-container"]');
    
    // Then: 로그인 버튼이 노출되어야 함
    const loginButton = page.locator('[data-testid="login-button"]');
    await expect(loginButton).toBeVisible();
    
    // And: 로그아웃 버튼은 노출되지 않아야 함
    const logoutButtonAfterLogout = page.locator('[data-testid="logout-button"]');
    await expect(logoutButtonAfterLogout).not.toBeVisible();
    
    // And: 유저이름은 노출되지 않아야 함
    const userName = page.locator('[data-testid="layout-auth-status"]').locator('[data-testid="user-name"]');
    await expect(userName).not.toBeVisible();
  });
});

