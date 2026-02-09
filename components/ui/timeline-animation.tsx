'use client'

import { motion, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { createElement, ElementType, RefObject } from "react"
import { cn } from "@/lib/utils"

interface TimelineContentProps {
  children: React.ReactNode
  animationNum: number
  timelineRef: RefObject<HTMLElement>
  customVariants?: Variants
  className?: string
  as?: ElementType
  [key: string]: any
}

export function TimelineContent({
  children,
  animationNum,
  timelineRef,
  customVariants,
  className,
  as = "div",
  ...props
}: TimelineContentProps) {
  const isInView = useInView(timelineRef, { once: true, amount: 0.3 })

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  }

  const variants = customVariants || defaultVariants

  return createElement(
    motion[as as keyof typeof motion] || motion.div,
    {
      custom: animationNum,
      initial: "hidden",
      animate: isInView ? "visible" : "hidden",
      variants,
      className: cn(className),
      ...props,
    },
    children
  )
}
