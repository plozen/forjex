"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";
import styles from "./QuoteForm.module.scss";
import { createClient } from "@/lib/supabase/client";
import { Database, Json } from "@/types/database.types";

/**
 * @file QuoteForm.tsx
 * @description
 * 사용자로부터 프로젝트 의뢰 정보를 입력받는 다단계 폼(Multi-step Form) 컴포넌트입니다.
 * 애니메이션을 위해 Framer Motion을 사용하며, Supabase DB와 연동하여 데이터를 저장합니다.
 * 
 * 주요 기능:
 * 1. 단계별 질문(Single/Multi Select, Text Input 등) 렌더링
 * 2. 조건부 입력 필드 처리 (예: "기타" 선택 시 텍스트 입력 노출)
 * 3. Supabase 'project_requests' 테이블로 데이터 전송 및 타입 매핑
 */

// --- Types ---

/** 질문 유형 정의 */
type QuestionType = "single-select" | "multi-select" | "text" | "textarea" | "multi-input";

/**
 * 다중 입력(Multi-input) 폼에서 개별 입력 필드의 정의
 */
interface InputField {
  key: string;          // 데이터 저장 시 사용될 키 (DB 컬럼명과 매핑됨)
  label?: string;       // 사용자에게 보여질 라벨
  type: "text" | "textarea" | "date" | "email" | "tel" | "file";
  placeholder?: string;
  required?: boolean;
}

/**
 * 선택지(Option) 정의
 * Single/Multi Select 질문에서 사용됩니다.
 */
interface Option {
  label: string;        // 화면 표시 텍스트
  value: string;        // 내부 저장 값
  description?: string; // 부가 설명 (선택적)
  
  // -- 조건부 입력 로직 (Conditional Logic) --
  // 특정 옵션을 선택했을 때 추가 정보를 입력받아야 하는 경우 사용 (예: "기타", "직접 입력")
  hasInput?: boolean; 
  inputType?: "text" | "number"; 
  inputPlaceholder?: string;
  inputKey?: string;    // 추가 입력값을 저장할 키 (answers 객체 내의 키)
  inputRequired?: boolean;
}

/**
 * 질문(Question) 정의
 * 각 단계(Step)를 구성하는 데이터 구조입니다.
 */
interface Question {
  id: number;
  key?: string;         // 해당 질문의 답변을 저장할 주요 키 (answers 객체의 키)
  title: string;        // 질문 제목
  subtitle?: string;    // 질문 부제목/설명
  type: QuestionType;   // 질문 유형
  
  // Select / Multi-Select 유형일 때 사용
  options?: Option[];
  
  // Text / Textarea 유형일 때 사용
  placeholder?: string;
  
  // Multi-Input 유형일 때 사용
  inputs?: InputField[];
}

// --- Data ---

/**
 * 폼 질문 데이터 배열
 * 순서대로 렌더링되며, Step ID는 1부터 시작합니다.
 */
