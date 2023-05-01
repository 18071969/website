import Link from "next/link";
import Image from "./image";
import Button from "./ui/button"; 
import styles from './featuredJob.module.scss';

//import EditorJS, { OutputData } from "@editorjs/editorjs";
//import { edjsHTML } from "editorjs-html"; //edjsHTML editorjs-html

import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const FeaturedJob = ( props ) => {
    //console.log('FEATURED-JOB SECTION props VVVVVVVVVVVVVVVVVVVVVV  ', props);
    const {heading, announcement, job} = props.jobData;
    //console.log('FEATURED-JOB SECTION job ))))))))))))))))))))))  ', job);    
    //console.log('FEATURED-JOB SECTION heading ))))))))))))))))))))))  ', heading);
    let desc = job.data.attributes.description;
    const slug = job.data.attributes.slug;
    //console.log('FEATURED-JOB SECTION slug ))))))))))))))))))))))  ', slug);
    const images = job.data.attributes.images;
    //console.log('FEATURED-JOB SECTION images ))))))))))))))))))))))  ', images);
    let imgStyle = { /*maxWith: 'fit-content',height:'450px'*/ maxWidth:'450px'}

    const {ref, inView} = useInView({
      threshold: 0.25
    });

    const { scrollYProgress } = useScroll({
      target: ref, //targetRef,
      //offset: ["end end", "end start"],
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
        animationRight.start({x: '10vw', opacity: 0});
        animationLeft.start({y: '10vw', opacity: 0})
      }
      console.log('use effect hook, in View = ', inView);
    }, [inView, animationLeft, animationRight]);

    /*const edjsHTML = require("editorjs-html");
    const edjsParser = edjsHTML();
    console.log('edjsParser === ', edjsParser);
    const HTML = edjsParser.parse(desc);
    // returns an error
    if(HTML instanceof Error) throw HTML;
    // in case of success, returns an array of strings
    console.log(HTML);*/

    return (
      <motion.div ref={ref} className={styles.servicesWrapper}>
        <motion.div className={styles.oneThird} animate={animationLeft}>
          <h1 className={styles.servicesTitle}>{heading}</h1>
          <h3>{announcement}</h3>
          
          <div className={styles.button}><Button link={`jobs/`}>See All Jobs</Button></div>
          {/*<Button link={button.url}>See All Jobs</Button>*/}
        </motion.div>
        <motion.div className={styles.twoThird} animate={animationRight} >
            {/*images.map(image => /*console.log('image.attributes.url ===!!! ', image.attributes.url)<Image image={image} />)*/}
                <div style={imgStyle}> <Image image={images} /></div>
                <p>{desc}</p>
                <Button link={`jobs/`+slug}>Learn More</Button>
        </motion.div>
          {/*<Link key={`job_${article.id}`} href={`job/`+slug} className={styles.singleServ}>
              <h2>{name}</h2>
              <Image image={coverImg} />
            </Link>
          {articles.map((article) => {
              //console.log('SERVICES SECTION  article.attributes ))))))))))))))))))))))  ',article.attributes);
              const {name, slug, coverImg} = article.attributes;
              //console.log('SERVICES SECTION  coverImg ))))))))))))))))))))))(((((((((((((((())))))))))))))))  ',coverImg);
          return (
            <Link key={`article_${article.id}`} href={`services/`+slug} className={styles.singleServ}>
              <h2>{name}</h2>
              <Image image={coverImg} />
            </Link>
         {/*} );
        })}*/}
      </motion.div>
    );
}

export default FeaturedJob;