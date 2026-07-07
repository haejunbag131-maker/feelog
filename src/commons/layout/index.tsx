"use client";

import React from "react";
import { useLayoutLinkRouting } from "./hooks/index.link.routing.hook";
import { useLayoutArea } from "./hooks/index.area.hook";
import { useLayoutAuth } from "./hooks/index.auth.hook";
import { Button } from "@/commons/components/button";
import styles from "./styles.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const {
    navigateToDiaries,
    navigateToPictures,
    isDiariesActive,
    isPicturesActive,
  } = useLayoutLinkRouting();

  const { showHeader, showLogo, showBanner, showNavigation, showFooter } =
    useLayoutArea();

  const { isLoggedIn, userName, handleLogin, handleLogout } = useLayoutAuth();

  return (
    <div className={styles.container} data-testid="layout-container">
      {showHeader && (
        <header className={styles.header} data-testid="layout-header">
          <div className={styles.headerContent}>
            {showLogo && (
              <button
                type="button"
                className={styles.logo}
                onClick={navigateToDiaries}
                data-testid="layout-logo"
                aria-label="Feelog 홈으로 이동"
              >
                <span className={styles.logoText}>Feelog</span>
              </button>
            )}
            <div className={styles.authStatus} data-testid="layout-auth-status">
              {isLoggedIn ? (
                <>
                  <span className={styles.userName} data-testid="user-name">
                    {userName}님, 환영합니다.
                  </span>
                  <Button
                    variant="secondary"
                    size="medium"
                    theme="light"
                    className={styles.logoutButton}
                    data-testid="logout-button"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  size="medium"
                  theme="light"
                  className={styles.loginButton}
                  data-testid="login-button"
                  onClick={handleLogin}
                >
                  로그인
                </Button>
              )}
            </div>
          </div>
        </header>
      )}
      {showHeader && <div className={styles.gap} />}
      {showBanner && (
        <div className={styles.banner} data-testid="layout-banner">
          <div className={styles.bannerImage} />
        </div>
      )}
      {showBanner && <div className={styles.gap} />}
      {showNavigation && (
        <nav className={styles.navigation} data-testid="layout-navigation">
          <div className={styles.navContent}>
            <div
              className={`${styles.tab} ${
                isDiariesActive ? styles.tabActive : ""
              }`}
              onClick={navigateToDiaries}
              data-testid="nav-diaries"
              data-active={isDiariesActive}
            >
              일기보관함
            </div>
            <div
              className={`${styles.tab} ${
                isPicturesActive ? styles.tabActive : ""
              }`}
              onClick={navigateToPictures}
              data-testid="nav-pictures"
              data-active={isPicturesActive}
            >
              사진보관함
            </div>
          </div>
        </nav>
      )}
      <main className={styles.main}>{children}</main>
      {showFooter && (
        <footer className={styles.footer} data-testid="layout-footer">
          <div className={styles.footerContent}>
            <div className={styles.footerTitle}>Feelog</div>
            <div className={styles.footerInfo}>대표 : {"{PARK HAEJUN}"}</div>
            <div className={styles.footerCopyright}>
              Copyright © 2025. Feelog Co., Ltd.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
