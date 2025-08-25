import SearchBar from '@/features/vote/ui/SearchBar'
import SortButtonList from '@/features/vote/ui/SortButtonList'
import VoteCard from '@/features/vote/ui/VoteCard'
import AddButton from '@/shared/components/buttons/AddButton'

function VotePage() {
  return (
    <div className="flex flex-col gap-5 ">
      <SearchBar />
      <SortButtonList />
      <VoteCard />
      <VoteCard />
      <div className="flex justify-end items-end sticky z-50 bottom-18">
        <AddButton />
      </div>
    </div>
  )
}
export default VotePage