const questions: Question[] = [
  {
    id: 1,
    key: "service_type",
    title: "어떤 종류의 서비스가 필요하신가요?",
    subtitle: "제작 목적에 맞는 구조를 선택해주세요.",
    type: "single-select",
    options: [
      { label: "회사/브랜드 소개 홈페이지", value: "corporate", description: "기업, 병원 등 신뢰도 목적 / Multi-page" },
      { label: "이벤트/광고용 랜딩 페이지", value: "landing", description: "상품 홍보, 신청 접수 / One-page" },
    ],
  },
  {
    id: 2,
    key: "budget",
    title: "예산 범위는 어떻게 되시나요?",
    subtitle: "대략적인 예산을 알려주시면 적합한 솔루션을 제안드릴 수 있습니다.",
    type: "single-select",
    options: [
      { label: "35만원", value: "350k" },
      { label: "100만원", value: "1m" },
      { label: "200만원", value: "2m" },
      { label: "300만원", value: "3m" },
      { label: "미정", value: "pending" },
      { 
        label: "기타", 
        value: "etc", 
        // '기타' 선택 시 직접 금액을 입력받기 위한 조건부 설정
        hasInput: true, 
        inputType: "text", 
        inputKey: "budget_custom", 
        inputPlaceholder: "예상 금액 입력",
        inputRequired: true
      },
    ],
  },
  {
    id: 3,
    key: "design_mood",
    title: "고객에게 어떤 느낌을 주고 싶으신가요?",
    subtitle: "원하시는 디자인 분위기를 선택해주세요.",
    type: "single-select",
    options: [
      { label: "신뢰감 있는 (Blue/Grey)", value: "trustworthy" },
      { label: "따뜻한/감성적인 (Beige/Pastel)", value: "warm" },
      { label: "고급스러운 (Black/Gold)", value: "luxury" },
      { label: "개성 있는 (Vivid/Creative)", value: "creative" },
      { 
        label: "잘 모르겠어요", 
        value: "unsure",
        hasInput: true,
        inputType: "text",
        inputKey: "design_ref_url",
        inputPlaceholder: "참고할 사이트 URL 혹은 이미지 설명",
        inputRequired: false
      }
    ],
  },
  {
    id: 4,
    key: "features",
    title: "사이트에 어떤 내용을 담고 싶으신가요?",
    subtitle: "필요한 기능과 페이지 구성을 모두 선택해주세요.",
    type: "multi-select",
    options: [
      { label: "회사 소개 (연혁, 비전 등)", value: "company_intro" },
      { 
        label: "서비스 소개", 
        value: "service_intro",
        // 서비스 소개 선택 시 개수를 파악하기 위함
        hasInput: true,
        inputType: "number",
        inputKey: "service_count",
        inputPlaceholder: "서비스 개수",
        inputRequired: true
      },
      { label: "자유게시판", value: "board" },
      { label: "포트폴리오", value: "portfolio" },
      { label: "SNS 홍보 채널 연동", value: "sns_integration" },
      { label: "다국어 지원", value: "multilingual" },
      { 
        label: "문의하기", 
        value: "contact_form",
        hasInput: true,
        inputType: "text",
        inputKey: "contact_email_target",
        inputPlaceholder: "수신 이메일/번호",
        inputRequired: true
      },
      { 
        label: "기타", 
        value: "etc",
        hasInput: true,
        inputType: "text",
        inputKey: "features_etc",
        inputPlaceholder: "필요한 기능 입력",
        inputRequired: true
      },
    ],
  },
  {
    id: 5,
    key: "target_audience",
    title: "주로 어떤 분들이 방문하길 원하시나요?",
    subtitle: "타겟 고객 구체화는 기획의 핵심입니다.",
    type: "textarea",
    placeholder: "예: 2030 직장인 여성, 주말에 힐링하러 오는 분들 / 꼼꼼하게 학원 정보를 찾는 학부모 등"
  },
  {
    id: 6,
    key: "project_goal",
    title: "가장 얻고 싶은 핵심 목표는 무엇인가요?",
    subtitle: "고객님의 목표를 달성할 수 있도록 최선을 다하겠습니다.",
    type: "single-select",
    options: [
      { label: "브랜드 신뢰도 상승", value: "trust" },
      { label: "문의/상담 예약", value: "leads" },
      { label: "상품 판매", value: "sales" },
      { label: "정보 전달", value: "info" },
    ]
  },
  {
    id: 7,
    title: "담당자 정보",
    subtitle: "프로젝트 진행을 위해 연락처를 남겨주세요.",
    type: "multi-input",
    inputs: [
      { key: "client_name", label: "담당자 성함", type: "text", placeholder: "홍길동", required: true },
      { key: "contact_phone", label: "연락처", type: "tel", placeholder: "010-1234-5678", required: true },
      { key: "contact_email", label: "이메일", type: "email", placeholder: "name@company.com", required: true },
      { key: "company_name", label: "기업명", type: "text", placeholder: "(주)플로젠", required: false },
      { key: "description", label: "추가 요청사항 / 자료 첨부", type: "textarea", placeholder: "추가 설명이나 드라이브 링크 등을 남겨주세요.", required: false },
    ]
  }
];

