import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import Seo from "../../components/seo";
import Banner from "../../components/banner";
import ReactMarkdown from "react-markdown"; //react-markdown/with-html

import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

const Service = ({ article /*, menus*/ }) => {
  //console.log('BBBBBBBBBBBBBBBBBBB pages/services/[slug].js  article = ', article);
  const { t } = useTranslation(['common', 'second-page'])
  const imageUrl = getStrapiMedia(article.attributes.coverImg);

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.coverImg,
    article: true,
  };

  return (
    <>
      <Seo seo={seo} />
      <Banner slogan={article.attributes.name}  imageUrl={imageUrl} />  
      <div className="">
          {/*console.log('JJJJJJJJJJJJJJJJJJJJJJJJ article ', article)*/}
          <ReactMarkdown
            children={article.attributes.description}
            escapeHtml={true}
          />

          <hr className="" />
          <div className="" >
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

export async function getStaticProps( context/*{params}, { locale = 'en' }*/ ) {
   console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps context ', context);
   //const locale = context.locale ?? null; //context.locale; //context;
   const {locale} = context;
   //const { id } = context.params
   console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps locale === ', locale);
   //console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps id === ', id);
   //const router = useRouter();
   //const currentLocale = router.query.locale;

   const slug = context.params?.slug ?? null;
   console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps slug === ', slug, `/services?locale=${locale}`);
  const articlesRes = await fetchAPI(`/services`, { //?locale=${locale}
    filters: {
      //slug: context.params.slug,
      //slug: context.params?.slug ?? null,
      slug: slug !== null ? slug.toString()/*.join('/')*/ : '',
      //locale: locale //!== null ? locale.toString() : ''
    },
    populate: ["coverImg", "tags"],
  });
  console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps articlesRes === ', articlesRes);
  return {
    props: {
      article:
        articlesRes.data[0] /*, categories: categoriesRes, menus: menusRes*/,
        /*...(await serverSideTranslations(locale ?? 'en', [
          'second-page',
          'footer',
        ])),*/
        ...(await serverSideTranslations(locale, [])),
    },
    revalidate: 10000000,
  };
}

export async function getStaticPaths({ locales }) {
  console.log('getStaticPaths locales ================= ', locales);
  //?locale=${language}
 const articlesRes = await fetchAPI("/services", { fields: ["slug"], populate: "*" });

  // const articlesRes = fetchAPI("/services", { populate: "*" });

  /*return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: "blocking",
  };*/

  const articles = articlesRes.data;
  console.log('getStaticPaths articles ================= ', articles);
  //const paths_last = articles.map((article) => locales.map((locale) => ({
  const paths_last = locales.map((locale) => articles.map((article) => ({
    params: { slug: article.attributes.slug.toString() },
    locale // Pass locale here
})))
.flat(); // Flatten array to avoid nested arrays


  const paths_art = articlesRes.data.map((article) => ({
    /*params: {
      slug: article.attributes.slug.toString(),
    }*/
    params: { slug: article.attributes.slug.toString() }, locale: 'en' 
  },
  {
    params: { slug: article.attributes.slug.toString() }, locale: 'bg' 
  }
  ));


    console.log('function getStaticPaths -------- paths_last = ', paths_last);

  return {
    /*paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),*/
    paths: paths_last,
    fallback: false,
  };
}

export default Service;
