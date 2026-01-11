# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소의 코드를 작업할 때 참고하는 가이드입니다.

## 프로젝트 개요

Plolux는 디지털 제품 제작을 위한 여러 Next.js 애플리케이션을 관리하는 모노레포 워크스페이스입니다. 저장소는 세 개의 주요 애플리케이션을 포함합니다:

- **kcl**: 다국어 지원 랭킹/리더보드 플랫폼 (12개 언어)
- **plozen**: 관리자 기능이 있는 포트폴리오 쇼케이스 및 콘텐츠 관리
- **plolux**: 랜딩 페이지/데모 애플리케이션

## 주요 명령어

### 개발 모드
```bash
# 특정 패키지를 개발 모드로 실행
pnpm --filter kcl dev
pnpm --filter plozen dev
pnpm --filter plolux dev

# 단축 명령어 (루트 package.json에서)
pnpm dev:plozen
pnpm dev:plolux
# 참고: kcl은 루트 package.json에 단축 명령어가 없으므로 filter 명령어 사용
```

### 빌드
```bash
# 특정 패키지 빌드
pnpm --filter kcl build
pnpm --filter plozen build
pnpm --filter plolux build

# 단축 명령어
pnpm build:plozen
pnpm build:plolux

# Cloudflare Pages용 빌드 (plozen만 해당)
pnpm --filter plozen pages:build
```

### 린트 및 타입 체크
```bash
# ESLint, Prettier, TypeScript 체크 실행
pnpm lint

# 개별 패키지 린트
pnpm --filter kcl lint
pnpm --filter plozen lint
```

### 의존성 관리
```bash
# 의존성 설치 (모노레포 전체)
pnpm install --frozen-lockfile

# 특정 패키지에 의존성 추가
pnpm --filter kcl add <package>
pnpm --filter plozen add <package>

# 개발 의존성 추가
pnpm --filter kcl add -D <package>
```

## 아키텍처 개요

### 모노레포 구조

워크스페이스는 `pnpm-workspace.yaml`에 정의된 pnpm 워크스페이스를 사용합니다:
- `packages/`: 주요 Next.js 애플리케이션 (kcl, plozen, plolux)
- `doc/`: 아키텍처 가이드, CI/CD 문서, 시스템 가이드
- 루트 설정 파일: 공유 도구를 위한 설정 (ESLint, Prettier, TypeScript)

### 애플리케이션 아키텍처 패턴

모든 애플리케이션은 Spring Boot 레이어에서 영감을 받은 **Feature-Sliced Design (FSD)** 패턴을 따릅니다:

```
src/
├── app/              # Controller 레이어 - Next.js App Router 페이지
│   ├── (root)/       # 레이아웃 구성을 위한 라우트 그룹
│   ├── [locale]/     # 로케일 기반 라우팅 (kcl)
│   └── api/          # API 라우트
├── components/       # View 레이어 - 재사용 가능한 UI 컴포넌트
│   ├── common/       # 공유 컴포넌트 (Button, Modal 등)
│   ├── features/     # 기능별 컴포넌트
│   ├── layout/       # 레이아웃 컴포넌트
│   └── providers/    # React Context 프로바이더
├── features/         # Service 레이어 - 비즈니스 로직
├── hooks/            # 커스텀 React 훅
├── lib/              # Infrastructure 레이어 - 유틸리티
│   └── supabase/     # Supabase 클라이언트 설정
├── styles/           # Design 레이어 - 전역 SCSS 및 디자인 토큰
│   └── abstracts/    # SCSS 변수, 믹스인, 함수
└── types/            # TypeScript 타입 정의
```

### 핵심 기술 스택

- **프레임워크**: Next.js 16.x (App Router)
- **언어**: TypeScript 5.x
- **스타일링**: SASS/SCSS (디자인 토큰)
- **백엔드**: Supabase (PostgreSQL + SSR 지원 인증)
- **폼**: React Hook Form + Zod 검증
- **국제화**: next-intl (kcl은 12개 언어 지원: ko, en, id, tr, ja, zh, es, pt, th, vi, fr, de)
- **UI 라이브러리**: Lucide React (아이콘), Framer Motion (애니메이션), Recharts (차트)
- **상태 관리**: React Context 프로바이더 + Supabase 데이터
- **패키지 매니저**: pnpm 10.18.1

### 국제화 (kcl)

kcl 애플리케이션은 미들웨어 기반 로케일 라우팅과 함께 next-intl을 사용합니다:
- 지원 로케일: ko, en, id, tr, ja, zh, es, pt, th, vi, fr, de
- 기본 로케일: en
- 번역 파일: `src/messages/{locale}.json`
- 미들웨어: `src/middleware.ts`가 자동 로케일 감지 및 URL 재작성 처리
- 모든 페이지는 정적 생성 지원을 위해 `setRequestLocale(locale)`을 호출해야 함

### 인증 및 백엔드

