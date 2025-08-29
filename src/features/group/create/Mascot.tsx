import { motion } from 'framer-motion'
import { mascotList } from './data/mascots'
import { useEffect, useRef, useState } from 'react'
import ArrowBtn from './ArrowBtn'

function Mascot({
  value,
  onChange
}: {
  value: number | null
  onChange: (value: number) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(4)
  const [startIndex, setStartIndex] = useState(0)

  const selectedId = value ?? mascotList[0].id ?? 1

  useEffect(() => {
    const updateVisibleCount = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const imageWidth = 70 + 3 // 이미지 너비 + gap
        const count = Math.floor(containerWidth / imageWidth)
        setVisibleCount(count)
      }
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  const imageWidth = 70 + 5 // 이미지 너비 + gap(px)
  const offsetX = startIndex * imageWidth

  const maxStartIndex = Math.max(mascotList.length - visibleCount, 0)

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setStartIndex(prev => Math.min(prev + 1, maxStartIndex))
  }

  const handleSelect = (id: number) => {
    onChange(id)
  }

  return (
    <div>
      <label
        htmlFor="groupChar"
        className="text-neutral-dark font-semibold">
        대표 이미지
      </label>
      <div className="flex items-center justify-center gap-3 mt-2">
        <ArrowBtn
          onClick={handlePrev}
          disabled={startIndex === 0}
          type="left"
        />

        <div
          className="w-[420px] overflow-hidden relative"
          ref={containerRef}>
          <motion.div
            className="flex gap-5 p-1"
            style={{
              transform: `translateX(-${offsetX}px)`,
              width: `${mascotList.length * imageWidth}px`,
              transition: 'transform 0.3s ease'
            }}>
            {mascotList.map(item => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-[70px] h-[80px] rounded-md hover:bg-primary-pale hover:shadow-lg transition ease-in cursor-pointer ${
                  selectedId === item.id
                    ? 'border-2 border-primary-light bg-primary-pale shadow-md scale-105 transition-transform duration-200'
                    : 'border border-transparent hover:shadow-sm hover:scale-105 transition-all duration-200'
                }`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </motion.div>
        </div>

        <ArrowBtn
          onClick={handleNext}
          disabled={startIndex === maxStartIndex}
          type="right"
        />
      </div>

      <input
        type="hidden"
        id="groupChar"
        name="groupChar"
        value={selectedId}
      />
    </div>
  )
}

export default Mascot
