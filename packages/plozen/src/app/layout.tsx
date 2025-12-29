import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/main.scss";
import { ThemeProvider } from "@/providers/theme-provider";

/**
 * 폰트 설정: Montserrat
 * 구글 폰트에서 Montserrat 폰트를 로드하여 CSS 변수(--font-montserrat)로 사용할 수 있게 설정합니다.
 * 'latin' subset만 로드하여 최적화합니다.
 */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

/**
 * 메타데이터 설정 (SEO)
 * 사이트의 제목, 설명, 아이콘 등을 정의합니다.
 */
export const metadata: Metadata = {
  title: "PLOZEN | The Reality Engine",
  description: "Generate Your Plot. PLOZEN is an AI Venture Builder.",
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * 최상위 레이아웃 컴포넌트
 * 모든 페이지에 공통적으로 적용되는 HTML 구조(html, body)를 정의합니다.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /**
     * suppressHydrationWarning:
     * next-themes를 사용할 때 서버와 클라이언트의 초기 테마가 다를 수 있어 발생하는
     * 하이드레이션 경고를 방지하기 위해 추가합니다.
     */
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/*
         * 프리텐다드(Pretendard) 폰트 로드:
         * 한글 가독성이 좋은 프리텐다드 폰트를 CDN을 통해 로드합니다.
         */}
        <link 
          rel="stylesheet" 
          as="style" 
          crossOrigin="anonymous" 
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css" 
        />
      </head>
      {/* montserrat 변수를 클래스에 추가하여 폰트 적용 */}
      <body className={`${montserrat.variable} antialiased`}>
        {/*
         * ThemeProvider 설정:
         * - attribute="data-theme": 테마 변경 시 html 태그 등에 data-theme 속성을 추가하여 CSS로 제어
         * - defaultTheme="system": 기본 테마를 사용자의 시스템 설정(다크/라이트)에 따름
         * - enableSystem: 시스템 테마 감지 활성화
         * - disableTransitionOnChange: 테마 변경 시 깜빡임(transition) 방지
         */}
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
