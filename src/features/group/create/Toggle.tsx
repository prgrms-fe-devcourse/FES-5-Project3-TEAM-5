import { useState } from 'react'

interface Props {
  header: string
  btn1: string
  btn2: string
}

function Toggle({ header, btn1, btn2 }: Props) {
  return (
    <div>
      <h2 className="text-neutral-dark font-semibold mb-1">{header}</h2>
      <div className="flex gap-2">
        <button
          type="button"
          className="bg-gray-200 rounded-md w-25 h-7 text-md cursor-pointer hover:bg-primary-pale">
          {btn1}
        </button>
        <button
          type="button"
          className="bg-gray-200 rounded-md w-25 h-7 text-md cursor-pointer hover:bg-primary-pale">
          {btn2}
        </button>
      </div>
    </div>
  )
}

export default Toggle
