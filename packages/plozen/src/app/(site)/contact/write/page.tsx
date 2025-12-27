"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./page.module.scss";

export default function WritePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    password: "",
    content: "",
    isPrivate: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isPrivate: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.author || !formData.content) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    // Mock API Call
    console.log("Submitting Post:", formData);
    
    alert("게시글이 성공적으로 등록되었습니다.");
    router.push("/contact?tab=general"); 
  };

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className={styles.title}>게시글 작성</h1>
      
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {/* Title */}
        <div className={styles.formGroup}>
          <label className={styles.label}>제목</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            placeholder="제목을 입력해주세요"
          />
        </div>

        {/* Row: Author & Password */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label className={styles.label}>작성자</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={styles.input}
              placeholder="이름"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>비밀번호 (수정/삭제용)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="4자리 이상 입력"
            />
          </div>
        </div>

        {/* Options */}
        <div className={styles.formGroup}>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="isPrivate"
              checked={formData.isPrivate}
              onChange={handleCheckbox}
            />
            <label htmlFor="isPrivate">비밀글로 작성</label>
          </div>
        </div>

        {/* Content */}
        <div className={styles.formGroup}>
          <label className={styles.label}>내용</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="문의 내용을 자유롭게 작성해주세요."
          />
        </div>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button 
            type="button" 
            className={styles.cancelBtn}
            onClick={() => router.back()}
          >
            취소
          </button>
          <button type="submit" className={styles.submitBtn}>
            등록하기
          </button>
        </div>
      </form>
    </motion.div>
  );
}
