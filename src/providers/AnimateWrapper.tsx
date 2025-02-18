import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { MotionProps } from "framer-motion";

type AnimateWrapperProps = {
    children: React.ReactNode,
    isVisible: boolean,
    options?: Partial<MotionProps>
}

export function AnimateWrapper({ children, isVisible, options = {} }: AnimateWrapperProps) {
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