import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import Seo from "../../components/seo";
import Banner from "../../components/banner";
import ReactMarkdown from "react-markdown"; //react-markdown/with-html

import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";
import { getLocalizedPaths } from '../../lib/localize-helpers';

const Service = ({  pageContext, article /*, menus*/ }) => {
  //console.log('BBBBBBBBBBBBBBBBBBB pages/services/[slug].js  article = ', article);
  //console.log('BBBBBBBBBBBBBBBBBBB pages/services/[slug].js  article?.attributes?.coverImg = ', article.attributes.coverImg);
  const { t } = useTranslation(['common', 'second-page'])
  const imageUrl = getStrapiMedia(article.attributes.coverImg);

  const seo = {
    metaTitle: article.attributes.name,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.coverImg,
    article: true,
  };

  return (
    <>
      <Seo seo={seo} />
      <Banner slogan={article.attributes.name}  imageUrl={imageUrl} />  
      <div className="">
          {/*console.log('JJJJJJJJJJJJJJVVVVVVVVV ARTICLE ----------------------- ', article)*/}
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

export async function getStaticProps( context, params/**/ ) {

   console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps context ', context);
   const {locale} = context;
   console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps locale === ', locale);
   const slug = context.params?.slug ?? null;
   console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps slug === ', slug, `/n /services?locale=${locale}`);
   //console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps PARAMS === ', params); 

  const articlesRes = await fetchAPI("/services?locale="+locale+"&filters[slug]="+context.params.slug+"&populate[0]=coverImg"+"&populate[1]=tags"+"&populate[2]=localizations", {
    /*filters: {
      slug: context.params.slug,
      //locale: locale
    },*/
    //populate: ["featuredImage", "category", "author.picture"],
    /*populate: {
      coverImg: { populate: "*" },
      tags: { populate: "*" },
    },*/
  });
  const data = await articlesRes/*.json()*/; 
  //console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps DATA data === ', data);
  if (!articlesRes) {
    //console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps if (!articlesRes) ');
    return {
      notFound: true,
    }
  } 

  console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps DATA articlesRes === ', articlesRes);
  console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps DATA articlesRes.data === ', articlesRes.data);
  console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps DATA articlesRes.data[0].attributes === ', articlesRes.data[0].attributes);
  console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps DATA articlesRes.data[0].attributes.localizations === ', articlesRes.data[0].attributes.localizations);

  const pageContext = {
    locale: articlesRes.data[0].attributes.locale,  //page.locale,
    locales: context.locales,
    defaultLocale: context.defaultLocale,
    slug: context.params.slug,
    localizations: articlesRes.data[0].attributes.localizations.data,
  };

  console.log('JJJJJJJJJJJJJJJJJJJJJJJJ  BEFORE getStaticProps pageContext === ', pageContext);
  console.log('JJJJJJJJJJJJJJJJJJJJJJJJ  BEFORE getStaticProps getLocalizedPaths({ ...pageContext }) === ', getLocalizedPaths({ ...pageContext }));
  const localizedPaths = getLocalizedPaths({ ...pageContext }).map((path) => {
    console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps PATHS === ', path);
    let arr = path.href.split('');
    const index = arr.lastIndexOf('/') + 1;
    arr.splice(index, 0, 'services/').join('');
    path.href = arr.join('');
    return path;
  });
  console.log('JJJJJJJJJJJJJJJJJJJJJJJJ AFTER getStaticProps pageContext === ', pageContext);
  console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps localizedPaths === ', localizedPaths);
  console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps { ...pageContext, localizedPaths } === ', { ...pageContext, localizedPaths });

  return {
    props: {
      article:
       // services[0],
        articlesRes.data[0],
        pageContext: {
          ...pageContext,
          localizedPaths,
        },
        //articlesRes.data[0] /*, categories: categoriesRes, menus: menusRes*/,
        /*...(await serverSideTranslations(locale ?? 'en', [
          'second-page',
          'footer',
        ])),*/
        ...(await serverSideTranslations(locale, [])),
    },
    revalidate: false,
  };
}

export async function getStaticPaths({ locales }) {

  const articlesRes = await fetchAPI("/services", { fields: ["slug", "locale"], populate: {localizations: "*"} });
              const services = articlesRes.data;
              //console.log('SERVICES VVVVVVV === ', services);
              let paths = [];

              services.forEach((page) => {
                //console.log('PAGE VVVVVVV === ', page);

                for (const locale of locales) {
                  //console.log('LOCALE ====== ', locale),
                  (
                    (page.attributes.localizations && page.attributes.localizations.data.length) ?
                      (                  
                        (locale === 'en') && paths.push({
                          params: {
                            id: page.id,
                            slug: page.attributes.slug.toString(),
                          },
                          locale: 'en',
                        }),
                        page.attributes.localizations?.data.map((item, key) => {
                          (item.attributes.locale === locale) &&           
                          paths.push({
                            params: { 
                              id: item.id,
                              slug: item.attributes.slug.toString() 
                            },
                            locale: item.attributes.locale
                          })
                        }).flat()
                      )
                      :
                      paths.push({
                        params: {
                          id: page.id,
                          slug: page.attributes.slug.toString(),
                        },
                        locale,
                      })
                  )
                } //for 
              });

              console.log('getStaticPaths PATHS VVVVVVVWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW === ', paths);
              return {
                paths,
                fallback: false,
              };

}

/*
export async function getStaticPaths({ locales }) { // Get available locales from `context`
  console.log('getStaticPaths ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ');
  const articlesRes = await fetchAPI("/services", { fields: ["slug", "locale"], populate: {localizations: "*"} });
  const services = articlesRes.data;
  console.log('getStaticPaths LOCALS === ', locales)
  console.log('getStaticPaths SERVICES === ', services)

  const paths = services.map((service, i) => (
       
    locales.map((locale, j) => (

      (service.attributes.localizations && service.attributes.localizations.data.length) ?
          (         
            console.log('\n \n 111111111111111111111 service i === ', i, service),
            console.log('111111111111111111111 locale j === ', j, locale),
              service.attributes.localizations?.data.map((item, key) => {
              //console.log('getStaticPaths item, key ================= ', item);
              console.log('getStaticPaths item.id ================= ', item.id);
              console.log('getStaticPaths item.attributes.slug ================= ', item.attributes.slug);
              console.log('getStaticPaths item.attributes.locale ================= ', item.attributes.locale);
              (item.attributes.locale === locale) ?
              {
                params: { 
                  id: item.id,
                  slug: item.attributes.slug.toString() 
                },
                locale: item.attributes.locale
              } : null;
              //console.log('getStaticPaths PARAMS (if item.attributes.locale === locale, X =) ================= ', x),
              //console.log('getStaticPaths XXXXXXXXXX.PARAMS (if item.attributes.locale === locale, X =) ================= ', x?.params)
            }).flat()
           
            
          )
        
          : 

          (
            //(locale == item.attributes.locale) ? slug = service.attributes.slug?.toString() : '5',
            {   
              params: { id: service.id, slug: service.attributes.slug?.toString() },
              locale: locale // Pass locale here
            },
            console.log('22222222222222222222 ELSE === ')
          )

      )
    ).flat()  //end map locales.map((locale)
        
        
  
        )
      ).flat()  //end map services.map((service) // Flatten array to avoid nested arrays
      console.log('getStaticPaths PATHS === ', paths)

  //return { paths: paths, fallback: false }
  return { 
    paths: articlesRes.data.map((article) => ({
      params: {
          slug: article.attributes.slug,
        },
    })),
    fallback: false,
  }
}*/


export default Service;
