import AccountBookCard from '@/features/accountbook/setting/ui/AccountBookCard'
import ServiceCard from '@/features/accountbook/setting/ui/ServiceCard'
import EditGroup from '@/features/group/edit/EditGroup'

function SettingPage() {
  return (
    <div className="flex flex-col gap-6">
      <AccountBookCard />
      <ServiceCard />
    </div>
  )
}
export default SettingPage
