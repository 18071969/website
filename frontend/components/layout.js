import styles from "./layout.module.scss";
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import { formatSlug, getLocalizedPaths } from '../lib/localize-helpers';

const Layout = ({ children, seo, pageContext }) => {
/*
  const router = useRouter();
  const { locale, locales, defaultLocale, asPath } = router;
  const page = pageContext
      ? pageContext
      : {
            // if there is no pageContext because it is SSR page or non-CMS page
            // the following is from useRouter and is used for non-translated, non-localized routes
            locale, // current locale
            locales, // locales provided by next.config.js
            defaultLocale, // en = defaultLocale
            slug: formatSlug(asPath.slice(1), locale, defaultLocale), // slice(1) because asPath includes /
            localizedPaths: locales.map((loc) => ({
                // creates an array of non-translated routes such as /normal-page /es/normal-page /de/normal-page. Will make more sense when we implement the LocaleSwitcher Component
                locale: loc,
                href: formatSlug(asPath.slice(1), loc, defaultLocale),
            })),
        };

  console.log('LAYOUT COMPONENT pageContext === ', pageContext);
  console.log('LAYOUT COMPONENT PAGE === ', page);
  
  const temp = getLocalizedPaths(page);
  console.log('LAYOUT COMPONENT getLocalizedPaths(page) === ', temp);
*/
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
