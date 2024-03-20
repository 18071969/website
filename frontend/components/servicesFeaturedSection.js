//import Card from "./card";
import Link from "next/link";
import Image from "./image";
import Button from "./ui/button"; 
//import styles from './servicesSection.module.scss'; 
import styles from './servicesFeaturedSection.module.scss';

import { useRef } from "react";
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { slideLeft } from "../lib/animation";

const ServicesFeaturedSection = ( props ) => {

    //console.log('SERVICES-FEATURED SECTION props ))))))))))))))))))))))  ', props);
    //console.log('SERVICES-FEATURED SECTION LOCALE ))))))))))))))))))))))  ', props.locale);  
    //console.log('SERVICES-FEATURED SECTION DEFAULT-LOCALE ))))))))))))))))))))))  ', props.defaultLocale);
    const locale = props.locale;
    const defaultLocale = props.defaultLocale;
    const articles = props.articles;
    const sectionTitle = props.title;
    //console.log('SERVICES-FEATURED SECTION articles ))))))))))))))))))))))  ', articles);
    let slug, name = ''; 
    let coverImg = null;
    //console.log('SERVICES-FEATURED SECTION articles ))))))))))))))))))))))  ', articles);
    //{/*viewport={{ root: targetRef }}*/} 
    const targetRef = useRef(null); 
    const {ref, inView} = useInView({
      threshold: 0.25
    });
    //console.log('SERVICES-FEATURED SECTION articles ))))))))))))))))))))))  ref = ', ref);
    const { scrollYProgress } = useScroll({
      target: ref, //targetRef,
      offset: ["end end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    /*const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const position = useTransform(scrollYProgress, (pos) => {
      return pos === 1 ? "relative" : "fixed";
    });*/

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
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true }
        });
        animationLeft.start({
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring', duration: 5/*, bounce: 0.3*/
          },
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true }
        });
      }
      if(!inView){
        animationRight.start({x: '-10vw', opacity: 0});
        animationLeft.start({y: '-10vw', opacity: 0})
      }
      //console.log('use effect hook, in View = ', inView);
    }, [inView, animationLeft, animationRight]);

    return (
      
      <motion.div ref={ref} style={{/*opacity*/}} className={styles.servicesWrapper} >

          <motion.div className={styles.oneThird} style={{/*scale, x:'-50%', position*/}}
                      animate={animationLeft}
                      >
            <h1 className={styles.servicesTitle}>{sectionTitle}</h1>


            {/*<div className={styles.button}><Button link={`services/`}>All Services</Button></div>*/}
          </motion.div>
          <motion.div className={styles.twoThird} 
            //initial={{ x: "100vw", opacity: 0 }} 
            //animate={{ x: 0, opacity: 1 }} 
            animate={animationRight}
            //transition={{ ease: "easeOut", duration: 3, bounce: 0.3, type: 'spring' }}
            >
            
          {articles.map((article) => {
              //console.log('SERVICES-FEATURED SECTION  article.attributes ))))))))))))))))))))))  ', article.attributes);
 
                //const {name, slug} = article.attributes;
                name = article.attributes.name;
                slug = article.attributes.slug;
                coverImg = article.attributes.coverImg;

              //console.log('SERVICES-FEATURED SECTION  coverImg ))))))))))))))))))))))(((((((((((((((())))))))))))))))  ',coverImg);
              //console.log('SERVICES-FEATURED SECTION SLUG ))))))))))))))))))))))(((((((((((((((())))))))))))))))  ', slug);
          return (
            <Link key={`article_${article.id}`} href={`services/${slug}`} className={styles.singleServ} animate={animationRight}>
              <h2>{name}</h2>
              <Image image={coverImg} />
            </Link>
          );
        }
        )}
        </motion.div>
      </motion.div>
       
    );
}

export default ServicesFeaturedSection;