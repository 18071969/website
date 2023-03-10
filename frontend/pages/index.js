//import Head from "next/head";
//import Link from "next/link";
//import NextImage from "next/image";
//import Image from "next/image";
import PostsSelection from "../components/postSelections";
import ServicesSection from "../components/ServicesSection";
import FeaturedJob from "../components/FeaturedJob";
//import Posts from "../components/posts";
import Seo from "../components/seo";
import Button from "../components/ui/button";
import Banner from "../components/banner";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";

import styles from "../styles/Home.module.scss";

/*.import {banerImage} from '../styles/_mixins.scss';
testing {
  @include background('/my/img/path.png');
}*/

function HomePage({ posts, /*categories, menus,*/ homepage }) {
  console.log("HOMEPAGE ============================ ", homepage);
  //console.log('HOMEPAGE homepage.attributes.Hero.coverImg.data ============================ ', homepage.attributes.Hero.coverImg.data);
  //console.log('HOMEPAGE homepage.attributes.Hero.image.data[0] ============================ ', homepage.attributes.Hero.image.data[0]);
  //console.log('HOMEPAGE homepage.attributes.Hero.buttons ============================ ', homepage.attributes.Hero.buttons);
  //console.log('HOMEPAGE ============================ homepage.attributes.servicesPreview.services.data ===', homepage.attributes.servicesPreview.services.data);
  //console.log('HOMEPAGE ============================ homepage.attributes.servicesPreview.services.data ===', homepage.attributes.servicesPreview.services.data);
  //console.log('HOMEPAGE ============================ homepage.attributes.postsSelection ===', homepage.attributes.postsSelection);
  //console.log('HOMEPAGE ============================ homepage.attributes.postsSelection.featuredPosts ===', homepage.attributes.postsSelection.featuredPosts);

  console.log(
    "HOMEPAGE ============================ homepage.attributes.featuredJob ===",
    homepage.attributes.featuredJob
  );
  console.log(
    "HOMEPAGE ============================ homepage.attributes.featuredJob.job.data.attributes ===",
    homepage.attributes.featuredJob.job.data.attributes
  );
  //console.log('HOMEPAGE ============================ homepage.attributes.dynamicHomeSection ===', homepage.attributes.dynamicHomeSection);
  const seo = {
    metaTitle: homepage.attributes.SEO.metaTitle,
    metaDescription: homepage.attributes.SEO.mataDescription,
    shareImage: homepage.attributes.SEO.shareImage,
    page: true,
  };
  const featuredJob = homepage.attributes.featuredJob;
  console.log(
    "HOMEPAGE ============================********************** featuredJob ===",
    featuredJob
  );
  //const imageUrl = getStrapiMedia(homepage.attributes.Hero.image.data[0]);
  const imageUrl =
    "http://localhost:1337" +
    homepage.attributes.Hero.image.data[0].attributes.url;
  console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM imageUrl ', imageUrl);
  const featuredPosts = homepage.attributes.postsSelection.featuredPosts;
  //console.log('HOMEPAGE ============================********************** featuredPosts ===', featuredPosts);
  const { heading } = homepage.attributes.postsSelection;
  //console.log('HOMEPAGE ============================ heading ===', heading);
  const servicesPreview = homepage.attributes.servicesPreview.services.data;
  {
    /*className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
  data-uk-img */
  }
  {/*.test{ @include background({imageUrl}); }
@include background('/my/img/path.png');*/}

  return (
    <>
      <Seo seo={seo} />
      <style global jsx>{`
        .backgr {@include background("${imageUrl}");}
        .bckgr { background-image:url("${imageUrl}");}
      `}</style>
      {/*<div
        id="banner"
        class = "bckgr backgr"
        data-image-src={imageUrl}
        src={imageUrl}
        data-srcset={imageUrl}  
        data-uk-img
        data-img={true}
      >
        <h1>{homepage.attributes.Hero.slogan1}</h1>
        {homepage.attributes.Hero.buttons.map((button) => (
          <Button link={button.url}>{button.label}</Button>
        ))}
      </div>*/}
      <Banner slogan={homepage.attributes.Hero.slogan1} buttons={homepage.attributes.Hero.buttons} imageUrl={imageUrl} />
      <ServicesSection articles={servicesPreview} />
      <PostsSelection articles={featuredPosts} heading={heading} />
      <FeaturedJob jobData={featuredJob} />
    </>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel

  const [postsRes, /*menusRes,*/ homepageRes] = await Promise.all([
    fetchAPI("/posts", { populate: ["featuredImage", "categories"] }),
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
        buttons: { populate: "*" },
        //servicesPreview: { populate: "*" },
        servicesPreview: {
          populate: {
            services: {
              populate: {
                coverImg: { populate: ["coverImg"] },
              },
            },
          },
        },
        //featuredJob: { populate: "*" },
        featuredJob: {
          populate: {
            heading: "heading",
            announcement: "announcement",
            job: { populate: ["images", "announcement"] },
          },
        },
        //postsSelection: { populate: "*" },
        postsSelection: {
          populate: {
            heading: "heading",
            featuredPosts: { populate: ["featuredImage", "categories"] },
          },
        },
        dynamicHomeSection: { populate: "*" },
      },
    }),
  ]);

  console.log("postsRes ============= ", postsRes);
  console.log("homepageRes ============= ", homepageRes);
  //console.log('menusRes ============= ', menusRes);

  return {
    props: {
      posts: postsRes.data,
      //categories: categoriesRes.data,
      //pages: pagesRes.data,
      //menus: menusRes.data,
      homepage: homepageRes.data,
    },
    revalidate: 330,
  };
}

export default HomePage;
