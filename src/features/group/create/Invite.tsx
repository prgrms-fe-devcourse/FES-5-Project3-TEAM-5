import AddButton from '@/shared/components/buttons/AddButton'
import Input from '@/shared/components/form/Input'

function Invite() {
  return (
    <div className="mb-10">
      <h2 className="text-neutral-dark font-semibold mb-1">초대하기</h2>
      <div className="flex justify-between items-center mb-3 ">
        <Input
          label="이메일"
          className="sm:w-88 w-75"
        />
        <AddButton size="sm" />
      </div>
      <div>
        <ul className="flex flex-col gap-3">
          <li className="bg-primary-pale p-3 flex flex-wrap justify-start gap-5 rounded-lg text-sm">
            <span className="">71억쥬세요</span>
            <span className="">plzgivememoney@gmail.com</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Invite
