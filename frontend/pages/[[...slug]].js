import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import Seo from "../components/seo";
import Banner from "../components/banner";
import OurMission from "../components/ourMission";
import PostsSelection from "../components/postSelections";
//import ServicesSection from "../components/servicesSection";
import FeaturedJob from "../components/featuredJob";
import Newsletter from "../components/newsletter";
import ContactForm from "../components/contactForm";
import ReactMarkdown from "react-markdown"; //react-markdown/with-html

import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import { getLocalizedPaths } from '../lib/localize-helpers';

import { jsonToHtml, renderHTML } from '../lib/editorjs-parser';

const Page = ({ pageContext, page, homepage, posts/*, menus*/ }) => {

  //const { t } = useTranslation();
  const router = useRouter();
  
  const imageUrl = getStrapiMedia(page.attributes.featuredImage);
  
  const seo = {
    metaTitle: page.attributes.SEO.metaTitle,
    metaDescription: page.attributes.SEO.mataDescription,
    shareImage: page.attributes.SEO.shareImage.data.attributes.url,
    page: true,
  };
  const imageUrlHero = homepage.attributes.Hero && 'http://localhost:1337' + homepage.attributes.Hero.image.data[0].attributes.url;
  const ourMission = homepage.attributes.dynamicHomeSection[1] && homepage.attributes.dynamicHomeSection[1];
  const servicesPreview = homepage.attributes.servicesPreview && homepage.attributes.servicesPreview;  //.services.data;
  const featuredPosts = homepage.attributes.postsSelection?.featuredPosts && homepage.attributes.postsSelection.featuredPosts;
  const { heading } = homepage.attributes.postsSelection ? homepage.attributes.postsSelection : '';
  const featuredJob = homepage.attributes.featuredJob;
  const newsletter = homepage.attributes.dynamicHomeSection[0] && homepage.attributes.dynamicHomeSection[0];
 
  return ( 
    <>
    <Seo seo={seo} />
    
    {homepage?.attributes.Hero ? <Banner slogan={homepage.attributes.Hero.slogan1} buttons={homepage.attributes.Hero.buttons} imageUrl={imageUrlHero} />
                                : <Banner slogan={page.attributes.Title}  imageUrl={imageUrl} />}
    {ourMission && <OurMission heading={ourMission.heading} content={ourMission.content} showLogo={ourMission.showLogo} image={ourMission.image} />}
    {/*servicesPreview && <ServicesSection articles={servicesPreview.services.data} title={servicesPreview.sectionTitle} />*/}
    {featuredPosts && <PostsSelection articles={featuredPosts} heading={heading} />}
    {featuredJob && <FeaturedJob jobData={featuredJob} />/**/}
    {newsletter && <Newsletter heading={newsletter.heading} subHeading={newsletter.subHeading} image={newsletter.image} />}
    
    {/*<h1>{page.attributes.Title}</h1>*/}
    <div className="">
      {/*<ReactMarkdown children={page.attributes.Content}  escapeHtml={false}/>*/}
      {renderHTML(jsonToHtml(page.attributes.Content))}

      {(router.query.slug[0] == 'contact-us' || router.query.slug[0] == 'svrzhete-se-s-nas' || router.query.slug[0] == 'svyazatsya-s-nami') && <ContactForm />}
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

export default Page;
  
export async function getStaticProps({ context, params, locale, locales, defaultLocale }) {

  let slug_query = params.slug ? "filters[slug][$eq]="+params.slug[0] : "filters[slug][$null]=true";
  
  const pagesRes = await fetchAPI("/pages?locale="+locale+"&"+slug_query+"&populate[0]=featuredImage"+"&populate[1]=SEO"+"&populate[2]=SEO.shareImage"+"&populate[3]=localizations", { 
    //const pagesRes = await fetchAPI(`/pages?locale=${locale}&slug=${slug_cur}&populate[0]=featuredImage"+"&populate[1]=SEO"+"&populate[2]=SEO.shareImage"+"&populate[3]=localizations`, {
  });
  
  if (!pagesRes) {
    return {
      notFound: true,
    }
  } 

  const pageContext = {
    locale: pagesRes.data[0].attributes.locale,  //page.locale,
    locales: locales,
    defaultLocale: defaultLocale,
    slug: params.slug ? params.slug[0] : false, //'',
    localizations: pagesRes.data[0].attributes.localizations.data,
  };

  const localizedPaths = getLocalizedPaths({ ...pageContext }).map((path) => {
    return path;
  });
 
  let slug = params.slug ? params.slug[0] : null;
  const homepageRes = await fetchAPI("/pages?locale="+locale+"&filters[slug]="+slug+"&populate[0]=featuredImage"
                                    +"&populate[1]=Hero"+"&populate[2]=Hero.image"+"&populate[3]=Hero.buttons"
                                    +"&populate[5]=dynamicHomeSection"+"&populate[6]=dynamicHomeSection.image"
                                    +"&populate[7]=servicesPreview"+"&populate[8]=servicesPreview.services"+"&populate[9]=servicesPreview.services.coverImg"
                                    +"&populate[10]=postsSelection.featuredPosts"+"&populate[11]=postsSelection.featuredPosts.featuredImage"+"&populate[12]=postsSelection.featuredPosts.categories"+"&populate[13]=postsSelection.heading"
                                    +"&populate[14]=featuredJob.heading"+"&populate[15]=featuredJob.announcement"+"&populate[16]=featuredJob.job.images"+"&populate[17]=featuredJob.job.announcement", {
  });
  
  const postsRes = await fetchAPI("/posts?locale="+locale+"&populate[0]=featuredImage"+"&populate[1]=categories", {
  });
 
  return {
    props: { 
        page: pagesRes.data[0],
        homepage: homepageRes.data[0],
        //posts: postsRes.data,
        pageContext: {
          ...pageContext,
          localizedPaths,
        },
        ...(await serverSideTranslations(locale, ['home', 'contact-us'])),
    },
    revalidate: false,    
  };
}

export async function getStaticPaths({ locales, defaultLocale }) {

  const pagesRes = await fetchAPI("/pages", { fields: ["slug", "locale"], populate: {localizations: "*"} });
  const pages = pagesRes.data;

  let paths = [];

  pages.forEach((page) => {
    
    for (const locale of locales) {
      (
        (page.attributes.localizations && page.attributes.localizations.data.length) ?
          (                  
            (locale === defaultLocale) && paths.push({
              params: {
                id: page.id,
                //slug: [page.attributes.slug?.toString()],
                slug: page.attributes.slug == null ? false : [page.attributes.slug.toString()] //.split('/')
                //slug: [(page.attributes.slug) ? page.attributes.slug?.toString() : '/'],
              },
              locale: defaultLocale,
            }),
            page.attributes.localizations?.data.map((item, key) => {
              (item.attributes.locale === locale) &&           
              paths.push({
                params: { 
                  id: item.id,
                  //slug: [item.attributes.slug?.toString()] 
                  slug: item.attributes.slug == null ? false : [item.attributes.slug.toString()]//.split('/')
                  //slug: [(page.attributes.slug) ? page.attributes.slug?.toString() : '/'],
                },
                locale: item.attributes.locale
              })
            }).flat()
          )
          :
          paths.push({
            params: {
              id: page.id,
              //slug: page.attributes.slug?.toString(),
              slug: page.attributes.slug == null ? false : [page.attributes.slug.toString()] //.split('/')
              //slug: [(page.attributes.slug) ? page.attributes.slug?.toString() : '/'],
            },
            locale,
          })
      )
    } //for 
  }); //page.foreach

  //console.log('getStaticPaths /pages/[[...slug]].js PATHS  === ', paths);
  paths.map((key, value) => {
    //console.log('KEY === ', key,' VALUE === ', value, ' KEY.PARAMS.SLUG === ', key.params.slug );    
    if (key.params.slug == '/') { 
      //console.log('Yes');
    } else {
      //console.log('No');
    }
  });

  return {
    paths,
    fallback: false,
  };

}