import { motion, useAnimation, useScroll, useTransform, useAnimationControls } from 'framer-motion';
import React from 'react';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'

const ScrollToTopContainerVariants/*: Variants*/ = {
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
                {/*TOP*/}
                <FontAwesomeIcon icon={faArrowUp} style={{padding:10 + 'px'}}/>
        </motion.button>
    );
}
/*const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)
  
    useEffect(() => {
      const toggleVisibility = () => {
        // if the user scrolls down, show the button
        window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false)
      }
      // listen for scroll events
      window.addEventListener("scroll", toggleVisibility)
  
      // clear the listener on component unmount
      return () => {
        window.removeEventListener("scroll", toggleVisibility)
      }
    }, [])
  
    // handles the animation when scrolling to the top
    const scrollToTop = () => {
      isVisible &&
        window.scrollTo({
          top: 0,
          behavior: "auto",
        })
    }
  
    return (
      <button
        className={`fixed bottom-4 right-4 rounded-full p-2 outline-none transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
       
        onClick={scrollToTop}
      >
        {/*<ChevronUp />
        <FontAwesomeIcon icon={faArrowUp} style={{padding:10 + 'px'}}/>
      </button>
    )
  }*/
export default ScrollToTopButton;