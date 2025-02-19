import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { MotionProps } from "framer-motion";
import { cc } from '../utils/cc';

type AnimateWrapperProps = {
    children: React.ReactNode,
    isVisible: boolean,
    options?: Partial<MotionProps>,
    isAbove?: boolean,
    classes?: string
}

export function AnimateWrapper({ children, isVisible, options = {}, isAbove = true, classes = '' }: AnimateWrapperProps) {
  const defaults = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: "easeOut" },
  };

  const merged = {
    ...defaults,
    ...options,
    transition: { ...defaults.transition, ...options.transition }, 
  };
  
    return (
      <AnimatePresence initial={true}>
        {isVisible && (
          <motion.div
          className={cc(isAbove && "relative z-10", classes)}
          initial={merged.initial}
          animate={merged.animate}
          exit={merged.exit}
          transition={merged.transition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }