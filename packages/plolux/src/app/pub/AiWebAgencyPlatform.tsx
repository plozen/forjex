import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Asset constants
const imgImageTechStartup = "/assets/images/tech-startup.png";
const imgImageECommercePlatform = "/assets/images/ecommerce-platform.png";
const imgIcon = "/assets/images/icon-ai.svg";
const imgIcon1 = "/assets/images/icon-global.svg";
const imgIcon2 = "/assets/images/icon-security.svg";
const imgIcon3 = "/assets/images/icon-fast.svg";
// Additional icons might be needed, using placeholders where necessary or reusing existing ones if they match by context.

export default function AiWebAgencyPlatform() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#101828]">
      
      {/* 1. Header (Navbar) */}
      <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-8 backdrop-blur-md bg-white/10 border-b border-white/10 text-white transition-all duration-300">
         <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#3B82F6]">PLOLUX</span>
         </div>
         <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link href="#" className="hover:text-white transition-colors text-[#3B82F6]">홈</Link>
            <Link href="#" className="hover:text-white transition-colors">회사소개</Link>
            <Link href="#" className="hover:text-white transition-colors">포트폴리오</Link>
            <Link href="#" className="hover:text-white transition-colors">블로그</Link>
            <Link href="#" className="hover:text-white transition-colors">공지사항</Link>
            <Link href="#" className="hover:text-white transition-colors">제작 요청</Link>
            <Link href="#" className="hover:text-white transition-colors">문의하기</Link>
         </nav>
         <div className="flex items-center gap-4">
             <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
             </button>
         </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 pt-20 text-center">
         {/* Background gradient effect */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
         
         <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
               AI로 만드는 <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6FF] to-[#0072FF]">미래의 웹</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
               PLOLUX와 함께 차세대 웹 경험을 구축하세요
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
               <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00C6FF] to-[#0072FF] text-white font-bold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                  사이트 제작 요청
               </button>
               <button className="px-8 py-4 rounded-full border border-gray-600 text-white font-medium text-lg hover:bg-white/5 transition-all">
                  문의하기
               </button>
            </div>
         </div>

         {/* Scroll Indicator */}
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
            <div className="w-6 h-10 rounded-full border-2 border-gray-500 flex items-start justify-center p-1">
               <div className="w-1 h-2 bg-gray-500 rounded-full" />
            </div>
         </div>
      </section>

      {/* 3. Why PLOLUX (Features) - Integrated from Figma Source */}
      <section className="py-24 bg-white flex justify-center">
        {/* Container */}
        <div className="w-full max-w-[1280px] px-6 lg:px-8 flex flex-col gap-16">
            {/* Title Group */}
            <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-[#101828]">왜 PLOLUX인가?</h2>
                <p className="text-xl text-[#4a5565]">AI 기술로 차별화된 서비스를 제공합니다</p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1: AI 기반 개발 */}
                <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-6 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <Image src={imgIcon} alt="Icon" width={32} height={32} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-[#101828]">AI 기반 개발</h3>
                        <p className="text-[#4a5565] leading-relaxed">최첨단 AI 기술로 웹사이트를 자동화하고 최적화합니다.</p>
                    </div>
                </div>

                {/* Card 2: 빠른 제작 */}
                 <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-6 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white">
                         <Image src={imgIcon3} alt="Icon" width={32} height={32} className="brightness-0 invert" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-[#101828]">빠른 제작</h3>
                        <p className="text-[#4a5565] leading-relaxed">전통적인 방식보다 3배 빠른 개발 속도를 제공합니다.</p>
                    </div>
                </div>

                {/* Card 3: 글로벌 표준 */}
                 <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-6 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                        {/* Placeholder icon as unique ones weren't clearly mapped */}
                         <Image src={imgIcon1} alt="Icon" width={32} height={32} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-[#101828]">글로벌 표준</h3>
                        <p className="text-[#4a5565] leading-relaxed">세계적 수준의 디자인과 성능을 보장합니다.</p>
                    </div>
                </div>

                {/* Card 4: 안전한 보안 */}
                 <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-6 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                         <Image src={imgIcon2} alt="Icon" width={32} height={32} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-[#101828]">안전한 보안</h3>
                        <p className="text-[#4a5565] leading-relaxed">엔터프라이즈급 보안으로 데이터를 보호합니다.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 4. Portfolio Section */}
      <section className="py-24 bg-[#F8FAFC]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
               <div className="text-center mb-16 space-y-4">
                  <h2 className="text-4xl font-bold text-[#101828]">포트폴리오</h2>
                  <p className="text-lg text-[#64748B]">우리가 만든 성공 사례를 확인하세요</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Portfolio Item 1 */}
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                      <div className="aspect-[16/9] overflow-hidden bg-gray-200 relative">
                          <Image src={imgImageTechStartup} alt="Tech Startup" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                          <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold bg-[#00C6FF] rounded-full">기업 사이트</span>
                          <div className="flex items-end justify-between">
                              <h3 className="text-2xl font-bold">테크 스타트업</h3>
                              <svg className="w-6 h-6 mb-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                          </div>
                      </div>
                  </div>

                  {/* Portfolio Item 2 */}
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                      <div className="aspect-[16/9] overflow-hidden bg-gray-200 relative">
                          <Image src={imgImageECommercePlatform} alt="E-Commerce" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                          <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold bg-[#00C6FF] rounded-full">온라인 쇼핑몰</span>
                          <div className="flex items-end justify-between">
                              <h3 className="text-2xl font-bold">이커머스 플랫폼</h3>
                              <svg className="w-6 h-6 mb-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                          </div>
                      </div>
                  </div>
               </div>
               
               <div className="mt-12 text-center">
                  <button className="px-8 py-3 rounded-full bg-[#3B82F6] text-white font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto">
                      더 많은 작업물 보기
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
               </div>
          </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#00C6FF] to-[#0072FF] text-white text-center">
          <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">프로젝트를 시작할 준비가 되셨나요?</h2>
              <p className="text-xl mb-10 opacity-90">지금 바로 문의하시고 무료 상담을 받아보세요</p>
              <button className="px-10 py-4 bg-white text-[#0072FF] font-bold rounded-full text-lg shadow-xl hover:bg-gray-50 hover:scale-105 transition-all">
                  지금 시작하기
              </button>
          </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-white border-t border-gray-100 py-16 text-sm text-gray-600">
          <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-1 space-y-4">
                  <h3 className="text-2xl font-bold text-[#3B82F6]">PLOLUX</h3>
                  <p className="leading-relaxed">AI 기반 웹 에이전시로 미래를 만듭니다.</p>
                  <div className="flex gap-4 pt-2">
                       {/* Social Icons Placeholders */}
                       <div className="w-5 h-5 bg-gray-300 rounded-sm"></div>
                       <div className="w-5 h-5 bg-gray-300 rounded-sm"></div>
                       <div className="w-5 h-5 bg-gray-300 rounded-sm"></div>
                  </div>
              </div>
              
              <div>
                  <h4 className="font-bold text-[#101828] mb-4">빠른 링크</h4>
                  <ul className="space-y-2">
                      <li><Link href="#" className="hover:text-[#3B82F6]">회사소개</Link></li>
                      <li><Link href="#" className="hover:text-[#3B82F6]">서비스</Link></li>
                      <li><Link href="#" className="hover:text-[#3B82F6]">포트폴리오</Link></li>
                      <li><Link href="#" className="hover:text-[#3B82F6]">블로그</Link></li>
                  </ul>
              </div>

              <div>
                  <h4 className="font-bold text-[#101828] mb-4">연락처</h4>
                  <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                          contact@plolux.com
                      </li>
                      <li className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                          02-1234-5678
                      </li>
                  </ul>
              </div>
          </div>
          <div className="text-center mt-12 pt-8 border-t border-gray-100">
              <p>© 2024 PLOLUX. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
