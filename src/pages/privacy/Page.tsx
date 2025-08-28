// src/pages/privacy/Page.tsx
import momoBook from '@/shared/assets/momo/momo-book.png'

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh p-4 space-y-6 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <h1 className="text-size-2xl font-bold text-primary-base">
            개인정보처리방침
          </h1>
          <p className="text-neutral-dark text-size-md">
            또모는 여러분의 개인정보를 소중히 다룹니다
          </p>
        </div>
        <img
          src={momoBook}
          alt="모모"
          className="w-16 h-16 object-contain"
        />
      </div>

      <div className="space-y-8">
        <section className="space-y-3">
          <h2 className="text-size-xl font-bold text-primary-base">
            1. 개인정보의 처리 목적
          </h2>
          <div className="space-y-2 text-neutral-dark leading-relaxed">
            <p>
              또모는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
              개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용
              목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의
              동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>회원 가입 및 관리</li>
              <li>가계부 서비스 제공</li>
              <li>투표 기능 제공</li>
              <li>서비스 개선 및 맞춤형 서비스 제공</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-size-xl font-bold text-primary-base">
            2. 개인정보의 처리 및 보유 기간
          </h2>
          <div className="space-y-2 text-neutral-dark leading-relaxed">
            <p>
              또모는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
              개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서
              개인정보를 처리·보유합니다.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>회원 가입 정보: 회원 탈퇴 시까지</li>
              <li>가계부 데이터: 회원 탈퇴 시까지</li>
              <li>투표 기록: 투표 종료 후 6개월</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-size-xl font-bold text-primary-base">
            3. 정보주체의 권리·의무 및 행사방법
          </h2>
          <div className="space-y-2 text-neutral-dark leading-relaxed">
            <p>
              정보주체는 또모에 대해 언제든지 다음 각 호의 개인정보 보호 관련
              권리를 행사할 수 있습니다.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-size-xl font-bold text-primary-base">
            4. 개인정보의 안전성 확보조치
          </h2>
          <div className="space-y-2 text-neutral-dark leading-relaxed">
            <p>
              또모는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
              있습니다.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육</li>
              <li>
                기술적 조치: 개인정보처리시스템 등의 접근권한 관리,
                접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치
              </li>
              <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-size-xl font-bold text-primary-base">
            5. 개인정보 보호책임자
          </h2>
          <div className="space-y-2 text-neutral-dark leading-relaxed">
            <p>
              또모는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
              처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
              같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="bg-neutral-light p-4 rounded-lg">
              <p className="font-medium text-black">개인정보 보호책임자</p>
              <ul className="mt-2 space-y-1">
                <li>이름: 모모</li>
                <li>직책: 정보보호 책임자</li>
                <li>연락처: privacy@tomomo.com</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-size-xl font-bold text-primary-base">
            6. 개인정보처리방침의 변경
          </h2>
          <div className="space-y-2 text-neutral-dark leading-relaxed">
            <p>
              이 개인정보처리방침은 2025년 1월 1일부터 적용됩니다. 법령 및
              방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는
              변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
