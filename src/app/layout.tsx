import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/commons/providers/auth/auth.provider";
import { AuthGuard } from "@/commons/providers/auth/auth.guard";
import { ModalProvider } from "@/commons/providers/modal/modal.provider";
import { NextThemesProviderWrapper } from "@/commons/providers/next-themes/next-themes.provider";
import { ReactQueryProvider } from "@/commons/providers/react-query/react-query.provider";
import Layout from "@/commons/layout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Emotion Diary | 감정 일기장",
  openGraph: {
    title: "Emotion Diary | 감정 일기장",
  },
  description: "하루의 감정과 이야기를 기록하는 Emotion Diary입니다.",
  icons: {
    icon: "icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ReactQueryProvider>
            <NextThemesProviderWrapper>
              <ModalProvider>
                <AuthGuard>
                  <Layout>{children}</Layout>
                </AuthGuard>
              </ModalProvider>
            </NextThemesProviderWrapper>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
