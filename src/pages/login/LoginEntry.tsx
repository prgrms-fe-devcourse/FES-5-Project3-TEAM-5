import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LogoImg from '@/shared/assets/TTOMO.png'
import Login from './Login' // 기존 로그인 컴포넌트 import

function LoginEntry() {
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true)
    }, 1500) // 2.5초 후 로그인 화면 보여주기

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-primary-light">
      <AnimatePresence mode="wait">
        {!showLogin && (
          <motion.div
            key="logo"
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-primary-light z-10">
            <img
              src={LogoImg}
              alt="Logo"
              className="w-48 h-auto"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogin && (
          <motion.div
            key="login"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white z-20">
            <Login />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LoginEntry
