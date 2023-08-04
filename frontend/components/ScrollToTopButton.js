import { motion, useAnimation, useScroll, useTransform, useAnimationControls } from 'framer-motion';
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faFaceRelieved } from '@fortawesome/pro-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'
//config.autoAddCss = false

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
            console.log('5555 ScrollToTop latestValue === ', latestValue);
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
            style="transform: translateY(-50%);"
            variants={ScrollToTopContainerVariants}
            initial="hide"
            animate={controls}
            onClick={scrollToTop}>
                TOP
            <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
            {/*<FaArrowUp />*/}
        </motion.button>
    );
}

export default ScrollToTopButton;