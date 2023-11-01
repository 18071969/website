import App from "next/app";
import Head from "next/head";
import Layout from "../components/layout";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";

import "../styles/globals.scss";
import variables from '../styles/globals.scss'
import { AnimatePresence } from 'framer-motion';

import { appWithTranslation } from 'next-i18next'

import nextI18NextConfig from '../next-i18next.config.js'
import ScrollToTopButton from "../components/ScrollToTopButton";

export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { global, menusPl, footerMenu, compInfo } = pageProps;
  
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
  return { ...appProps, locale, defaultLocale, pageProps: { global: globalRes.data, /*menus: menusRes.data,*/ menusPl: main_menu_items, footerMenu: footer_menu_items, compInfo: companyInfo.data } };
};

export default appWithTranslation(MyApp , nextI18NextConfig)
//export default MyApp
