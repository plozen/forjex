"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * 테마 공급자 (Theme Provider)
 *
 * `next-themes` 라이브러리를 사용하여 애플리케이션 전체에 다크 모드/라이트 모드 컨텍스트를 제공합니다.
 * Next.js의 클라이언트 컴포넌트로 동작하며, `layout.tsx`에서 전체 앱을 감싸는 형태로 사용됩니다.
 *
 * 주요 기능:
 * - 시스템 테마 감지 (System Preference)
 * - 사용자 테마 선택 저장 (Local Storage)
 * - Hydration Mismatch 방지 (suppressHydrationWarning)
 */
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
