import '../styles/globals.css'
/*
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}*/
import App from "next/app";
import Head from "next/head";
import Layout from "../components/layout";
//import "../assets/css/style.css";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { global, menusPl } = pageProps;
  //console.log('GLOBAL _app.js -----global------ ', global);
  //console.log('MENUS _app.js menus HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHhh pageProps ', pageProps);
  console.log('MENUS _app.js menus WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW menusPl ', menusPl);

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
  console.log('MENUS  _app.js mainMenu.data ----------------------------- ', mainMenu.data);
  let menu_items = [];
  menu_items = mainMenu.data.attributes.items.data;
  //menusPlRes.data.map(menu => {
    //console.log('MENUS  _app.js menusPlRes.data.map menu.attributes.items.data ----------------------------- ', menu.attributes.items.data);
    //menu_items = menu.attributes.items.data;
    //menu_items = temp.attributes.items.data;
    //menu_items.map(item => {
      //console.log('MENUS  _app.js menusPlRes.data.map menu.attributes.items.data = ITEM  ----------------------------- ', item);
      //console.log('item.id = ', item.id);
      //console.log('item.attributes.title = ', item.attributes.title);
      ///console.log('item.attributes.url = ', item.attributes.url);
      //console.log('item.attributes.children.data = ', item.attributes.children.data);
    //  if(item.attributes.children.data) {
        //console.log('---item.attributes.children.data.attributes = ', item.attributes.children.data.attributes);
        //console.log('---item.attributes.children.data.id = ', item.attributes.children.data.id);
    //  }
    //})
  //})
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data, /*menus: menusRes.data,*/ menusPl: menu_items } };
};

export default MyApp
