"use client";

import PortfolioGrid from "@/components/organisms/Portfolio/PortfolioGrid";

import styles from "./page.module.scss";

export default function PortfolioPage() {
  return (
    <div className={styles.portfolioPage}>
      <header className={styles.hero}>
        <h1>
          OUR <span>WORK</span>
        </h1>
        <p>
          혁신적인 기술과 창의적인 디자인으로<br /> 
          디지털 경험의 새로운 기준을 만듭니다.
        </p>
      </header>
      
      <PortfolioGrid />
    </div>
  );
}
