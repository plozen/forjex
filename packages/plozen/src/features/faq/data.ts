export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    question: '프로젝트 진행 과정은 어떻게 되나요?',
    answer: 'PLOZEN의 프로젝트는 [상담 및 기획 -> 디자인 -> 개발 -> 테스트 및 QA -> 배포]의 5단계로 진행됩니다. 각 단계마다 클라이언트와의 긴밀한 소통을 통해 피드백을 반영하며 최상의 결과물을 만들어냅니다.',
    category: 'General'
  },
  {
    id: '2',
    question: '비용 산정 기준은 무엇인가요?',
    answer: '프로젝트의 규모, 기능 명세, 디자인 복잡도, 개발 기간 등에 따라 비용이 산정됩니다. 초기 상담을 통해 요구사항을 상세히 파악한 후, 합리적이고 투명한 견적을 제안드립니다.',
    category: 'Pricing'
  },
  {
    id: '3',
    question: '유지보수 서비스도 제공하나요?',
    answer: '네, 프로젝트 완료 후 안정적인 서비스 운영을 위한 유지보수 패키지를 제공합니다. 서버 모니터링, 버그 수정, 정기적인 업데이트 등을 포함하며, 고객의 니즈에 맞춰 다양한 옵션을 선택할 수 있습니다.',
    category: 'Support'
  },
  {
    id: '4',
    question: '모바일 반응형 웹도 지원하나요?',
    answer: '물론입니다. PLOZEN이 제작하는 모든 웹사이트는 기본적으로 반응형 디자인(Responsive Web Design)이 적용되어, PC, 태블릿, 모바일 등 모든 디바이스에서 최적화된 화면을 제공합니다.',
    category: 'Technical'
  },
  {
    id: '5',
    question: '기존 사이트 리뉴얼도 가능한가요?',
    answer: '가능합니다. 기존 웹사이트의 문제점을 분석하고, 최신 트렌드와 기술을 접목하여 브랜드 가치를 높이는 리뉴얼 서비스를 제공합니다. 데이터 마이그레이션부터 SEO 최적화까지 꼼꼼하게 챙겨드립니다.',
    category: 'General'
  }
];
