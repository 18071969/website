import Card from "./card";
import styles from './postSelections.module.scss';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const PostsSelection = ( props ) => {
    //console.log('POSTS SECTION props ))))))))))))))))))))))  ', props);
    const {articles, heading} = props;
    //console.log('POSTS SECTION heading ))))))))))))))))))))))  ', heading);    
    //console.log('POSTS SECTION articles ))))))))))))))))))))))  ', articles);
    const {ref, inView} = useInView({
      threshold: 0.25
    });
    const animation = useAnimation();

    useEffect(() => {
      if(inView){
        animation.start({
          x: 0,
          transition: {
            type: 'spring', duration: 3, delay: 0.3, bounce: 0.3
          }
        })
      }
      if(!inView){
        animation.start({x: '-10vw'})
      }
      console.log('use effect hook, in View = ', inView);
    }, [inView, animation]);

    return (
        <div ref={ref} className={styles.wrapper}>
            <h1 className={styles.titleSection}>{heading}</h1>
            <motion.div className={styles.itemsWrapper}
                        animate={animation}>
            {articles.data && articles.data.map((article) => {
                console.log('POSTS SECTION posts_section article.attributes ))))))))))))))))))))))  ',article.attributes);
            return (
              <Card className={styles.items}
                article={article}
                key={`article_${article.id}`}
              />
            );
          })}
          </motion.div>
        </div>
    );
}

export default PostsSelection;