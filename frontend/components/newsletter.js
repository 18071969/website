import React from "react";
import NewsletterForm from "./newsletterForm";
import Image from "./image";
import styles from './newslatter.module.scss';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { slideLeft } from '../lib/animation';

const Newsletter = ({ heading, subHeading, image }) => {
    {/*<div className={`bg-${theme}`}></div>*/}
    
    const {ref, inView} = useInView({
      threshold: 0.25
    });

    const animationLeft = useAnimation();
    const animationRight = useAnimation();

    useEffect(() => {
      if(inView){
        animationRight.start({
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring', duration: 5/*, bounce: 0.3*/
          },
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true }
        });
        animationLeft.start({
          x: 0,
          opacity: 1,
          transition: {
            type: 'spring', duration: 5/*, bounce: 0.3*/
          },
          variants:  slideLeft(false), 
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true }/**/
        });
      }
      if(!inView){
        animationRight.start({y: '10vw', opacity: 0});
        animationLeft.start({x: '-10vw', opacity: 0})
      }
      console.log('use effect hook, in View = ', inView);
    }, [inView, animationLeft, animationRight]);

    return (
      <div ref={ref} className={styles.sectionWrapper}>
        <motion.div className={styles.half}
                    animate={animationLeft}>
          <Image image={image} />
        </motion.div>
        <motion.div className={styles.half} 
                    animate={animationRight}>
          {heading && <h1 className={styles.sectionTitle}>{heading}</h1>}
          <h2>
            {subHeading && <span className={`block text-white`}>{subHeading}</span>}
          </h2>
          <NewsletterForm />
        </motion.div>   
      </div>
    );
  }; 
  export default Newsletter;