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
//import MenuLink from "./MenuLink";
import classes from './nav.module.scss';


const Nav = ({ menus, pageContext }) => {

  const router = useRouter();
  const { locale, locales, defaultLocale, asPath } = router;
  //console.log('NAV COMPONENT POUTER === ', router);
  //console.log('NAV COMPONENT PAGE-CONTEXT   BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', pageContext);
  //getLocalizedPaths

  const getCollection = () => {
    // for route diferent from [[...slug]]
    let test_str = router.asPath;
    let collection = '';
    //console.log("NAV COMPONENT getCollection router.pathname.localeCompare('/[[...slug]]') === ", router.pathname.localeCompare('/[[...slug]]'));
    //console.log("NAV COMPONENT getCollection !router.pathname.localeCompare('/[[...slug]]') === ", !router.pathname.localeCompare('/[[...slug]]'));

    if (router.pathname.localeCompare('/[[...slug]]') === 0) {
      //console.log("NAV COMPONENT if (router.pathname.localeCompare('/[[...slug]]') === 0) collection === ", collection, "router.pathname.localeCompare('/[[...slug]]')", router.pathname.localeCompare('/[[...slug]]'));
      return collection;
    } else {
      let start_pos = test_str.indexOf('/') + 1;
      let end_pos = test_str.indexOf('/',start_pos);
      //console.log("NAV COMPONENT getCollection start_pos === ", start_pos);
      //console.log("NAV COMPONENT getCollection end_pos === ", end_pos);
      //.log("NAV COMPONENT getCollection test_str.substring(start_pos) === ", test_str.substring(start_pos));
      (end_pos !== -1) ? collection = test_str.substring(start_pos,end_pos) : collection = test_str.substring(start_pos);
    }
    return collection;
  }

  async function getLocalizations() { 
    //const router = useRouter();
    let locale = router.locale;
    let slug = getSlug(router.asPath).toString();
    //console.log("NAV COMPONENT getLocalizations SLUG === ", slug);
    let collection = getCollection();

    //console.log("NAV COMPONENT getLocalizations query/"+collection+"?locale="+locale+"&filters[slug]="+slug+"&populate[0]=localizations");
    //console.log("NAV COMPONENT getLocalizations query/services?locale="+locale+"&filters[slug]="+slug+"&populate[0]=coverImg"+"&populate[1]=tags"+"&populate[2]=localizations");
    //console.log("NAV COMPONENT getLocalizations COLLECTION === ", collection);
    //console.log("NAV COMPONENT getLocalizations QUERY === "+ "/"+collection+"?locale="+locale+"&filters[slug]="+slug+"&populate[0]=localizations");
    //console.log("NAV COMPONENT getLocalizations QUERY333 === /services-page?locale="+locale+"&filters[slug]="+slug+"&populate[0]=localizations");
    const articlesRes = await fetchAPI("/"+collection+"?locale="+locale+"&filters[slug]="+slug+"&populate[0]=localizations", {
    
    });
    
    if (!articlesRes) {
      //console.log('NAV COMPONENT PAGE getLocalizations ===  if (!articlesRes) ');
      return {
        notFound: true,
      }
    } 
    //console.log('NAV COMPONENT getLocalizations articlesRes  BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', articlesRes);
    //console.log('NAV COMPONENT getLocalizations articlesRes  LENGHT BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', articlesRes.data.length);
    //console.log('NAV COMPONENT getLocalizations articlesRes  articlesRes.data BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', articlesRes.data);
    let paths, localizations = [];
    if(articlesRes.data.length === 0) {
      locales.map(loc =>{
        let path = formatSlug(collection, loc, defaultLocale);
        //console.log('NAV COMPONENT getLocalizations articlesRes  formatSlug(collection, loc, defaultLocale) BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', formatSlug(collection, loc, defaultLocale));
        paths.push(path);
      })
      localizations.push.paths;
      //console.log('NAV COMPONENT getLocalizations articlesRes  paths 111 BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', paths);
      //localizations = await articlesRes.data.attributes.localizations.data;

    } else localizations = await articlesRes.data[0].attributes.localizations.data;
    //console.log('NAV COMPONENT getLocalizations articlesRes  BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB localizations === ', localizations);
    
    return localizations;
  }

  async function getLocalizationsDynPage() { 

    let locale = router.locale;
    let slug = getSlug(router.asPath).toString();
    //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6666NAV COMPONENT getLocalizationsDynPage SLUG === ", slug, 'router.asPath === ', router.asPath);
    let collection = 'pages'; //getCollection();

    let slug_query = slug ? "filters[slug][$eq]="+slug : "filters[slug][$null]=true";
    //console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6666NAV COMPONENT getLocalizationsDynPage SLUG slug_query === ', slug_query);

    //console.log("NAV COMPONENT getLocalizationsDynPage QUERY === " + "/"+collection+"?locale="+locale+"&filters[slug]="+slug+"&populate[0]=localizations");
    const articlesRes = await fetchAPI("/"+collection+"?locale="+locale+"&"+slug_query+"&populate[0]=localizations", {
    
    });
    
    if (!articlesRes) {
      //console.log('NAV COMPONENT PAGE getLocalizationsDynPage ===  if (!articlesRes) ');
      return {
        notFound: true,
      }
    } 
    //.log('NAV COMPONENT getLocalizationsDynPage articlesRes  BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', articlesRes);
    //console.log('NAV COMPONENT getLocalizationsDynPage articlesRes  LENGHT BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', articlesRes.data.length);
    //console.log('NAV COMPONENT getLocalizationsDynPage articlesRes  articlesRes.data BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', articlesRes.data);
    let paths, localizations = [];
    if(articlesRes.data.length === 0) {
      locales.map(loc =>{
        let path = formatSlug(collection, loc, defaultLocale);
        //.log('NAV COMPONENT getLocalizationsDynPage articlesRes PATH formatSlug(collection, loc, defaultLocale) BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', formatSlug(collection, loc, defaultLocale));
        paths.push(path);
      })
      localizations.push.paths;
      //console.log('NAV COMPONENT getLocalizationsDynPage articlesRes  paths 111 BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', paths);
      //localizations = await articlesRes.data.attributes.localizations.data;

    } else {
      console.log('NAV COMPONENT getLocalizationsDynPage ELSE if(articlesRes.data.length === 0) ');
      localizations = await articlesRes.data[0].attributes.localizations.data;
      //.log('NAV COMPONENT getLocalizationsDynPage articlesRes  BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB localizations ELSE if(articlesRes.data.length === 0)=== ', localizations);
    }
    //console.log('NAV COMPONENT getLocalizationsDynPage articlesRes  BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB localizations === ', localizations);
    
    return localizations;
  }

  const [localizations, setLocalizations] = useState([]);
  const [localizedPaths, setlocalizedPaths] = useState([]);

  useEffect(() => {
    let localizedPaths = [];
    //console.log('~~~~~~~~~~~~~~~~NAV COMPONENT USE EFFECT START localizations router.asPath === ', router.asPath);
    let localizations = (async() => {
      if(getSlashInPath(router.asPath) > 1){
        const localizations3 = await getLocalizations(); 
        //console.log('NAV COMPONENT UseEffect (IF getSlashInPath(router.asPath) > 1) localizations3 === ', localizations3);
        setLocalizations(localizations3);
      } else {
        //console.log('NAV COMPONENT UseEffect (ELSE getSlashInPath(router.asPath) > 1) ');
        if (router.pathname.localeCompare('/[[...slug]]') === 0) {
          // if collection === 'pages'
          const localizations555 = await getLocalizationsDynPage(); 
          //console.log('NAV COMPONENT UseEffect (router.pathname.localeCompare(/[[...slug]]) === 0) localizations555 === ', localizations555);
          setLocalizations(localizations555);
        } else {
          //console.log('NAV COMPONENT UseEffect (ELSE (router.pathname.localeCompare(/[[...slug]]) === 0) setLocalizations([]) ');
          setLocalizations([]);
        }      
        
      }
    })();

    //console.log('****', getSlashInPath(router.asPath));
    if(getSlashInPath(router.asPath) > 1) {
      //console.log('NAV COMPONENT USE EFFECT if(getSlashInPath(router.asPath) > 1)', localizedPaths);
      //console.log(' > 1');
    } else { 
      //console.log(' <= 1');
      let collection = getCollection();
      
      if (collection.trim() != "") {
        //console.log(' SERVICES ');
        locales.map(loc =>{
          //console.log('NAV COMPONENT USE EFFECT IF (collection.trim() != "") =============  LOC ===  ', loc);
          let path = formatSlug(collection, loc, defaultLocale);
          //console.log('NAV COMPONENT USE EFFECT IF (collection.trim() != "") =============  formatSlug(collection, loc, defaultLocale)', path);
          localizedPaths.push({ locale: loc, href: path });   
        })
      } else {
        //.log(' ABOUT US ');
       
        locales.map(async (loc) =>{

          let path = formatSlug('', loc, defaultLocale);
          //.log('NAV COMPONENT USE EFFECT IF (collection.trim() != "") =============  formatSlug(collection, loc, defaultLocale)', path);
          localizedPaths.push({ locale: loc, href: path });
        })
      }
      setlocalizedPaths(localizedPaths);
      //console.log('NAV COMPONENT USE EFFECT ELSE =============  ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ  localizedPaths  ', localizedPaths);
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

        //console.log('NAV COMPONENT PAGE SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS === ', page);  
        //.log('NAV COMPONENT PAGE vrouter.asPath) > 1 ', (getSlashInPath(router.asPath) > 1));    
        if(getSlashInPath(router.asPath) > 1) { // For sub-services
          const localizedPaths = getLocalizedPaths({ ...page }).map((path) => {
            //.log('NAV COMPONENT PAGE RETURN  before PATH === ', path);
            let arr = path.href.split('');  
            const index = arr.lastIndexOf('/') + 1; 
            //console.log('NAV COMPONENT PAGE SSSSSSSSSSSSSSrouter.asPath.replace === ', router.asPath.replace(/[^/]/g, "").length);  
            let collection = getCollection();
            if(router.asPath.replace(/[^/]/g, "").length > 1) arr.splice(index, 0, ''+collection+'/').join('');
            path.href = arr.join('');   
            //console.log('NAV COMPONENT PAGE RETURN after PATH === ', path);
            return path;
          }); 
          page = {
            ...page,
            localizedPaths,
          };
        } else if (router.pathname.localeCompare('/[[...slug]]') === 0) { // For dynamic page
          const localizedPaths = getLocalizedPaths({ ...page }).map((path) => {
            //console.log('NAV COMPONENT PAGE RETURN PATH Dynamic page === ', path);
            return path;
          });
          page = {
            ...page,
            localizedPaths,
          };
        }
        //.log('NAV COMPONENT pageContext === ', pageContext);
        //.log('NAV COMPONENT PAGE === ', page);
        //.log('NAV COMPONENT localizedPaths === ', localizedPaths);

  const { Favicon } = useContext(GlobalContext);
  //console.log('NAV.JS  -----Favicon------ ', Favicon);

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
