import Image from "next/image";

// Asset constants derived from Fargo design
const imgImageTechStartup = "http://localhost:3845/assets/0044d9e4df30809e344ae9a7ba9d50df40743228.png";
const imgImageECommercePlatform = "http://localhost:3845/assets/204227bcfb1d6a4f3be994db103d502944bab1d8.png";
const imgIcon = "http://localhost:3845/assets/a7ef46eb4322833a07031d5abdd938d42c3e2204.svg";

export default function LandingPage() {
  return (
    <div className="w-full flex-col bg-white">
      {/* Hero Section */}
      <section className="relative w-full py-20 px-4 md:px-20 flex flex-col items-center gap-16">
         <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-[#101828]">왜 PLOLUX인가?</h1>
            <p className="text-[#4a5568] text-xl">차별화된 서비스를 위한 AI 기술</p>
         </div>

         <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
            {/* Feature 1 */}
            <div className="flex-1 p-8 rounded-xl bg-gray-50 border border-gray-100 flex flex-col gap-6">
                 <div className="bg-blue-100 p-4 rounded-full w-fit">
                    <img src={imgIcon} alt="Icon" width={32} height={32} />
                 </div>
                 <h3 className="text-2xl font-bold">AI 기반 개발</h3>
                 <p className="text-gray-600 leading-relaxed">
                   최신 AI 기술을 활용하여 빠르고 정확한 웹사이트 구축<br/>
                   데이터 분석을 통한 사용자 경험 최적화
                 </p>
            </div>
            {/* Feature 2 Placeholder (Replicating structure for complete look) */}
             <div className="flex-1 p-8 rounded-xl bg-gray-50 border border-gray-100 flex flex-col gap-6">
                 <div className="bg-purple-100 p-4 rounded-full w-fit">
                    <img src={imgIcon} alt="Icon" width={32} height={32} />
                 </div>
                 <h3 className="text-2xl font-bold">반응형 디자인</h3>
                 <p className="text-gray-600 leading-relaxed">
                   모든 디바이스에 완벽하게 대응하는 유연한 레이아웃<br/>
                   사용자 중심의 인터페이스 제공
                 </p>
            </div>
         </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="w-full bg-[#f8fafc] py-20 px-4 md:px-20">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">주요 포트폴리오</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                  <div className="h-64 relative bg-gray-200">
                     <img src={imgImageTechStartup} alt="Tech Startup" className="object-cover w-full h-full" />
                  </div>
                  <div className="p-6">
                     <h4 className="text-xl font-bold mb-2">테크 스타트업 플랫폼</h4>
                     <p className="text-gray-500">AI 기술 기업의 혁신적인 웹사이트</p>
                  </div>
               </div>
               <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                  <div className="h-64 relative bg-gray-200">
                      <img src={imgImageECommercePlatform} alt="E-Commerce" className="object-cover w-full h-full" />
                  </div>
                  <div className="p-6">
                      <h4 className="text-xl font-bold mb-2">이커머스 솔루션</h4>
                      <p className="text-gray-500">매출 증대를 위한 최적화된 쇼핑몰</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-24 bg-[#101828] text-white text-center">
          <h2 className="text-4xl font-bold mb-8">프로젝트를 시작할 준비가 되셨나요?</h2>
          <button className="px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-gray-100 transition-colors">
              프로젝트 의뢰하기
          </button>
      </section>
    </div>
  );
}
