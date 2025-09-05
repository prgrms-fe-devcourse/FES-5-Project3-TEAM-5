import { TopButton, HoverTopButton } from '@/shared/assets/buttons/ButtonIcons'
import { useState, useEffect } from 'react'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="mb-4  ml-0.5 cursor-pointer ">
          {hovered ? <HoverTopButton /> : <TopButton />}
        </button>
      )}
    </>
  )
}