모든 애플리케이션은 백엔드 서비스로 Supabase를 사용합니다:
- **Client**: 클라이언트 측 작업을 위한 `@supabase/supabase-js`
- **SSR**: 서버 측 인증을 위한 `@supabase/ssr`
- **Middleware**: `src/middleware.ts`에서 세션 관리 (plozen)
- **보호된 라우트**: 레이아웃 또는 미들웨어에서 Supabase 인증 가드 사용

필수 환경 변수:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 배포

### GitHub Pages 배포

저장소는 GitHub Pages 자동 배포를 위해 GitHub Actions를 사용합니다:
- **워크플로 파일**: `.github/workflows/deploy.yml`
- **트리거**: `main` 브랜치로 푸시
- **환경 변수**: `DEPLOY_TARGET=gh-pages`가 정적 익스포트 모드 활성화
- **출력**: `out/` 디렉토리에 정적 사이트 생성

#### 배포 태그

커밋 메시지 태그로 배포 동작 제어:
- `[no-deploy]`: 배포 완전히 건너뛰기
- `[deploy:kcl]`: kcl 패키지 강제 배포
- `[deploy:plozen]`: plozen 패키지 강제 배포
- `[deploy:plolux]`: plolux 패키지 강제 배포
- `[deploy:all]`: 모든 패키지 강제 배포

태그 없이는 해당 패키지 디렉토리에서 변경사항이 감지될 때 자동으로 배포가 발생합니다.

#### Base Path 설정

각 애플리케이션은 GitHub Pages용으로 다른 base path를 가집니다:
- kcl: `/plolux/kcl`
- plolux: `/plolux/plolux`
- plozen: 별도 저장소로 동기화

Base path는 `next.config.mjs/ts`에서 `basePath`와 `NEXT_PUBLIC_BASE_PATH` 환경 변수를 사용하여 설정됩니다.

### 저장소 동기화

워크플로는 패키지를 독립 저장소로 동기화하여 전달합니다:
- `packages/plozen` → `plozen/plozen-web`
- `packages/plolux` → `plozen/plolux-web`

이는 `cpina/github-action-push-to-another-repository` 액션을 사용하여 GitHub Pages 배포와 병렬로 실행됩니다.

## 개발 워크플로

### 기존 파일 작업

코드 수정 시:
1. **편집 전에 항상 파일 읽기** - 보지 않은 코드에 대한 변경사항을 제안하지 말 것
2. **기존 패턴 이해** - 각 애플리케이션마다 약간 다른 패턴을 가질 수 있음
3. **i18n 보존** - kcl의 경우, 사용자 대면 텍스트 추가 시 12개 언어 파일 모두에 번역이 있는지 확인
4. **컴포넌트 구조 따르기** - 적절한 하위 디렉토리에 컴포넌트 배치 (common/, features/, layout/)

### 새 기능 추가

1. 올바른 레이어 식별 (Controller/Service/View/Infrastructure)
2. kcl의 경우: `src/messages/{locale}.json` 파일에 번역 추가
3. 기존 네이밍 컨벤션 및 파일 구조 따르기
4. `src/types/`의 TypeScript 타입 사용 또는 새로 생성
5. `src/lib/supabase/client.ts`를 통해 데이터 작업에 Supabase 활용

### 스타일링

SCSS 파일은 디자인 토큰으로 구성됩니다:
- `src/styles/abstracts/`: 변수, 믹스인, 함수
- `src/styles/`: 전역 스타일 및 컴포넌트 스타일
- `sassOptions.includePaths`가 next.config에 설정되어 abstracts에서 직접 import 가능

조건부 스타일링에는 classnames 유틸리티를 사용합니다.

### 폼

Zod 스키마 검증과 함께 React Hook Form 사용:
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  // 스키마 정의
});

const form = useForm({
  resolver: zodResolver(schema)
});
```

### 정적 익스포트 고려사항

`DEPLOY_TARGET=gh-pages`일 때:
- 동적 라우트는 `generateStaticParams()` 사용 필수
- 이미지는 최적화되지 않음 (`images.unoptimized: true`)
- API 라우트는 지원되지 않음 (외부여야 함)
- 에셋 경로에 `NEXT_PUBLIC_BASE_PATH` 사용

## 중요 참고사항

### React Compiler

모든 패키지는 next.config에서 `reactCompiler: true`가 활성화되어 있으며, 이는 다음을 요구합니다:
- React hooks 규칙을 엄격하게 따를 것
- 직접적인 DOM 조작 피하기
- 적절한 의존성 배열 사용

### Node.js 버전

프로젝트는 Node.js 22.x를 요구합니다 (GitHub Actions 및 packageManager 필드에 명시).

### pnpm 워크스페이스

특정 패키지 작업 시 항상 pnpm을 `--filter` 플래그와 함께 사용하세요. 패키지 디렉토리로 이동하여 직접 명령을 실행하지 마세요. 모노레포 의존성을 놓칠 수 있습니다.

### 문서

`doc/guide/`에 광범위한 문서가 있습니다:
- `architecture/`: 아키텍처 명세 및 디자인 패턴
- `cicd/`: CI/CD 워크플로 문서
- `system/`: 시스템 가이드 (관리자 로그인, 배포)

아키텍처 결정이나 시스템 동작 이해 시 이 문서들을 참조하세요.
