import { useState } from "react";
import BinaryTabs from "./components/BinaryTabs"
import SubmitButton from "@/shared/components/form/SubmitButton";
import AmountInput from "./components/AmountInput";


function AddItem() {
  const [tab, setTab] = useState<"수입"|"지출">("수입");
  const [amount, setAmount] = useState("");
  return (
    <>
      {/* 상단 탭 */}
      <BinaryTabs value={tab} onChange={setTab} options={["수입", "지출"]} />

      {/* 날짜 */}
      <div>
        <span>11월 22일 토</span>
      </div>

      {/* 폼 */}
      <form>
        {/* 금액 */}
        <div>
          <div>
            <AmountInput value={amount} onChange={setAmount} />
          </div>
        </div>

        {/* 분류 */}
        <div>
          <span>분류</span>
          <input type="text" name="" placeholder="분류를 선택해 주세요" />
        </div>

        {/* 수단 */}
        <div>
          <span>수단</span>
          <input type="text" name="" placeholder="결제수단을 선택해 주세요" />
        </div>

        {/* 사진 */}
        <div>
          <span>사진</span>
          <input type="text" name="" placeholder="사진을 업로드해 주세요" />
        </div>

        {/* 메모 */}
        <div>
          <span>메모</span>
          <textarea name="" id="" placeholder="메모를 입력해 주세요"></textarea>
        </div>
      
        <SubmitButton text="작성 완료" />
      </form>
    </>



  )
}
export default AddItem