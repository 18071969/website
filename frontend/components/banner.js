import Button from "./ui/button";
import { motion } from "framer-motion";

import styles from "./banner.module.scss";

function Banner(props) {
  //console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% styles.banner', styles.banner);
  return (
    <>
      <style global jsx>{`
        .backgr {
          @include background("${props.imageUrl}");
        }
        .bckgr {
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url("${props.imageUrl}");
        }
      `}</style>
      <div id="banner" className={`${styles.banner} bckgr`}> 
        
        <motion.div 
          initial="hidden" animate="visible" variants={{
            hidden: {
              scale: .8,
              opacity: 0
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: .4
              }
            },
          }}
          className={styles.slogan}>
          <motion.h1
            animate={{ x: [50, 150, 50], opacity: 1, scale: 1 }}
            transition={{
                duration: 5,
                delay: 0.3,
                ease: [0.5, 0.71, 1, 1.5],
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.2 }}>{props.slogan}</motion.h1>
        </motion.div>
        
        <div className={styles.btns}>
          {props.buttons && props.buttons.map((button) => (
            <div className={styles.btn}> 
              <Button link={button.url}>{button.label}</Button>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default Banner;
