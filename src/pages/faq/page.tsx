// src/pages/faq/Page.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import momoStudy from '@/shared/assets/momo/momo-study.png'

interface FAQItem {
  question: string
  answer: string
  icon?: string
}

const faqData: FAQItem[] = [
  {
    question: '또모는 어떤 서비스인가요? 🐻',
    answer:
      '토무는 귀여운 모모와 함께하는 우리만의 특별한 가계부예요! 함께 사는 구성원들과 지출을 관리하고, 중요한 결정은 투표로 함께 결정할 수 있답니다. 모모가 여러분의 현명한 소비를 도와드릴게요! 💰✨'
  },
  {
    question: '가계부는 어떻게 작성하나요? 📝',
    answer:
      '캘린더에서 원하는 날짜를 톡! 누르면 수입/지출 내역을 입력할 수 있어요. 다양한 카테고리 중에서 선택하고, 금액을 입력하면 끝! 통계 화면에서는 예쁜 그래프로 한 눈에 확인할 수 있답니다. 😊'
  },
  {
    question: '투표는 어떻게 만드나요? 🗳️',
    answer:
      '투표 탭에서 + 버튼을 누르면 새로운 투표를 만들 수 있어요! 제목과 옵션을 입력하고, 마감일을 설정하면 완성! 구성원들의 의견을 쉽고 재미있게 모을 수 있답니다. 👥'
  },
  {
    question: '통계는 어떻게 확인하나요? 📊',
    answer:
      '통계 페이지에서 우리의 소비 패턴을 예쁜 그래프로 확인할 수 있어요. 수입/지출 현황을 한눈에 보고, 카테고리별 지출도 알록달록한 파이 차트로 확인해보세요! 모모가 여러분의 현명한 소비를 응원합니다! 🌈'
  },
  {
    question: '다른 멤버는 어떻게 초대하나요? 💌',
    answer:
      '설정 메뉴에서 초대 코드를 만들 수 있어요! 이 코드를 친구들과 공유하면, 친구들도 우리의 토무 가계부에 참여할 수 있답니다. 더 많은 친구들과 함께 즐거운 가계부를 작성해보세요! 🤝'
  }
]
export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  return (
    <div className="min-h-dvh p-4 space-y-4 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <h1 className="text-size-2xl font-bold text-primary-base">
            자주 묻는 질문
          </h1>
          <p className="text-neutral-dark text-size-md">
            토무와 함께하는 스마트한 가계부 생활
          </p>
        </div>
        <img
          src={momoStudy}
          alt="모모"
          className="w-20 h-20 object-contain"
        />
      </div>

      <div className="relative">
        <div className="space-y-3">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-neutral-light rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => toggleItem(index)}
                className={`w-full p-4 text-left flex justify-between items-center transition-colors
                    ${
                      openItems.includes(index)
                        ? 'bg-primary-pale text-primary-base'
                        : 'hover:bg-neutral-light text-black'
                    }`}>
                <span className="text-size-lg font-medium">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`w-6 h-6 ${openItems.includes(index) ? 'text-primary-base' : 'text-neutral-dark'}`}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path
                      d="M19 9l-7 7-7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden">
                    <div className="p-5 bg-white border-t border-neutral-light">
                      <div className="text-size-md leading-relaxed text-neutral-dark">
                        {item.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
