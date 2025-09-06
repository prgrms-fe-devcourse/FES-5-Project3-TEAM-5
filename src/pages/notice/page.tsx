import { motion } from 'framer-motion'
import momoInvite from '@/shared/assets/momo/momo-invite.png'
import ScrollToTopButton from '@/shared/components/buttons/ScrollToTopButton'

interface Notice {
  id: number
  title: string
  content: string
  date: string
  isNew?: boolean
  category: '공지' | '업데이트' | '이벤트'
}

const notices: Notice[] = [
  {
    id: 1,
    title: '또모 1.0 업데이트 안내',
    content: `안녕하세요! 또모가 더욱 편리하게 개선되었습니다.

• 새로운 기능
- 월별 지출 분석 기능 추가
- 카테고리별 예산 설정 기능
- 공유 가계부 초대 시스템 개선

• 개선사항
- 통계 화면 로딩 속도 개선
- UI/UX 디자인 개선
- 버그 수정 및 안정성 향상

앞으로도 더 나은 서비스를 제공하기 위해 노력하겠습니다.`,
    date: '2025.08.21',
    category: '업데이트'
  },
  {
    id: 2,
    title: '또모와 함께하는 가계부 이벤트',
    content: `특별한 이벤트를 준비했습니다!

• 이벤트 기간: 2025.09.01 ~ 2025.09.30
• 참여 방법: 
1. 한 달 동안 가계부 꾸준히 작성하기
2. 지출 리포트 공유하고 인증하기
3. 예산 목표 달성하기

• 상품
- 1등: 모모 굿즈 패키지
- 2등: 모모 인형
- 3등: 모모 스티커 세트

많은 참여 부탁드립니다!`,
    date: '2025.09.01',
    category: '이벤트'
  },
  {
    id: 3,
    title: '또모 서비스 점검 안내',
    content: `안녕하세요, 또모입니다.

더 나은 서비스 제공을 위한 시스템 점검이 진행될 예정입니다.

• 점검 일시: 2025.09.10 (수) 02:00 ~ 06:00
• 점검 내용: 서버 안정화 및 보안 강화
• 영향: 점검 시간 동안 서비스 이용 불가

불편을 끼쳐 죄송합니다.
최대한 빠르게 작업을 완료하도록 하겠습니다.`,
    date: '2025.09.05',
    category: '공지',
    isNew: true
  }
]

export default function NoticePage() {
  return (
    <div className="min-h-dvh p-4 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <h1 className="text-size-2xl font-bold text-primary-base">
            공지사항
          </h1>
          <p className="text-neutral-dark text-size-md">
            또모의 새로운 소식을 확인하세요
          </p>
        </div>
        <img
          src={momoInvite}
          alt="모모"
          className="w-16 h-16 object-contain"
        />
      </div>

      <div className="space-y-4">
        {notices.reverse().map((notice, index) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all">
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-size-sm ${
                      notice.category === '공지'
                        ? 'bg-secondary-blue/10 text-secondary-blue'
                        : notice.category === '업데이트'
                          ? 'bg-secondary-green/10 text-secondary-green'
                          : 'bg-primary-pale text-primary-base'
                    }`}>
                    {notice.category}
                  </span>
                  <h2 className="text-size-md font-medium">{notice.title}</h2>
                  {notice.isNew && (
                    <span className="px-1.5 py-0.5 bg-secondary-red/10 text-secondary-red rounded text-size-xs font-medium">
                      NEW
                    </span>
                  )}
                </div>
                <time className="text-neutral-dark text-size-sm whitespace-nowrap">
                  {notice.date}
                </time>
              </div>
              <div className="text-neutral-dark text-size-md whitespace-pre-line leading-relaxed">
                {notice.content}
              </div>
            </div>
          </motion.div>
        ))}
        <div className="flex flex-col justify-end items-end sticky z-50 bottom-3">
          <ScrollToTopButton/>
        </div>
      </div>
    </div>
  )
}
