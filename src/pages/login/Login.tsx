import loginBear from '@/shared/assets/loginbear.png'
import LoginCard from '@/features/login/LoginCard'
import googleIcon from '@/shared/assets/google.svg'
import kakaoIcon from '@/shared/assets/kakao.svg'

function Login() {
  return (
    <div className="p-4 w-full absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-12">
      <div className="flex flex-row justify-between items-center">
        <div className="text-[25px]">
          <span className="text-[30px] font-bold">또모</span>에 오신 것을 <br />
          환영합니다.
        </div>
        <div>
          <img
            src={loginBear}
            alt="환영하는 곰돌이"
            className="w-[120px]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <LoginCard
          iconSrc={googleIcon}
          text="구글"
          provider="google"
          className="bg-[#F7F7F7]"
        />
        <LoginCard
          iconSrc={kakaoIcon}
          text="카카오"
          provider="kakao"
          className="bg-primary-light"
        />
      </div>
    </div>
  )
}

export default Login
