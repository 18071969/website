//import '../styles/globals.scss'
/*
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}*/
import App from "next/app";
import Head from "next/head";
import Layout from "../components/layout";
import Footer from "../components/footer";
//import "../assets/css/style.css";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";

import "../styles/globals.scss";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
const { global, menusPl, footerMenu, compInfo } = pageProps;
  //console.log('GLOBAL _app.js -----global------ ', global);
  //console.log('GLOBAL _app.js -----global.attributes.Favicon------ ', global.attributes.Favicon);
  //console.log('MENUS _app.js menus HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHhh pageProps ', pageProps);
  //console.log('MENUS _app.js menus WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW menusPl ', menusPl);
  const imageUrl = getStrapiMedia(global.attributes.Favicon);
  //console.log('GLOBAL _app.js -----imageUrl------ ', imageUrl);
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.Favicon)}
        />
      </Head>
      <GlobalContext.Provider value={global.attributes}>
        <Layout menus={menusPl}>
          <Component {...pageProps} />
          <Footer fmenus={footerMenu} cInfo={compInfo} />
        </Layout>
      </GlobalContext.Provider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
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
  const mainMenu = await fetchAPI("/menus/1", { 
    nested: { populate: "*" },
    populate: {
      //items: { populate: "*" },
      items: { populate: {
        children: { populate: "*" },
      },
    } },
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

  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data, /*menus: menusRes.data,*/ menusPl: main_menu_items, footerMenu: footer_menu_items, compInfo: companyInfo.data } };
};

export default MyApp
