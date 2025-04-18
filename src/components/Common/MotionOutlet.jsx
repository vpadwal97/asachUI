import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MotionOutlet = ({ ...props }) => {
  const location = useLocation();

  return (
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        // initial={props.initial}
        // animate={props.animate}
        // exit={props.exit}
        // transition={props.transition}
      >
        <Outlet />
      </motion.div>
  );
};

export default MotionOutlet;
