import App from "next/app";
import Head from "next/head";
import Layout from "../components/layout";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { createContext } from "react";
import { fetchAPI, setCssVar, loadCssVar, detectColorScheme, changeColor } from "../lib/api";
import { getStrapiMedia } from "../lib/media";

import "../styles/globals.scss";
import "../styles/_variables.css";
import { useState, useEffect } from "react";
import variables from '../styles/globals.scss'
import { AnimatePresence } from 'framer-motion';

import { appWithTranslation } from 'next-i18next'

import nextI18NextConfig from '../next-i18next.config.js'
import ScrollToTopButton from "../components/ScrollToTopButton";

export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { /*getVar, getSccVar,*/ cssProps, global, menusPl, footerMenu, compInfo } = pageProps;

  //console.log('_APP.JS global page props ============================ ', global);
  /*loadCssVar();
  (async() => {
    console.log('1')
    const lala = await loadCssVar()  
    //data => ({status: r.status, body: lala})
    res.status(200).send({ message: 'Success!', body: lala });
    console.log('2')
  })();*/
  ///////////////////////////////////////////////

  /////////////////////////////////////////////////
    /*.then ((response) => {
      console.log('API.JS getSccVar response ============================ ', response.json())})
    .then((data) => {
      console.log('API.JS getSccVar data ============================ ', data);
    });
    console.log('API.JS getSccVar data ============================ ', getSccVar);*/

    //const [btnClass, setBtnClass] = useState("");
    useEffect(() => {
      if (typeof document !== "undefined") {
        for (const [key, value] of Object.entries(cssProps)) {
          console.log(`${key}: ${value}`);

          if (key === 'ThemeSkin') {
            if (value === 'Dark'){
              localStorage.setItem('theme', 'dark');
              document.documentElement.setAttribute('data-theme', 'dark');
              document.documentElement.style.setProperty('--theme-skin', 'dark' , '');
            } else if (value === 'Light'){
              localStorage.setItem('theme', 'light');
              document.documentElement.setAttribute('data-theme', 'light');
              document.documentElement.style.setProperty('--theme-skin', 'light' , '');
            }
            //detectColorScheme();
            //console.log('_APP.JS, useEffect document.documentElement.getAttribute("data-theme") === ', document.documentElement.getAttribute("data-theme"));
          }
          const themeSkin = document.documentElement.getAttribute("data-theme") === 'dark' ? true : false;
          
          if (key === 'BackgroundColor') {
            console.log('VALUE === ', value);
            //const val = document.documentElement.style.setProperty(`--${variableName}`, value + suffix);
            document.documentElement.style.setProperty('--background-color', value , '');
            console.log('_APP.JS, useEffect themeSkin === ', themeSkin);
            if (themeSkin) {
              //console.log(changeColor('#EEEEEE', 2)) // lighten 2 steps
              //console.log(changeColor('#BBAC78', -4)) // darken 4 steps
              //var style = getComputedStyle(document.body);
              //document.documentElement.style.setProperty('--background-color', style.getPropertyValue('--background-color') , '');
              document.documentElement.style.setProperty('--background-color', changeColor(value, -75) , '');
              console.log('_APP.JS, useEffect themeSkin === ', themeSkin);
              console.log('_APP.JS, useEffect changeColor(value, -15) === ', changeColor(value, -15));
            }
            //console.log('_APP.JS, useEffect changeColor(value, -4) === ', changeColor(value, -4));
          }
          if (key === 'FontColor') {
            //console.log('_APP.JS useEffect FontColor VALUE === ', value);
            document.documentElement.style.setProperty('--font-color', value , '');
            //console.log('_APP.JS, useEffect --COLOR === ', value);
            if (themeSkin) {
              //console.log('_APP.JS, useEffect changeColor(value, +15) === ', changeColor(value, +15));
              document.documentElement.style.setProperty('--font-color', changeColor(value, +75) , '');
            }
          }

          if (key === 'ButtonStyling') {            
            if (value === 'Default'){
              document.documentElement.style.setProperty('--btn-style', 'btn-default' , '');             
            } else if (value === 'Slightly Rounded'){
              document.documentElement.style.setProperty('--btn-style', 'btn-slightly-round' , '');
            } else if (value === 'Slightly Rounded Shadow'){
              document.documentElement.style.setProperty('--btn-style', 'btn-slightly-round-shadow' , '');             
            } else if (value === 'Rounded'){
              document.documentElement.style.setProperty('--btn-style', 'btn-round' , '');             
            } else if (value === 'Rounded Shadow'){
              document.documentElement.style.setProperty('--btn-style', 'btn-round-shadow' , '');              
            }           
          }
          //console.log('_APP.JS useEffect document.documentElement.style.cssText=== ', document.documentElement.style.cssText);
          //console.log('_APP.JS, useEffect document.documentElement === ', document.documentElement);
        }       
        //console.log('_APP.JS, useEffect --btn-style === ', document.documentElement.style.getPropertyValue('--btn-style'));
  
      }
    }, []); //cssProps

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.Favicon)}
        />
      </Head>
      <GlobalContext.Provider value={global.attributes}>
        <AnimatePresence mode="wait" initial={true}>
          <Layout pageContext>
            <Nav menus={menusPl} />
            <main><Component {...pageProps} /></main>
            {/*<ScrollToTopButton />*/}
            <Footer fmenus={footerMenu} cInfo={compInfo} />
          </Layout>
        </AnimatePresence>
      </GlobalContext.Provider>
    </>
  );
};

