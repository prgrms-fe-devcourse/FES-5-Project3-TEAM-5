import AddBtn from '@/features/group/AddBtn'
import GroupCard from '@/features/group/groupCard'
import ThisMonthCard from '@/features/group/thisMonthCard'
import AddButton from '@/shared/components/buttons/AddButton'

function Home() {
  return (
    <div className="">
      <div className="bg-primary-light w-full h-40 rounded-bl-xl rounded-br-xl px-2 py-6">
        <h1 className="font-semibold text-black text-lg ml-2">
          가계부 이름임돠
        </h1>
        <div className="flex justify-between mt-4 sm:mx-7 mx-3">
          <ThisMonthCard
            type="수입"
            className="text-secondary-blue"
          />
          <ThisMonthCard
            type="지출"
            className="text-secondary-red"
          />
        </div>
      </div>
      <div className="px-4 py-2.5">
        <div className="flex justify-between items-center mb-3">
          <p className="text-neutral-dark pb-1">4개의 가계부</p>
          <AddBtn />
        </div>
        <div className="flex sm:flex-row flex-col flex-wrap">
          <GroupCard />
        </div>
      </div>
    </div>
  )
}

export default Home
