import AddBtn from '@/features/group/AddBtn'
import GroupCard from '@/features/group/GroupCard'
import MainImage from '@/features/group/MainImage'
import Name from '@/features/group/Name'
import NumberGroup from '@/features/group/NumberGroup'
import ThisMonthCard from '@/features/group/ThisMonthCard'

function Home() {
  return (
    <div className="mb-20 bg-primary-light">
      <div className="bg-primary-light w-full h-65 px-2 py-6 relative overflow-hidden">
        <div className="p-1 ml-4 mt-8 absolute z-10">
          <Name />
        </div>
        <MainImage />
        <div className="absolute bottom-3 left-[50%] transform -translate-x-[50%] w-full">
          <div className="flex justify-center gap-5 mt-7">
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
      </div>
      <div className="bg-white px-4 py-2.5 rounded-tl-2xl rounded-tr-2xl">
        <div className="flex  justify-between items-center mb-5 mx-4 mt-2">
          <NumberGroup />
          <AddBtn />
        </div>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(9.5rem,9.5rem))] justify-center gap-9 mx-4">
          <GroupCard />
        </div>
      </div>
    </div>
  )
}

export default Home