export default function QuoteForm() {
  // 현재 단계 인덱스 (0부터 시작)
  const [currentStep, setCurrentStep] = useState(0);
  
  // 모든 답변을 저장하는 상태 객체
  // key: 질문의 key 또는 조건부 입력의 inputKey
  // value: 사용자 입력값 (string 또는 string 배열)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  
  // 애니메이션 방향 (1: 다음, -1: 이전)
  const [direction, setDirection] = useState(0);
  
  // 제출 중 상태 로딩 처리
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentStep];

  // --- Helpers ---

  /**
   * Supabase 저장을 위해 문자열 배열이나 undefined 값을 단일 문자열로 변환합니다.
   * DB 컬럼이 Text 타입일 경우 배열을 저장할 수 없으므로 join 처리합니다.
   */
  const getString = (val: string | string[] | undefined): string | null => {
    if (val === undefined || val === null) return null;
    if (Array.isArray(val)) return val.join(', ');
    return val;
  };

  // --- Handlers ---

  /** 다음 단계로 이동 */
  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    } else {
      // 마지막 단계에서는 제출 로직 실행
      submitForm();
    }
  };

  /** 이전 단계로 이동 */
  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  /** 단일 선택 항목 핸들러 */
  const handleSingleSelect = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  /** 
   * 다중 선택 항목 핸들러
   * 배열에 값을 추가하거나 제거합니다 (Toggle 방식).
   */
  const handleMultiSelect = (key: string, value: string) => {
    const currentList: string[] = Array.isArray(answers[key]) ? answers[key] : [];
    if (currentList.includes(value)) {
      setAnswers(prev => ({ ...prev, [key]: currentList.filter(v => v !== value) }));
    } else {
      setAnswers(prev => ({ ...prev, [key]: [...currentList, value] }));
    }
  };

  /** 텍스트 입력 핸들러 */
  const handleInputChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  /**
   * 폼 데이터 제출 및 Supabase DB 저장
   * 'project_requests' 테이블 스키마에 맞춰 데이터를 매핑합니다.
   */
  const submitForm = async () => {
    setIsSubmitting(true);
    const supabase = createClient();

    // Features(기능) 관련 데이터는 JSON 형태로 구조화하여 저장
    // answers 객체에 산재된 관련 필드들을 모아서 하나의 JSON 객체로 만듭니다.
    const featuresData: { [key: string]: Json | undefined } = {
      selected: Array.isArray(answers.features) ? answers.features : [],
      service_count: getString(answers.service_count),
      contact_target: getString(answers.contact_email_target),
      etc: getString(answers.features_etc)
    };

    /**
     * DB Insert Payload 생성
     * Database['public']['Tables']['project_requests']['Insert'] 타입을 사용하여 타입 일치 보장
     */
    const payload: Database['public']['Tables']['project_requests']['Insert'] = {
      // 1. 기본 프로젝트 정보
      project_type: getString(answers.service_type),
      budget_range: answers.budget === 'etc' 
        ? `Custom: ${getString(answers.budget_custom) || ''}` 
        : getString(answers.budget),
      
      // 2. 신규 추가 컬럼 매핑 (2025-12-31 업데이트)
      design_mood: getString(answers.design_mood), 
      features: featuresData as Json, // JSONB 컬럼
      target_audience: getString(answers.target_audience),
      project_goal: getString(answers.project_goal),

      // 3. 담당자 및 표준 정보
      client_name: getString(answers.client_name) ?? '', // NOT NULL
      company_name: getString(answers.company_name),
      contact_email: getString(answers.contact_email) ?? '', // NOT NULL
      contact_phone: getString(answers.contact_phone),
      description: getString(answers.description) ?? '', 
      
      reference_urls: getString(answers.design_ref_url), 
      target_deadline: null // 현재 폼에서는 입력받지 않음
    };

    try {
      const { error } = await supabase
        .from('project_requests')
        .insert([payload]);

      if (error) throw error;

      alert("문의가 성공적으로 접수되었습니다! 담당자가 곧 연락드리겠습니다.");
      // 추후 개선: 성공 페이지로 리다이렉트 또는 폼 초기화 로직 추가 가능
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Validation ---

  /**
   * 현재 단계의 유효성 검사
   * 필수 입력값이 모두 채워졌는지 확인합니다.
   * @param q 현재 질문 객체
   */
  const validateStep = (q: Question): boolean => {
    if (!q) return false;

    // 1. Single Select 검증
    if (q.type === 'single-select' && q.key && q.options) {
      const val = answers[q.key];
      if (!val) return false;
      
      // 조건부 입력 필드(hasInput)가 필수인 경우 체크
      const selectedOpt = q.options.find(o => o.value === val);
      if (selectedOpt?.hasInput && selectedOpt?.inputRequired && selectedOpt?.inputKey) {
        const inputVal = getString(answers[selectedOpt.inputKey]);
        if (!inputVal || inputVal.trim() === "") return false;
      }
      return true;
    }

    // 2. Multi Select 검증
    if (q.type === 'multi-select' && q.key && q.options) {
      const list = answers[q.key];
      // 최소 하나 이상 선택 필수
      if (!Array.isArray(list) || list.length === 0) return false;
      
      // 선택된 항목들 중 조건부 입력 필드가 있다면 모두 검증
      const allValid = q.options.every(opt => {
        if (list.includes(opt.value) && opt.hasInput && opt.inputRequired && opt.inputKey) {
          const inputVal = getString(answers[opt.inputKey]);
          return !!inputVal && inputVal.trim() !== "";
        }
        return true;
      });
      return allValid;
    }

    // 3. Text / Textarea 검증
    if ((q.type === 'text' || q.type === 'textarea') && q.key) {
      const val = getString(answers[q.key]);
      return !!val && val.trim() !== "";
    }

    // 4. Multi Input (마지막 연락처 폼) 검증
    if (q.type === 'multi-input' && q.inputs) {
      return q.inputs.every(input => {
        if (!input.required) return true;
        const val = getString(answers[input.key]);
        return !!val && val.trim() !== "";
      });
    }

    return true;
  };

  const canProceed = validateStep(currentQuestion);

  // --- Renderers ---

  /** 단일 선택 UI 렌더링 */
  const renderSingleSelect = (key: string, options?: Option[]) => (
    <div className={styles.options}>
      {options?.map((option) => (
        <div key={option.value} className={styles.optionWrapper}>
          <button
            className={`${styles.optionBtn} ${answers[key] === option.value ? styles.selected : ""}`}
            onClick={() => handleSingleSelect(key, option.value)}
          >
            <div className={styles.optionContent}>
              <span className={styles.optionLabel}>{option.label}</span>
              {option.description && <span className={styles.optionDesc}> - {option.description}</span>}
            </div>
          </button>
          
          {/* 조건부 입력 필드 애니메이션 */}
          <AnimatePresence>
            {option.hasInput && answers[key] === option.value && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden', marginTop: '8px' }}
              >
                <div className={styles.inputLineWrapper} style={{ marginTop: 0 }}>
                  <input 
                    type={option.inputType || 'text'}
                    className={styles.inputField}
                    placeholder={option.inputPlaceholder}
                    value={answers[option.inputKey!] || ""}
                    onChange={(e) => handleInputChange(option.inputKey!, e.target.value)}
                    autoFocus
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );

  /** 다중 선택 UI 렌더링 */
  const renderMultiSelect = (key: string, options?: Option[]) => (
    <div className={styles.options}>
      {options?.map((option) => {
        const currentSelection = answers[key];
        const isSelected = Array.isArray(currentSelection) && currentSelection.includes(option.value);
        return (
          <div key={option.value} className={styles.optionWrapper}>
            <button
              className={`${styles.optionBtn} ${isSelected ? styles.selected : ""}`}
              onClick={() => handleMultiSelect(key, option.value)}
            >
              {option.label}
            </button>

            <AnimatePresence>
              {option.hasInput && isSelected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ marginTop: '8px', overflow: 'hidden' }}
                >
                  <div className={styles.inputLineWrapper} style={{ marginTop: 0 }}>
                    <input 
                      type={option.inputType || 'text'}
                      className={styles.inputField}
                      placeholder={option.inputPlaceholder}
                      value={answers[option.inputKey!] || ""}
                      onChange={(e) => handleInputChange(option.inputKey!, e.target.value)}
                      onClick={(e) => e.stopPropagation()} 
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  /** 다중 필드 입력 UI 렌더링 (담당자 정보 등) */
  const renderInputs = (inputs?: InputField[]) => (
    <div className={styles.multiInputContainer}>
      {inputs?.map((input) => (
        <div key={input.key} className={styles.inputGroup}>
          {input.label && <label className={styles.inputLabel}>{input.label}</label>}
          {input.type === 'textarea' ? (
            <textarea
              className={styles.inputField}
              placeholder={input.placeholder}
              value={answers[input.key] || ""}
              onChange={(e) => handleInputChange(input.key, e.target.value)}
              rows={4}
              style={{ resize: "none", marginTop: '8px' }} 
            />
          ) : (
            <div className={styles.inputLineWrapper}>
              <input
                type={input.type}
                className={styles.inputField}
                placeholder={input.placeholder}
                value={answers[input.key] || ""}
                onChange={(e) => handleInputChange(input.key, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  /** 현재 질문 타입에 따른 컨텐츠 분기 처리 */
  const renderStepContent = (q: Question) => {
    switch (q.type) {
      case 'single-select':
        return renderSingleSelect(q.key!, q.options);
      case 'multi-select':
        return renderMultiSelect(q.key!, q.options);
      case 'textarea':
        return (
          <textarea
            className={styles.inputField}
            placeholder={('placeholder' in q) ? q.placeholder : ""}
            value={answers[q.key!] || ""}
            onChange={(e) => handleInputChange(q.key!, e.target.value)}
            rows={6}
            style={{ resize: "none", minHeight: '150px' }}
            autoFocus
          />
        );
      case 'multi-input':
        return renderInputs(q.inputs);
      default:
        return null;
    }
  };

  // Framer Motion Variants 설정
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className={styles.quotePage}>
      <div className={styles.cardContainer}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={styles.card}
          >
            {/* --- Progress Bar --- */}
            <div className={styles.progressBarContainer}>
              <motion.div
                className={styles.progressBarFill}
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            {/* --- Step Header --- */}
            <div className={styles.question}>
              <span className={styles.stepIndicator}>
                STEP {String(currentStep + 1).padStart(2, '0')}
                <span className={styles.stepTotal}> / {String(questions.length).padStart(2, '0')}</span>
              </span>
              <motion.h2 layoutId="title">{currentQuestion.title}</motion.h2>
              {currentQuestion.subtitle && <p>{currentQuestion.subtitle}</p>}
            </div>

            {/* 입력 컨텐츠 영역 */}
            <div className={styles.scrollableContent}>
              {renderStepContent(currentQuestion)}
            </div>

            {/* 하단 네비게이션 버튼 */}
            <div className={styles.navigation}>
              <button 
                className={`${styles.navBtn} ${styles.prev}`} 
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                {currentStep > 0 && "이전"}
              </button>
              
              <button 
                className={`${styles.navBtn} ${styles.next}`} 
                onClick={handleNext}
                disabled={(!canProceed) || isSubmitting} 
              >
                {isSubmitting ? "전송 중..." : (currentStep === questions.length - 1 ? "제출하기" : "다음")}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
