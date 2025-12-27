export interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  viewCount: number;
  isPrivate: boolean;
  content?: string;
}

export const GENERAL_INQUIRY_DATA: Post[] = [
  {
    id: 'notice-1',
    title: '[공지] PLOZEN 웹사이트 리뉴얼 오픈 안내',
    author: '관리자',
    date: '2024.01.15',
    viewCount: 1250,
    isPrivate: false,
    content: 'PLOZEN 웹사이트가 새롭게 리뉴얼되었습니다. 많은 관심 부탁드립니다.'
  },
  {
    id: '10',
    title: '제휴 관련 문의드립니다.',
    author: '김**',
    date: '2024.03.20',
    viewCount: 12,
    isPrivate: true,
  },
  {
    id: '9',
    title: '채용 공고는 언제 올라오나요?',
    author: '이**',
    date: '2024.03.18',
    viewCount: 45,
    isPrivate: false,
    content: '현재 상시 채용 진행 중입니다. Careers 페이지를 참고해주세요.'
  },
  {
    id: '8',
    title: '솔루션 도입 비용 견적 요청',
    author: '박**',
    date: '2024.03.15',
    viewCount: 8,
    isPrivate: true,
  },
  {
    id: '7',
    title: '기술 스택 관련 질문입니다.',
    author: '최**',
    date: '2024.03.12',
    viewCount: 67,
    isPrivate: false,
    content: 'Next.js와 TypeScript를 주력으로 사용하고 있습니다.'
  },
  {
    id: '6',
    title: '디자인 에이전시 협업 제안',
    author: 'DesignCo',
    date: '2024.03.10',
    viewCount: 5,
    isPrivate: true,
  },
  {
    id: '5',
    title: '모바일 앱 개발 기간 문의',
    author: '정**',
    date: '2024.03.05',
    viewCount: 22,
    isPrivate: true,
  },
];
