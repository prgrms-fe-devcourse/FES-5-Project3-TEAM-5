import Input from '@/shared/components/form/Input'
import SubmitButton from '@/shared/components/form/SubmitButton'
import ModalPortal from '@/shared/components/modal/ModalPortal'
import Overlay from '../../../../../shared/components/modal/Overlay'
import SelectDate from './SelectDate'

function ExportExcelModal() {
  return (
    <ModalPortal>
      <Overlay>
        <div className=" w-full max-w-[420px] rounded-t-xl bg-white p-5">
          <div className="relative">
            <h2 className="text-center text-[22px] font-bold text-black">
              엑셀 내보내기
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <SelectDate />
            <div className="flex flex-col gap-1.5">
              <h3 className="text-neutral-dark text-lg font-bold">이메일</h3>
              <Input label="이메일" />
            </div>
            <SubmitButton text="내보내기" />
          </div>
        </div>
      </Overlay>
    </ModalPortal>
  )
}
export default ExportExcelModal
