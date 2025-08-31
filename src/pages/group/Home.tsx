import AddBtn from '@/features/group/AddBtn'
import GroupCard from '@/features/group/GroupCard'
import Name from '@/features/group/Name'
import NumberGroup from '@/features/group/NumberGroup'
import ThisMonthCard from '@/features/group/ThisMonthCard'

function Home() {
  return (
    <div className="mb-20">
      <div className="bg-primary-light w-full h-45 rounded-bl-xl rounded-br-xl px-2 py-6 shadow-lg">
        <Name />
        <div className="flex justify-between mt-8 sm:mx-6 mx-3">
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
        <div className="flex justify-between items-center mb-5 md:mx-4 md:mt-2">
          <NumberGroup />
          <AddBtn />
        </div>
        <div className="flex flex-row justify-between flex-wrap gap-5 md:mx-4">
          <GroupCard />
        </div>
      </div>
    </div>
  )
}

export default Home
