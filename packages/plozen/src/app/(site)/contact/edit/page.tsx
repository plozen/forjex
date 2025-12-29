"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import styles from "./page.module.scss";
import { createClient } from "@/lib/supabase/client";
import PasswordModal from "@/components/organisms/Board/PasswordModal";

// React Quill Dynamic Import
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-50 animate-pulse rounded-md">Loading Editor...</div>
});
import 'react-quill-new/dist/quill.snow.css';

function EditPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get ID from query params
  const supabase = createClient();

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    password: "", // User must enter this to save
    content: "",
    isPrivate: false,
  });

  // Init Data Fetch
  useEffect(() => {
    if (!id) {
      alert("잘못된 접근입니다.");
      router.back();
      return;
    }
    fetchData();
  }, [id]);

  const fetchData = async (passwordOverride?: string) => {
    if (!id) return;
    
    try {
      // 1. Fetch metadata from view first to check existence
      const { data: metaData, error: metaError } = await supabase
        .from('inquiries_list_view')
        .select('*')
        .eq('id', id)
        .single();
        
      if (metaError || !metaData) {
        alert("게시글을 찾을 수 없습니다.");
        router.back();
        return;
      }

      // 2. Fetch Content using RPC (Secure)
      const pw = passwordOverride || '';
      const { data: contentData, error: contentError } = await supabase.rpc('get_inquiry_content', {
        p_id: id!,
        p_password: pw
      });

      if (contentError) throw contentError;

      // If no content returned, it means password was wrong or empty for a private post
      if (!contentData || contentData.length === 0) {
        if (passwordOverride) {
          alert("비밀번호가 일치하지 않습니다.");
        } else {
          setModalOpen(true);
        }
        setIsLoading(false);
        return;
      }

      // Success
      const post = contentData[0];
      const safeMetaData = metaData;

      setFormData({
        title: safeMetaData?.title || "",
        author: safeMetaData?.author_name || "",
        password: passwordOverride || "",
        content: post.content,
        isPrivate: post.is_private,
      });
      setModalOpen(false);
      setIsLoading(false);

    } catch (e) {
      console.error(e);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
      router.back();
    }
  };

  const handleModalSubmit = (password: string) => {
    fetchData(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isPrivate: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const isContentEmpty = formData.content.replace(/<(.|\n)*?>/g, '').trim().length === 0;

    if (!formData.title.trim() || !formData.author.trim() || isContentEmpty) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }
    if (!formData.password.trim()) {
      alert("수정사항 저장을 위해 비밀번호를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.rpc('update_inquiry', {
        p_id: id!,
        p_password: formData.password,
        p_title: formData.title,
        p_content: formData.content,
        p_author_name: formData.author,
        p_is_private: formData.isPrivate
      });

      if (error) throw error;
      
      if (data === true) {
        alert("게시글이 수정되었습니다.");
        router.push("/contact?tab=general"); 
        router.refresh();
      } else {
        alert("비밀번호가 일치하지 않아 수정에 실패했습니다.");
      }
      
    } catch (error) {
      console.error('Error updating post:', error);
      alert("수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }), []);

  if (isLoading && !modalOpen) {
    return <div className={styles.loadingState}>Loading...</div>;
  }

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className={styles.title}>게시글 수정</h1>
      
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
            required
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
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>비밀번호 (저장용)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="비밀번호를 입력해야 저장됩니다"
              required
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
            <label htmlFor="isPrivate">비밀글로 설정</label>
          </div>
        </div>

        {/* Content - React Quill */}
        <div className={styles.formGroup}>
          <label className={styles.label}>내용</label>
          <div className={styles.editorWrapper}>
            <ReactQuill 
              theme="snow"
              value={formData.content}
              onChange={handleEditorChange}
              modules={modules}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button 
            type="button" 
            className={styles.cancelBtn}
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            취소
          </button>
          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? "수정 중..." : "수정 완료"}
          </button>
        </div>
      </form>

      <PasswordModal 
        isOpen={modalOpen}
        onClose={() => router.back()}
        onSubmit={handleModalSubmit}
        title="비밀글 조회"
        description="수정을 위해 먼저 비밀번호를 입력해주세요."
      />
    </motion.div>
  );
}

// Wrap in Suspense for useSearchParams safety
export default function EditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPageContent />
    </Suspense>
  );
}
