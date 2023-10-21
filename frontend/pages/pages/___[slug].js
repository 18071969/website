import Link from "next/link";
import Seo from "../../components/seo";
//import Layout from "../../components/layout";
//import ReactMarkdown from 'react-markdown/with-html';
import Banner from "../../components/banner";
import ReactMarkdown from 'react-markdown'; //react-markdown/with-html

import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

import styles from '../../styles/Home.module.scss'

const Page = ({ pageContext, page/*, menus*/ }) => {

  const imageUrl = getStrapiMedia(page.attributes.featuredImage);
  //console.log('AAAAAAAAAAAAAAAAAAAA /pages/[slug].js  imageUrl = ', imageUrl);
  //console.log('AAAAAAAAAAAAAAAAAAAA /pages/[slug].js  page.attributes.SEO.shareImage = ', page.attributes.SEO.shareImage);
  const seo = {
    metaTitle: page.attributes.SEO.metaTitle,
    metaDescription: page.attributes.SEO.mataDescription,
    shareImage: page.attributes.SEO.shareImage.data.attributes.url,
    page: true,
  };
  //console.log('AAAAAAAAAAAAAAAAAAAA /pages/[slug].js  seo = ', seo);
  return ( 
      <>
      <Seo seo={seo} />
      <Banner slogan={page.attributes.Title}  imageUrl={imageUrl} />
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

export async function getStaticProps({ context, params }) {
  console.log('333333333333333333333333333 getStaticProps context ', context);
  console.log('333333333334444444444444444 getStaticProps /pages/[slug].js params === ', params);
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

  //const articlesRes = await fetchAPI("/pages?locale="+locale+"&filters[slug]="+params.slug+"&populate[0]=featuredImage"+"&populate[1]=SEO"+"&populate[2]=localizations", {
  //});
  //console.log('555555555555555555555 getStaticProps /pages/[slug].js QUERY === ', "/pages?locale="+locale+"&filters[slug]="+params.slug+"&populate[0]=featuredImage"+"&populate[1]=SEO"+"&populate[2]=localizations");
  //const data5 = await articlesRes/*.json()*/; 
  //console.log('555555555555555555555 getStaticProps /pages/[slug].js DATA 5 === ', data5);
  
console.log('3333333333333333333333333333333 getStaticProps /pages/[slug].js pagesRes.data === ', pagesRes.data);
  return {
    props: { 
        page: pagesRes.data[0]
    },
    revalidate: 60,
  };
}

export async function getStaticPaths(locales, defaultLocale) {

  console.log("5555555555555 getStaticPaths /pages/[slug].js locales ==== ", locales);

  const pagesRes = await fetchAPI("/pages", { fields: ["Slug", "locale"], populate: {localizations: "*"} });
  console.log("WWWWWWWWWWWWWWWWWWWW getStaticPaths /pages/[slug].js pagesRes ==== ", pagesRes);
  
  const pages = pagesRes.data;
  console.log("WWWWWWWWWWWWWWWWWWWW getStaticPaths /pages/[slug].js pages ==== ", pages);
  
  let paths = [];

  pages.forEach((page) => {
                //console.log('PAGE VVVVVVV === ', page);

                for (const locale of locales) {
                  console.log('LOCALE ====== ', locale),
                  (
                    (page.attributes.localizations && page.attributes.localizations.data.length) ?
                      (                  
                        (locale === defaultLocale) && paths.push({
                          params: {
                            id: page.id,
                            slug: page.attributes.Slug.toString(),
                          },
                          locale: defaultLocale,
                        }),
                        page.attributes.localizations?.data.map((item, key) => {
                          (item.attributes.locale === locale) &&           
                          paths.push({
                            params: { 
                              id: item.id,
                              slug: item.attributes.Slug.toString() 
                            },
                            locale: item.attributes.locale
                          })
                        }).flat()
                      )
                      :
                      paths.push({
                        params: {
                          id: page.id,
                          slug: page.attributes.Slug.toString(),
                        },
                        locale,
                      })
                  )
                } //for 
              });

              console.log('getStaticPaths PATHS VVVVVVVWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW === ', paths);


  
  
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