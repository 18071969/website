import React from "react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../pages/_app";
import { useRouter } from 'next/router';
import { formatSlug, getSlug, getLocalizedPaths } from '../lib/localize-helpers';
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
  async function getArticlesRes () { 
    //const router = useRouter();
    let locale = router.locale;
    let slug = getSlug(router.asPath).toString();
    console.log("NAV COMPONENT getArticlesRes query/services?locale="+locale+"&filters[slug]="+slug+"&populate[0]=coverImg"+"&populate[1]=tags"+"&populate[2]=localizations");
    const articlesRes = await fetchAPI("/services?locale="+locale+"&filters[slug]="+slug+"&populate[0]=coverImg"+"&populate[1]=tags"+"&populate[2]=localizations", {
  
    });
    
    if (!articlesRes) {
      console.log('NAV COMPONENT PAGE getArticlesRes ===  if (!articlesRes) ');
      return {
        notFound: true,
      }
    } 
    console.log('NAV COMPONENT getArticlesRes articlesRes  BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ', articlesRes);
    let localizations = await articlesRes.data[0].attributes.localizations.data;
    console.log('NAV COMPONENT getArticlesRes articlesRes  BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB localizations === ', localizations);
    
    return localizations;
  }
  
/*
const localizations2 = getArticlesRes().then(function(result) {
  //console.log('NAV COMPONENT getArticlesRes localizations2 RESULT === ', result);
  //alert('Resolved');
  return result;
}).then(function(data) {
  //console.log('NAV COMPONENT getArticlesRes localizations2 DATA === ', data);
  const items = data;
  //console.log('NAV COMPONENT getArticlesRes localizations2 ITEMS === ', items);
  //var userid = JSON.parse(data);
  //console.log(userid);
  return items;
}).catch(function(error) {
  //alert('Rejected');
  //console.log('NAV COMPONENT getArticlesRes localizations2 error === ', error);
}).finally(function(result) {
  //alert('Settled');
  //console.log('NAV COMPONENT getArticlesRes localizations2 FINALY ================= ', result);
  //return steps;
})*/

const [localizations, setLocalizations] = useState([]);

useEffect(() => {
  console.log('NAV COMPONENT USE EFFECT START localizations === ');
  let localizations = (async() => {
    const localizations3 = await getArticlesRes(); 
    //console.log('NAV COMPONENT localizations3 === ', localizations3);
    setLocalizations(localizations3);
    //return localizations3;
  })();
  console.log('NAV COMPONENT USE EFFECT localizations === ', localizations);
}, [locale, router, pageContext]);

let page = pageContext
      ? pageContext
      : {
            // if there is no pageContext because it is SSR page or non-CMS page
            // the following is from useRouter and is used for non-translated, non-localized routes
            locale, // current locale
            locales, // locales provided by next.config.js
            defaultLocale, // en = defaultLocale
            //slug: formatSlug(asPath.slice(1), locale, defaultLocale), // slice(1) because asPath includes /
            slug: getSlug(router.asPath).toString(),
            /*localizations: getArticlesRes().then(function(result) {
              return result;
            }),
            localizations: getArticlesRes().then((res)=>console.log(res)),*/
            //localizations2: localizations2.then((res)=>{return(res)}).then((data)=>{const items = data; return(items)}),/**/
            localizations: localizations,
            /*localizations3: (async() => {
              const localizations3 = await getArticlesRes().then((res)=>{return(res)}).then((data)=>{const items = data; return(items)}); // This is async.
              return localizations3 + 1;
            })(),

            localizations4: (async () => {
              const result = await Promise.resolve(getArticlesRes().then((res)=>{return(res)}).then((data)=>{const items = data; return(items)}))
              //console.log('??????????????????????????????????????????????????????? localizations4 RESULT = ', result,'Promise === ',  result.Promise.map(a => {console.log(a)}))
              //result.Promise.PromiseResult.map(a => {console.log('??????????????????????????????????????????????????????? localizations4 RESULT PromiseResult = ', a); return a})
              return result
            })(),*/
            /*localizedPaths: locales.map((loc) => ({
                // creates an array of non-translated routes such as /normal-page /es/normal-page /de/normal-page. Will make more sense when we implement the LocaleSwitcher Component
                locale: loc,
                href: formatSlug(asPath.slice(1), loc, defaultLocale),
            })),*/
        
        };
        console.log('NAV COMPONENT PAGE SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS === ', page);      
        const localizedPaths = getLocalizedPaths({ ...page }).map((path) => {
          let arr = path.href.split('');  
          const index = arr.lastIndexOf('/') + 1; 
          arr.splice(index, 0, 'services/').join('');    
          path.href = arr.join('');   
          return path;
        }); 
        
        page = {
          ...page,
          localizedPaths,
        };
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
        <NavigationMenuDemo menus={menus} />
        <LanguageSwitcher pageContext={page} />
      </div>
    </nav>    
  );
};

export default Nav;
