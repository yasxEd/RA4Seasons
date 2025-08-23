'use client'

import React from 'react'
import { motion } from 'framer-motion'

const FloatingElements: React.FC = () => {
  return (
    <>
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-gray-100 opacity-30 rounded-full"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-gray-100 opacity-20 rounded-full"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </>
  )
}

export default FloatingElements