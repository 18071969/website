import React from "react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../pages/_app";
import { useRouter } from 'next/router';
import { formatSlug, getSlug, getLocalizedPaths, getSlashInPath } from '../lib/localize-helpers';
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import Image from "./image";
import NavigationMenuDemo from "./test";
import LanguageSwitcher from "./languageSwitcher";
import { fetchAPI } from "../lib/api";
import classes from './nav.module.scss';


const Nav = ({ menus, pageContext }) => {

  const router = useRouter();
  const { locale, locales, defaultLocale, asPath } = router;
  
  const getCollection = () => {
    // for route diferent from [[...slug]]
    let test_str = router.asPath;
    let collection = '';
    
    if (router.pathname.localeCompare('/[[...slug]]') === 0) {
      return collection;
    } else {
      let start_pos = test_str.indexOf('/') + 1;
      let end_pos = test_str.indexOf('/',start_pos);
      (end_pos !== -1) ? collection = test_str.substring(start_pos,end_pos) : collection = test_str.substring(start_pos);
    }
    return collection;
  }

  async function getLocalizations() { 
   
    let locale = router.locale;
    let slug = getSlug(router.asPath).toString();
    let collection = getCollection();
    collection === 'news' ? collection = 'posts' : collection;

    const articlesRes = await fetchAPI("/"+collection+"?locale="+locale+"&filters[slug]="+slug+"&populate[0]=localizations", {   
    });
    
    if (!articlesRes) {
      return {
        notFound: true,
      }
    } 

    let paths, localizations = [];
    if(articlesRes.data.length === 0) {
      locales.map(loc =>{
        let path = formatSlug(collection, loc, defaultLocale);
        paths.push(path);
      })
      localizations.push.paths;
      
    } else localizations = await articlesRes.data[0].attributes.localizations.data;
    
    return localizations;
  }

  async function getLocalizationsDynPage() { 

    let locale = router.locale;
    let slug = getSlug(router.asPath).toString();
    let collection = 'pages'; 

    let slug_query = slug ? "filters[slug][$eq]="+slug : "filters[slug][$null]=true";
    const articlesRes = await fetchAPI("/"+collection+"?locale="+locale+"&"+slug_query+"&populate[0]=localizations", {  
    });
    
    if (!articlesRes) {
      return {
        notFound: true,
      }
    } 
    
    let paths, localizations = [];
    if(articlesRes.data.length === 0) {
      locales.map(loc =>{
        let path = formatSlug(collection, loc, defaultLocale);
        paths.push(path);
      })
      localizations.push.paths;
      
    } else {
      console.log('NAV COMPONENT getLocalizationsDynPage ELSE if(articlesRes.data.length === 0) ');
      localizations = await articlesRes.data[0].attributes.localizations.data;
    }
    
    return localizations;
  }

  const [localizations, setLocalizations] = useState([]);
  const [localizedPaths, setlocalizedPaths] = useState([]);

  useEffect(() => {
    let localizedPaths = [];
    let localizations = (async() => {
      if(getSlashInPath(router.asPath) > 1){
        const localizations3 = await getLocalizations(); 
        setLocalizations(localizations3);
      } else {
        if (router.pathname.localeCompare('/[[...slug]]') === 0) { // if collection === 'pages'
          const localizations_pages = await getLocalizationsDynPage(); 
          setLocalizations(localizations_pages);
        } else {
          setLocalizations([]);
        }             
      }
    })();

    if(getSlashInPath(router.asPath) > 1) {
      //console.log(' > 1');
    } else { 
      //console.log(' <= 1');
      let collection = getCollection();
      
      if (collection.trim() != "") {
        //console.log(' Collection type - SERVICES '); 
        locales.map(loc =>{
          let path = formatSlug(collection, loc, defaultLocale);
          localizedPaths.push({ locale: loc, href: path });   
        })
      } else {
        //console.log(' Single type - ABOUT US ');      
        locales.map(async (loc) =>{
          let path = formatSlug('', loc, defaultLocale);
          localizedPaths.push({ locale: loc, href: path });
        })
      }
      setlocalizedPaths(localizedPaths);
    };
      
  }, [locale, router, pageContext]);

  let page = pageContext
      ? pageContext
      : {
          locale, // current locale
          locales, // locales provided by next.config.js
          defaultLocale, // en = defaultLocale
          slug: getSlug(router.asPath).toString(),
          localizations: localizations,   
          localizedPaths: localizedPaths,     
        };
  
  if(getSlashInPath(router.asPath) > 1) { // For sub-services
    const localizedPaths = getLocalizedPaths({ ...page }).map((path) => {           
      let arr = path.href.split('');  
      const index = arr.lastIndexOf('/') + 1; 
      let collection = getCollection();
      if(router.asPath.replace(/[^/]/g, "").length > 1) arr.splice(index, 0, ''+collection+'/').join('');
      path.href = arr.join('');   
      return path;
    }); 
    page = {
      ...page,
      localizedPaths,
    };
  } else if (router.pathname.localeCompare('/[[...slug]]') === 0) { // For dynamic page
    const localizedPaths = getLocalizedPaths({ ...page }).map((path) => {
      return path;
    });
    page = {
      ...page,
      localizedPaths,
    };
  }
        
  const { Favicon } = useContext(GlobalContext);
  
  return (
    <nav className={`${classes.navbarContainer} ${classes.navbar}`}>
      <div className={classes.navbarLeft}>
        <ul className={classes.navbarNav}>
          <li>
            <Link href="/"><Image image={Favicon} /></Link>
          </li>
        </ul>
      </div>
      <div className={classes.navbarRight}>
        {/*<MenuLink menus={menus} />*/}
        <NavigationMenuDemo menus={menus} locale={locale}/>
        <LanguageSwitcher pageContext={page}  />
      </div>
    </nav>    
  );
};

export default Nav;
