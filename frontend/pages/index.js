import Head from 'next/head'
import Link from "next/link";
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Posts from "../components/posts";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { fetchAPI } from "../lib/api";

function HomePage({ posts, /*categories, menus,*/ homepage }) {
  console.log('HOMEPAGE ============================!!!!!! ', homepage);
  const seo = {
    metaTitle: homepage.attributes.SEO.metaTitle,
    metaDescription: homepage.attributes.SEO.mataDescription,
    shareImage: homepage.attributes.SEO.shareImage,
    page: true,
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>{homepage.attributes.Title}</title>
      </Head>
      {/*} <Link href="/">Home</Link> | <Link href="/about">About Us</Link> | <Link href="/news">News</Link>
      <h1>Home page</h1>
      <Layout categories={categories}> 
      <Layout menus={menus}>*/}
      
      <Seo seo={homepage.attributes.SEO} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{homepage.attributes.Hero.slogan1}</h1>
          <Posts articles={posts} />
        </div>
      </div>
      {/*</Layout>*/}
    </div>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
 
 const [postsRes, /*menusRes,*/ homepageRes] = await Promise.all([
    fetchAPI("/posts", { populate: ["featuredImage", "category"] }),
    //fetchAPI("/categories", { populate: "*" }),
    //fetchAPI("/pages", { populate: "*" }),
    /*fetchAPI("/main-menu", { 
      populate: {
        MenuTab: { populate: "*" },
        SubMenuItem: { populate: {
          page: { populate: "*" },    
        },
      } },
    }),  */

    fetchAPI("/home-page", {
      populate: {
        featuredImage: { populate: "*" },
        Hero: { populate: "*" },
        SEO: { populate: "*" },
      },
    }),
  ]);

  console.log('postsRes ============= ', postsRes);
  console.log('homepageRes ============= ', homepageRes);
  //console.log('menusRes ============= ', menusRes);

  return {
    props: {
      posts: postsRes.data,
      //categories: categoriesRes.data,
      //pages: pagesRes.data,
      //menus: menusRes.data,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  };
}

export default HomePage;