MyApp.getInitialProps = async (ctx/*, Component*/) => {
 
  const appProps = await App.getInitialProps(ctx); 
  const { ctx: { locale, defaultLocale } } = ctx;
  
  //////////////////////////////////////

/*
  const getVar = async function getVar() {
    const response = await fetch("http://localhost:3000/api/css-variables");
    const variables = await response.json();
    console.log('_APP.JS getVar() variables === ', variables);
    console.log('_APP.JS getVar() variables.body.data === ', variables.body.data);
    return variables.body.data;
  }


  const getSccVar = fetch('http://localhost:3000/api/css-variables', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(function(result) {
    //console.log('_APP.JS getSccVar result ============================ ', result) 
  }).then(async (data) => {
    console.log('_APP.JS getSccVar data ============================ ', data);
  });
  console.log('_APP.JS getSccVar getSccVar ============================ ', getSccVar.result);*/
  //////////////////////////////////////

  // Fetch CSS variables from Strapi
  const getCssRes = await fetchAPI("/options-panel-general-settings-stylings", {
    populate: "*",
  }); 
  //console.log("_APP.JS getCssRes.data === ", getCssRes.data);
  const css_data = await setCssVar();
  //console.log("_APP.JS  css_data === ", css_data);

  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      Favicon: "*",
      DefaultSeo: {
        populate: "*",
      },
    },
  });

  const companyInfo = await fetchAPI("/company-info?locale="+locale+"&populate[0]=logo&populate[1]=socialLinks", {

  });
  
  /*const companyInfo2 = await fetchAPI("/company-info", {
    populate: "*",
  });*/

  const footer = await fetchAPI("/footer", {
    populate: "*",
  });
  
  let qstr = '';
  if (locale==='en') qstr = '1'; else if (locale==='bg') qstr = '3'; else if (locale==='ru') qstr = '4';
  //console.log('MENUS  _app.js /menus/'+qstr+'         locale === '+locale);
  const mainMenu = await fetchAPI("/menus/"+qstr, { 
    nested: { populate: "*" },
    populate: {
      //items: { populate: "*" },
      items: { populate: {
        children: { populate: "*" },
        },
      } 
    },
  });
 
  let main_menu_items = [];
  main_menu_items = mainMenu.data.attributes.items.data;
  
  let qstr_footer = '';
  if (locale==='en') qstr_footer = '2'; else if (locale==='bg') qstr_footer = '5'; else if (locale==='ru') qstr_footer = '6';
  const footerMenu = await fetchAPI("/menus/"+qstr_footer, { 
  //const footerMenu = await fetchAPI("/menus?filters[slug][$eq]=footer-menu", { 
    nested: { populate: "*" },
    /*populate: {
      items: { populate: "*" },
    },*/
    populate: {
      //items: { populate: "*" },
      items: { populate: {
        children: { populate: "*" },
      },
    }},
  });
  let footer_menu_items = [];
  footer_menu_items = footerMenu.data.attributes.items.data;

  // Pass the data to our page via props
  return { ...appProps, locale, defaultLocale,
    btnState: 'btn-round-shadow',
    //btnState: {btnState},
    pageProps: { cssProps: css_data, cssVar: getCssRes.data, global: globalRes.data, /*menus: menusRes.data,*/ menusPl: main_menu_items, footerMenu: footer_menu_items, compInfo: companyInfo.data } };
};

export default appWithTranslation(MyApp , nextI18NextConfig)
//export default MyApp
