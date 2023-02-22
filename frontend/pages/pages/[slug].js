import Link from "next/link";
import Seo from "../../components/seo";
//import Layout from "../../components/layout";
//import ReactMarkdown from 'react-markdown/with-html';
import ReactMarkdown from 'react-markdown'; //react-markdown/with-html

import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

import styles from '../../styles/Home.module.css'

const Page = ({ page/*, menus*/ }) => {

  const imageUrl = getStrapiMedia(page.attributes.featuredImage);
  //console.log('AAAAAAAAAAAAAAAAAAAA /pages/[slug].js  imageUrl = ', imageUrl);
  const seo = {
    metaTitle: page.attributes.SEO.metaTitle,
    metaDescription: page.attributes.SEO.mataDescription,
    shareImage: page.attributes.SEO.shareImage,
    page: true,
  };
  //console.log('AAAAAAAAAAAAAAAAAAAA /pages/[slug].js  seo = ', seo);
  return ( 
      <>
      <Seo seo={seo} />
      <div
        id="banner"
        /*className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img*/
        data-image-src={imageUrl}
        src={imageUrl}
        data-srcset={imageUrl}  
        data-uk-img
        data-img={true}
      >
        <h1>{page.attributes.Title}</h1>
      </div>
      {/*<h1>{page.attributes.Title}</h1>*/}
      <div className="">
          <ReactMarkdown children={page.attributes.Content}  escapeHtml={false}/>
          <hr className="" />
          <div className="">
            {/*<div>
              {article.attributes.author.data.attributes.picture && (
                <img
                  src={getStrapiMedia(
                    article.attributes.author.data.attributes.picture
                  )}
                  alt={
                    article.attributes.author.data.attributes.picture.data
                      .attributes.alternativeText
                  }
                  style={{
                    position: "static",
                    borderRadius: "20%",
                    height: 60,
                  }}
                />
              )}
            </div>*/}
          
          </div>
     
      </div>
   
    </>
  );
};
/*
export async function getStaticProps(context) {
    console.log('function getStaticProps(context) ///////////////// ', context);
  const slug = context.params.slug;
  const id = await getItemBySlug(slug);
  const item = await fetch("http://localhost:1337/api/posts/"+id+"/?populate=category.data.attributes.name,featuredImage.data.attributes.name");
  const selectedItem = await item.json();

  return {
    props: {
      selectedItem: selectedItem
    },
    revalidate: 30
  };

}*/

export async function getStaticProps({ params }) {
  //console.log('333333333334444444444444444 getStaticProps /pages/[slug].js params === ', params);
  const pagesRes = await fetchAPI("/pages", {
    filters: {
      slug: params.slug,
    },
    //populate: ["featuredImage", "category", "author.picture"],
    populate: {
        featuredImage: { populate: "*" },
        SEO: { populate: "*" },
      },
  });
//console.log('3333333333333333333333333333333 getStaticProps /pages/[slug].js pagesRes === ', pagesRes);
  return {
    props: { 
        page: pagesRes.data[0]
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const pagesRes = await fetchAPI("/pages", { fields: ["Slug"] });
  //console.log("WWWWWWWWWWWWWWWWWWWW getStaticPaths /pages/[slug].js pagesRes ==== ", pagesRes);
  return {
    paths: pagesRes.data.map((page) => ({
      params: {
        slug: page.attributes.Slug,
      },
    })),
    fallback: "blocking",
  };
}

export default Page;