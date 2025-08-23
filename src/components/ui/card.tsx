'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

const Card: React.FC<CardProps> = ({ children, className, hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -8 } : {}}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-white border border-gray-200 rounded-2xl p-10 text-black shadow-sm hover:shadow-lg transition-shadow duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export default Card