"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowLeft, Eye, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import { GENERAL_INQUIRY_DATA, Post } from "@/features/contact/general/data";
import styles from "./BoardList.module.scss";

export default function BoardList() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostClick = (post: Post) => {
    if (post.isPrivate) {
      alert("비공개 글입니다. 작성자와 관리자만 확인할 수 있습니다.");
    } else {
      setSelectedPost(post);
    }
  };

  if (selectedPost) {
    return (
      <div className={styles.container}>
        <div className={styles.detailContainer}>
          <div className={styles.detailHeader}>
            <h3>{selectedPost.title}</h3>
            <div className={styles.detailMeta}>
              <span><User size={16} /> {selectedPost.author}</span>
              <span><Calendar size={16} /> {selectedPost.date}</span>
              <span><Eye size={16} /> {selectedPost.viewCount}</span>
            </div>
          </div>
          
          <div className={styles.detailBody}>
            {selectedPost.content || "내용이 없습니다."}
          </div>

          <button 
            className={styles.backBtn}
            onClick={() => setSelectedPost(null)}
          >
            <ArrowLeft size={16} /> 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  /* Pagination Logic */
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(GENERAL_INQUIRY_DATA.length / ITEMS_PER_PAGE);
  const currentData = GENERAL_INQUIRY_DATA.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optional: Scroll to top of list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.tableHeader}>
        <div className={styles.cell}>번호</div>
        <div className={styles.cell}>제목</div>
        <div className={styles.cell}>작성자</div>
        <div className={styles.cell}>작성일</div>
        <div className={styles.cell}>조회수</div>
      </div>

      {/* List */}
      <div className={styles.list}>
        <AnimatePresence mode="wait">
          {currentData.map((post, index) => (
            <motion.div 
              key={post.id} 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.05 }}
              className={styles.row}
              onClick={() => handlePostClick(post)}
            >
              {/* ID */}
              <div className={`${styles.cell} ${styles.desktopOnly}`}>
                {post.id.startsWith('notice') ? '공지' : post.id}
              </div>

              {/* Title */}
              <div className={`${styles.cell} ${styles.titleCell}`}>
                {post.isPrivate && <Lock className={styles.lockIcon} />}
                <span>{post.title}</span>
              </div>

              {/* Mobile Info Row */}
              <div className={styles.mobileInfo}>
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>조회 {post.viewCount}</span>
              </div>

              {/* Desktop Columns */}
              <div className={`${styles.cell} ${styles.desktopOnly}`}>{post.author}</div>
              <div className={`${styles.cell} ${styles.desktopOnly}`}>{post.date}</div>
              <div className={`${styles.cell} ${styles.desktopOnly}`}>{post.viewCount}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button 
          className={styles.pageBtn}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} />
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        <button 
          className={styles.pageBtn}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
