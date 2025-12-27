"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_DATA } from "@/features/faq/data";
import Accordion from "@/components/molecules/Accordion/Accordion";
import styles from "./page.module.scss";

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories and add 'All'
  const categories = ['All', ...Array.from(new Set(FAQ_DATA.map(item => item.category || 'General')))];

  const filteredData = activeCategory === 'All' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(item => (item.category || 'General') === activeCategory);

  return (
    <div className={styles.faqPage}>
      <header className={styles.hero}>
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          F<span>AQ</span>
        </motion.h1>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
          자주 묻는 질문들을 모았습니다. <br />
          궁금한 점이 해결되지 않으셨다면 Contact 페이지를 통해 문의해주세요.
        </motion.p>
      </header>

      {/* Category Tabs */}
      <div className={styles.categoryTabs}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`${styles.tabButton} ${activeCategory === category ? styles.active : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className={styles.accordionContainer}>
        <AnimatePresence mode="popLayout">
          {filteredData.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Accordion 
                question={item.question} 
                answer={item.answer} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
