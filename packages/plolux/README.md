# PLOLUX

> **AI 기반 차세대 웹 에이전시 플랫폼 (AI-Powered Web Agency Platform)**

PLOLUX는 **심미적 완벽함(Visual Excellence)**과 **기술적 견고함(Technical Solidity)**을 결합하여, 고객에게 최고의 웹 사이트 구축 경험을 제공하는 플랫폼입니다.
단순한 템플릿 제작을 넘어, AI 기술을 활용한 기획 자동화와 고도화된 디자인 시스템을 통해 차별화된 결과물을 제공합니다.

---

## ✨ 주요 기능 (Key Features)

- **AI 웹 에이전시 서비스**: 고객의 요구사항을 AI가 분석하여 최적의 웹사이트 구조 제안.
- **포트폴리오 쇼케이스**: PLOLUX의 디자인 철학이 담긴 작업물 전시.
- **관리자 대시보드 (Admin System)**: 의뢰 관리, 콘텐츠 수정, 통계 분석을 위한 전용 관리 시스템.
- **반응형 & 인터랙티브 디자인**: Framer Motion 등을 활용한 부드러운 전환 효과 및 모든 기기 호환.

---

## 🛠 기술 스택 (Tech Stack)

이 프로젝트는 최신 웹 표준 기술을 사용하여 구축되었습니다.

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: Zustand / React Context
- **Design System**: Atomic Design Pattern
- **Infrastructure**: Feature-Sliced Design (Lite) Architecture

---

## 🚀 시작하기 (Getting Started)

로컬 개발 환경에서 프로젝트를 실행하는 방법입니다.

### 1. 사전 요구사항 (Prerequisites)

- Node.js (v18.17.0 이상 권장)
- pnpm (패키지 매니저)

### 2. 설치 (Installation)

프로젝트 루트에서 의존성을 설치합니다.

```bash
pnpm install
```

### 3. 개발 서버 실행 (Run Dev Server)

PLOLUX 패키지만 단독으로 실행합니다.

```bash
pnpm --filter plolux dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 확인하세요.

---

## 📂 문서 및 가이드 (Documentation)

더 자세한 아키텍처 설계와 개발 가이드라인은 아래 문서를 참고하세요.

- **[📖 시스템 아키텍처 가이드 (Architecture Guide)](../../doc/guide/architecture/PLOLUX_Architecture_Guide_v1.0.md)**: 디렉토리 구조, 레이어별 역할, 디자인 패턴 상세 설명.
<!-- - **[🎨 디자인 시스템 가이드](../../doc/guide/design/SYSTEM.md)**: (작성 예정) 색상, 타이포그래피, 컴포넌트 사용법. -->

---

## 🤝 기여하기 (Contribution)

1. `doc/guide/architecture` 문서를 먼저 정독해주세요.
2. 기능 개발 시 `(site)`와 `(admin)` 영역을 명확히 구분해주세요.
3. 모든 상수는 `src/lib/constants.ts`에 정의하여 사용해주세요.

---

**© 2025 PLOLUX. All rights reserved.**
