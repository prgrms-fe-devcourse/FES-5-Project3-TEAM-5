import loginBear from '@/shared/assets/loginbear.png'
import LoginCard from '@/features/login/LoginCard'
import googleIcon from '@/shared/assets/icons/google.svg'
import kakaoIcon from '@/shared/assets/icons/kakao.svg'

function Login() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-[480px] px-5 pt-[max(env(safe-area-inset-top),theme(spacing.8))] pb-[max(env(safe-area-inset-bottom),theme(spacing.8))]">
        <section className="flex flex-col items-center text-center">
          <img
            src={loginBear}
            alt="환영하는 곰돌이"
            className="w-24 md:w-28"
          />
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="text-primary-light">또모</span>, 함께 쓰는 가계부
          </h1>
          <p className="mt-2 text-sm md:text-base text-neutral-500">
            소셜 로그인으로 바로 시작해요
          </p>

          <div className="w-full mt-8 space-y-3">
            <LoginCard
              iconSrc={googleIcon}
              text="구글"
              provider="google"
              className="bg-white border border-neutral-200"
            />
            <LoginCard
              iconSrc={kakaoIcon}
              text="카카오"
              provider="kakao"
              className="bg-primary-light"
            />
          </div>

          <p className="mt-6 text-xs text-neutral-400">
            공용 기기에서는 로그아웃을 잊지 마세요.
          </p>
        </section>
      </div>
    </main>
  )
}

export default Login
