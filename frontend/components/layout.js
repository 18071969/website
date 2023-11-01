import styles from "./layout.module.scss";
import { motion } from "framer-motion";
//import LayoutGoTop from "../pages/navigation/LayoutGoTop";

const Layout = ({ children, seo, pageContext }) => {

  return (
  <motion.div 
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
    className={styles.layout}>   
      {children}
   
  </motion.div>
  )
};

export default Layout;
