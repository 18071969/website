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
  console.log('NAV COMPONENT POUTER === ', router);
  console.log('NAV COMPONENT PAGE-CONTEXT   BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', pageContext);
  //getLocalizedPaths

  const getCollection = () => {
    
    let test_str = router.asPath;
    let collection = '';
    let start_pos = test_str.indexOf('/') + 1;
    let end_pos = test_str.indexOf('/',start_pos);
    console.log("NAV COMPONENT getCollection start_pos === ", start_pos);
    console.log("NAV COMPONENT getCollection end_pos === ", end_pos);
    console.log("NAV COMPONENT getCollection test_str.substring(start_pos) === ", test_str.substring(start_pos));
    (end_pos !== -1) ? collection = test_str.substring(start_pos,end_pos) : collection = test_str.substring(start_pos);
    return collection;
  }

  async function getLocalizations() { 
    //const router = useRouter();
    let locale = router.locale;
    let slug = getSlug(router.asPath).toString();
    console.log("NAV COMPONENT getLocalizations SLUG === ", slug);
    let collection = getCollection();

    //console.log("NAV COMPONENT getLocalizations query/"+collection+"?locale="+locale+"&filters[slug]="+slug+"&populate[0]=localizations");
    //console.log("NAV COMPONENT getLocalizations query/services?locale="+locale+"&filters[slug]="+slug+"&populate[0]=coverImg"+"&populate[1]=tags"+"&populate[2]=localizations");
    console.log("NAV COMPONENT getLocalizations COLLECTION === ", collection);
    console.log("NAV COMPONENT getLocalizations QUERY === "+ "/"+collection+"?locale="+locale+"&filters[slug]="+slug+"&populate[0]=localizations");
    console.log("NAV COMPONENT getLocalizations QUERY333 === /services-page?locale="+locale+"&filters[slug]="+slug+"&populate[0]=localizations");
    const articlesRes = await fetchAPI("/"+collection+"?locale="+locale+"&filters[slug]="+slug+"&populate[0]=localizations", {
    
    });
    
    if (!articlesRes) {
      console.log('NAV COMPONENT PAGE getLocalizations ===  if (!articlesRes) ');
      return {
        notFound: true,
      }
    } 
    console.log('NAV COMPONENT getLocalizations articlesRes  BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', articlesRes);
    console.log('NAV COMPONENT getLocalizations articlesRes  LENGHT BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', articlesRes.data.length);
    console.log('NAV COMPONENT getLocalizations articlesRes  articlesRes.data BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', articlesRes.data);
    let paths, localizations = [];
    if(articlesRes.data.length === 0) {
      locales.map(loc =>{
        let path = formatSlug(collection, loc, defaultLocale);
        console.log('NAV COMPONENT getLocalizations articlesRes  formatSlug(collection, loc, defaultLocale) BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', formatSlug(collection, loc, defaultLocale));
        paths.push(path);
      })
      localizations.push.paths;
      console.log('NAV COMPONENT getLocalizations articlesRes  paths 111 BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', paths);
      //localizations = await articlesRes.data.attributes.localizations.data;

    } else localizations = await articlesRes.data[0].attributes.localizations.data;
    console.log('NAV COMPONENT getLocalizations articlesRes  BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB localizations === ', localizations);
    
    return localizations;
  }

  const [localizations, setLocalizations] = useState([]);
  const [localizedPaths, setlocalizedPaths] = useState([]);
  //const [localeMenu, setLocaleMenu] = useState([]);

  useEffect(() => {
    console.log('NAV COMPONENT USE EFFECT START localizations === ');
    let localizations = (async() => {
      if(getSlashInPath(router.asPath) > 1){
        const localizations3 = await getLocalizations(); 
        //console.log('NAV COMPONENT localizations3 === ', localizations3);
        setLocalizations(localizations3);
      } else {
        setLocalizations([]);
        
      }
    })();
      let localizedPaths = [];
      if(getSlashInPath(router.asPath) > 1) {
        setlocalizedPaths(localizedPaths);
      } else { 
        let collection = getCollection();
        locales.map(loc =>{
          console.log('NAV COMPONENT USE EFFECT =============  LOC ===  ', loc);
          let path = formatSlug(collection, loc, defaultLocale);
          console.log('NAV COMPONENT USE EFFECT =============  formatSlug(collection, loc, defaultLocale)', path);
          localizedPaths.push({ locale: loc, href: path });    
        })
        setlocalizedPaths(localizedPaths);
        console.log('NAV COMPONENT USE EFFECT =============  localizedPaths  ', localizedPaths);
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
        console.log('NAV COMPONENT PAGE SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS === ', page);     
        if(getSlashInPath(router.asPath) > 1) { 
          const localizedPaths = getLocalizedPaths({ ...page }).map((path) => {
            console.log('NAV COMPONENT PAGE RETURN  before PATH === ', path);
            let arr = path.href.split('');  
            const index = arr.lastIndexOf('/') + 1; 
            console.log('NAV COMPONENT PAGE SSSSSSSSSSSSSSrouter.asPath.replace === ', router.asPath.replace(/[^/]/g, "").length);  
            let collection = getCollection();
            if(router.asPath.replace(/[^/]/g, "").length > 1) arr.splice(index, 0, ''+collection+'/').join('');
            path.href = arr.join('');   
            console.log('NAV COMPONENT PAGE RETURN after PATH === ', path);
            return path;
          }); 
          page = {
            ...page,
            localizedPaths,
          };
        }
        console.log('NAV COMPONENT pageContext === ', pageContext);
        console.log('NAV COMPONENT PAGE === ', page);
        console.log('NAV COMPONENT localizedPaths === ', localizedPaths);

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
