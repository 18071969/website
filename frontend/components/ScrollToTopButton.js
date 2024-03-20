import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import styles from './ScrollToTopButton.module.scss';

const ScrollToTopButton = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return function cleanup() {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });

  const checkScrollTop = () => {
    //if (!showScroll && window.pageYOffset > 100) {scrollY
    if (!showScroll && window.scrollY > 100) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= 100) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        className={styles.scrollToTop}
        onClick={scrollTop}
        style={{
          display: showScroll ? "block" : "none",
        }}
      >
        <i className="ri-arrow-up-s-line"></i>
        <FontAwesomeIcon icon={faArrowUp} style={{padding:10 + 'px', width:40 + 'px', height:40 + 'px'}}/>
      </div>
    </>
  );
};

/*

import { motion, useAnimation, useScroll, useTransform, useAnimationControls } from 'framer-motion';
import React from 'react';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'

const ScrollToTopContainerVariants = {
  hide: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};

const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function ScrollToTopButton() {
  const { scrollYProgress } = useScroll();
  const controls = useAnimationControls();

  useEffect(() => {
      return scrollYProgress.on('change', (latestValue) => {
          //console.log('ScrollToTop Button latestValue === ', latestValue);
          if (latestValue > 0.5) {
              controls.start('show');
          } else {
              controls.start('hide');
          }
      });
  });

  return (
      <motion.button
          className="fixed bottom-0 right-0 p-10"
          style="transform: translateY(-50%), padding: 10px"
          id="GoToTopButton"
          title="Go to top"
          variants={ScrollToTopContainerVariants}
          initial="hide"
          animate={controls}
          onClick={scrollToTop}>
              
              <FontAwesomeIcon icon={faArrowUp} style={{padding:10 + 'px'}}/>
      </motion.button>
  );
}
*/
export default ScrollToTopButton;
