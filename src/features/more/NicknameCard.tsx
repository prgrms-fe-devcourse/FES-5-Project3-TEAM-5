import { useUserStore } from '@/shared/stores/useUserStore'
import raiseBear from '@/shared/assets/momo/momo-raise.png'

function NicknameCard() {
  const nickname = useUserStore(
    state =>
      state.user?.user_metadata.user_name || state.user?.user_metadata.name
  )

  const formatNickname = (nickname: string): string => {
    if (!nickname) return ''

    if (nickname.length > 20) {
      return nickname.slice(0, 15) + '...'
    }

    if (nickname.length > 8) {
      const mid = Math.floor(nickname.length / 2)
      return nickname.slice(0, mid) + '\n' + nickname.slice(mid)
    }

    return nickname
  }

  const formattedNickname = formatNickname(nickname)

  return (
    <div className="flex items-center gap-4 p-4 shadow-xl rounded-xl bg-white border-t-1 border-gray-100/80">
      <div className="w-[100px] h-[100px] bg-primary-pale rounded-full flex justify-center items-center">
        <img
          src={raiseBear}
          alt="profile Icon"
          className="w-[90%] h-[90%]"
        />
      </div>
      <div className="flex flex-col gap-1 max-w-[170px]">
        <h2 className="text-neutral-dark text-[12px]">닉네임</h2>
        <p className="text-black font-bold text-[18px] whitespace-pre-line break-words">
          {formattedNickname}
        </p>
      </div>
    </div>
  )
}

export default NicknameCard
