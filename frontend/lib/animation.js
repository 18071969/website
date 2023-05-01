function FadeInWhenVisible({ children }) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        variants={{
          visible: { opacity: 1, scale: 1 },
          hidden: { opacity: 0, scale: 0 }
        }}
      >
        {children}
      </motion.div>
    );
  }
  export default FadeInWhenVisible;


{/*}
https://stackoverflow.com/questions/58958972/framer-motion-animate-when-element-is-in-view-when-you-scroll-to-element?noredirect=1&lq=1
  Usage:
<FadeInWhenVisible>
  <Box />
</FadeInWhenVisible>*/}

/**
 * @param {boolean} cont default: true
 * @param {boolean} exit default: true
 * @param {string} customVal default: %
 * @return {import("framer-motion").MotionProps}
 */
export const slideLeft = (cont = true, exit = true, customVal = "%") => {
    /**
     * @type {import("framer-motion").MotionProps}
     */
    const output = {
        initial: {
            x: `100${customVal}`,
        },
        animate: {
            x: 0,
        },
        exit: {
            x: `-100${customVal}`,
        },
    };
    if (!cont) output.exit = { x: `100${customVal}` };
    if (!exit) delete output.exit;
    return output;
};
//export default slideLeft;

{/*}
https://stackoverflow.com/questions/71947984/framer-motion-whileinview-not-animating-correctly-on-mobile?rq=1
  Usage:
<motion.div
    variants={slideLeft(false)}
    initial="initial"
    whileInView="animate"
    exit="exit"
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
></motion.div>*/}