import { useTranslation } from 'next-i18next';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import React from "react";
import Image from "./image";
import Button from "./ui/button"; 
import styles from './ourMission.module.scss';

const OurMission = ({ heading, content, showLogo, image }) => {
  const { t } = useTranslation(['home']);
  //console.log('OurMission t === ', t);
    {/*<div className={`bg-${theme}`}></div>*/}
    //console.log('OUR MISSION === heading ===', heading);
    //console.log('OUR MISSION === image ===', image);
    //const { scrollYProgress } = useScroll();

    /*const introHeaderVariants = {
      hide: {
          opacity: 0,
          x: -500,
      },
      show: {
          opacity: 1,
          x: 200,
          transition: {
              duration: 5,
          },
      },
    };*/

    const {ref, inView} = useInView({
      threshold: 0.25
    });

    const animationLeft = useAnimation();
    const animationRight = useAnimation();

    useEffect(() => {
      if(inView){
        animationRight.start({
          x: 0,
          opacity: 1,
          transition: {
            type: 'spring', duration: 5/*, bounce: 0.3*/
          },
          
        });
        animationLeft.start({
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring', duration: 5/*, bounce: 0.3*/
          },
        /*initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1 },
          viewport: { once: true }*/
        });
      }
      if(!inView){
        animationRight.start({x: '-10vw', opacity: 0});
        animationLeft.start({y: '-10vw', opacity: 0})
      }
      console.log('use effect hook, in View = ', inView);
    }, [inView, animationLeft, animationRight]);

    return (
        <div ref={ref} className={styles.missionWrapper} >
          <motion.div className={styles.half}                      
                       //initial={{ opacity: 0, y: 30 }}
                       //whileInView={{ opacity: 1 }}
                       //viewport={{ once: true }}
                       //animate={{ transform: 'translateY(-200px) translateY(200px)' }}
                       //transition={{ type: "spring", duration: 8/*, stiffness: 100*/ }}

                       /*animate={{ x: [-200, 0], opacity: 1, delay: 0.3, scale: 1 }}
                        transition={{
                            duration: 3,
                            delay: 0.3,
                            //ease: [0.5, 0.71, 1, 1.5],
                        }}*/
                        //initial={{ opacity: 0, scale: 1 }}
                       
                       /*initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        exit={{opacity: 0}}
                        variants={introHeaderVariants}*/
                      style={{ /*scaleX: scrollYProgress*/ }}
                      animate={animationLeft}
                  >
            {heading && <h1 className={styles.missionTitle}>{heading}</h1>}
            
            <div>
              {content && <span className={`block text-white`}>{content}</span>}
            </div>
            <div className={styles.button}><Button link={`pages/about-us`}>{t('home:our-mission-label-btn')}</Button></div>
          </motion.div>
          <div className={styles.half}>
            {showLogo && <motion.div className=""
                                      //whileInView={{ opacity: 1 }}
                                      //viewport={{ once: true }}
                                      //animate={{ transform: 'translateY(-200px) translateY(200px)' }}
                                      //transition={{ type: "spring", duration: 8/*, stiffness: 100*/ }}

                                      /*animate={{ y: [200, 0], opacity: 1, scale: 1 }}
                                      transition={{
                                          duration: 3,
                                          delay: 0.3,
                                          //ease: [0.5, 0.71, 1, 1.5],
                                      }}*/
                                      //</div></div>initial={{ opacity: 0, scale: 1 }}
                                      animate={animationRight}
                                      >
                            <Image image={image} />
                          </motion.div>}
          </div>
        </div>   
    );
  };
  
  export default OurMission;