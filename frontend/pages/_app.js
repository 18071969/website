//import '../styles/globals.scss'
/*
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}*/
import App from "next/app";
import Head from "next/head";
import Layout from "../components/layout";
import Nav from "../components/nav";
//import Seo from "../components/seo";
import Footer from "../components/footer";
//import "../assets/css/style.css";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";

import "../styles/globals.scss";
import variables from '../styles/globals.scss'
import { AnimatePresence } from 'framer-motion';

import { appWithTranslation } from 'next-i18next'
//import nextI18NextConfig from '../next.config.js'
import nextI18NextConfig from '../next-i18next.config.js'
import ScrollToTopButton from "../components/ScrollToTopButton";

import { useRouter } from 'next/router';

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { global, menusPl, footerMenu, compInfo } = pageProps;
  
  console.log(' _app.js const MyApp Component ----------------------------- ', Component);

  //console.log('GLOBAL _app.js -----global------ ', global);
  //console.log('GLOBAL _app.js -----global.attributes.Favicon------ ', global.attributes.Favicon);
  /*console.log('pageProps _app.js pageProps HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHhh pageProps ', pageProps);
  console.log('seo _app.js seo HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHhh pageProps.page?.attributes.SEO ', pageProps.page?.attributes.SEO);
  console.log('seo _app.js seo HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHhh pageProps.page?.attributes.SEO ', pageProps.page?.attributes.SEO);
  //console.log('MENUS _app.js menus WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW menusPl ', menusPl);
  const imageUrl = getStrapiMedia(global.attributes.Favicon);
  //console.log('GLOBAL _app.js -----imageUrl------ ', imageUrl);
  const seoData = pageProps.homepage ? pageProps.homepage.attributes.SEO : pageProps.page?.attributes.SEO;
  console.log('_app.js seoData HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHhh seoData ', seoData);
  const {metaTitle, metaDescription, shareImage} = seoData;
  const seo = {
    metaTitle: metaTitle,
    metaDescription: metaDescription,
    shareImage: shareImage,
    page: true,
  };*/

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.Favicon)}
        />
      </Head>
      <GlobalContext.Provider value={global.attributes}>
        {/*<Seo seo={seo} /> */}
        <AnimatePresence mode="wait" initial={true}>
          <Layout pageContext>
             <Nav menus={menusPl} />{/**/}
            <main><Component {...pageProps} /></main>
            <Footer fmenus={footerMenu} cInfo={compInfo} />
          </Layout>
        </AnimatePresence>
      </GlobalContext.Provider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx/*, Component*/) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  
  const { ctx: { locale, defaultLocale } } = ctx;
  console.log(' _app.js ctx:LOCALE ----------------------------- ', locale);
  console.log(' _app.js ctx:defaultLocale ----------------------------- ', defaultLocale);
  //console.log(' _app.js ctx MyApp.getInitialProps ----------------------------- ', ctx);
  console.log(' _app.js ctx.pathname ----------------------------- ', ctx.pathname);
  console.log(' _app.js ctx.query ----------------------------- ', ctx.query);
  console.log(' _app.js appProps 1 ----------------------------- ', appProps);

  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      Favicon: "*",
      DefaultSeo: {
        populate: "*",
      },
    },
  });

  const companyInfo = await fetchAPI("/company-info", {
    populate: "*",
  });

  const footer = await fetchAPI("/footer", {
    populate: "*",
  });
  /*
  const menusRes = await fetchAPI("/main-menu", { 
    populate: {
      MenuTab: { populate: "*" },
      SubMenuItem: { populate: {
        page: { populate: "*" },
      },
    } },
  });

  const menusPlRes = await fetchAPI("/menus", { 
    nested: { populate: "*" },
    populate: {
      //items: { populate: "*" },
      items: { populate: {
        children: { populate: "*" },
      },
    } },
  });*/
  //console.log('MENUS  _app.js menusPlRes.data ----------------------------- ', menusPlRes.data);
  let qstr = '';
  if (locale==='en') qstr = '1'; else if (locale==='bg') qstr = '3'; else if (locale==='ru') qstr = '4';
  console.log('MENUS  _app.js /menus/'+qstr+'         locale === '+locale);
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
  //console.log('MENUS  _app.js mainMenu.data ----------------------------- ', mainMenu.data);
  let main_menu_items = [];
  main_menu_items = mainMenu.data.attributes.items.data;
  
  const footerMenu = await fetchAPI("/menus/2", { 
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
  //console.log('MENUS FOOTER _app.js footerMenu.data ----------------------------- ', footerMenu.data);
  let footer_menu_items = [];
  footer_menu_items = footerMenu.data.attributes.items.data;
  //console.log('MENUS FOOTER _app.js footer_menu_items  ----------------------------- ', footer_menu_items );

  //console.log(' _app.js ctx ----------------------------- ', ctx);
  console.log(' _app.js appProps 2 ----------------------------- ', appProps);

  // Pass the data to our page via props
  return { ...appProps, locale, defaultLocale, pageProps: { global: globalRes.data, /*menus: menusRes.data,*/ menusPl: main_menu_items, footerMenu: footer_menu_items, compInfo: companyInfo.data } };
};

export default appWithTranslation(MyApp , nextI18NextConfig /**/)
//export default MyApp
