import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Seo from "../components/seo";
import Banner from "../components/banner";
import OurMission from "../components/ourMission";
import PostsSelection from "../components/postSelections";
import ServicesSection from "../components/servicesSection";
import FeaturedJob from "../components/featuredJob";
import Newsletter from "../components/newsletter";
import ReactMarkdown from "react-markdown"; //react-markdown/with-html

import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import { getLocalizedPaths } from '../lib/localize-helpers';

const Page = ({ pageContext, page, homepage, posts/*, menus*/ }) => {

  console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM PAGE COMPONENT HOMEPAGE ============================ ", homepage);
  console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM PAGE COMPONENT HOMEPAGE ============================ ", homepage.attributes.Hero?.image);
  
  const imageUrl = getStrapiMedia(page.attributes.featuredImage);
  //console.log('AAAAAAAAAAAAAAAAAAAA /pages/[slug].js  imageUrl = ', imageUrl);
  console.log('AAAAAAAAAAAAAAAAAAAA /pages/[slug].js  page.attributes.SEO = ', page.attributes.SEO);
  const seo = {
    metaTitle: page.attributes.SEO.metaTitle,
    metaDescription: page.attributes.SEO.mataDescription,
    shareImage: page.attributes.SEO.shareImage.data.attributes.url,
    page: true,
  };
  const imageUrlHero = homepage.attributes.Hero && 'http://localhost:1337' + homepage.attributes.Hero.image.data[0].attributes.url;
  console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM imageUrlHero === ', imageUrlHero);
  const ourMission = homepage.attributes.dynamicHomeSection[1] && homepage.attributes.dynamicHomeSection[1];
  const servicesPreview = homepage.attributes.servicesPreview && homepage.attributes.servicesPreview;  //.services.data;
  const featuredPosts = homepage.attributes.postsSelection?.featuredPosts && homepage.attributes.postsSelection.featuredPosts;
  const { heading } = homepage.attributes.postsSelection ? homepage.attributes.postsSelection : '';
  const featuredJob = homepage.attributes.featuredJob;
  const newsletter = homepage.attributes.dynamicHomeSection[0] && homepage.attributes.dynamicHomeSection[0];
  //console.log('HOMEPAGE ============================ newsletter ===', newsletter);
  /*console.log(
    "HOMEPAGE ============================********************** featuredJob ===",
    featuredJob
  );*/
  console.log('HOMEPAGE ============================ heading ===', heading);
  console.log('HOMEPAGE ============================ servicesPreview homepage.attributes.servicesPreview ===', homepage.attributes.servicesPreview);
  console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM ourMission === ', ourMission);
  console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM PAGE COMPONENT POSTS ============================ ", posts);

  console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM homepage.attributes.postsSelection === ', homepage.attributes.postsSelection);
  console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM homepage.attributes.postsSelection.featuredPosts === ', featuredPosts);
  //const imageUrlHero5 = {`http://localhost:1337${homepage.attributes.Hero && homepage.attributes.Hero.image.data[0].attributes.url}`};
  //console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM imageUrlHero5 === ', imageUrlHero5);
  // featuredPosts = homepage.attributes.postsSelection.featuredPosts;
  //console.log('HOMEPAGE ============================********************** featuredPosts ===', featuredPosts);
  //const { heading } = homepage.attributes.postsSelection;
  //console.log('HOMEPAGE ============================ heading ===', heading);
 // const servicesPreview = homepage.attributes.servicesPreview;  //.services.data;
 // console.log('HOMEPAGE ============================ servicesPreview homepage.attributes.servicesPreview ===', homepage.attributes.servicesPreview);
  
  //console.log('AAAAAAAAAAAAAAAAAAAA /pages/[slug].js  seo = ', seo);
  return ( 
    <>
    <Seo seo={seo} />
    
    {homepage?.attributes.Hero ? <Banner slogan={homepage.attributes.Hero.slogan1} buttons={homepage.attributes.Hero.buttons} imageUrl={imageUrlHero} />
                                : <Banner slogan={page.attributes.Title}  imageUrl={imageUrl} />}
    {ourMission && <OurMission heading={ourMission.heading} content={ourMission.content} showLogo={ourMission.showLogo} image={ourMission.image} />}
    {servicesPreview && <ServicesSection articles={servicesPreview.services.data} title={servicesPreview.sectionTitle} />}
    {featuredPosts && <PostsSelection articles={featuredPosts} heading={heading} />}
    {featuredJob && <FeaturedJob jobData={featuredJob} />/**/}
    {newsletter && <Newsletter heading={newsletter.heading} subHeading={newsletter.subHeading} image={newsletter.image} />}
    
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

export default Page;
  
export async function getStaticProps({ context, params, locale, locales, defaultLocale }) {

  console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps');
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps /pages/[[...slug]].js context ', context);
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps /pages/[[...slug]].js params === ', params);
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps /pages/[[...slug]].js locales === ', locales);
    let slug_query = params.slug ? "filters[slug][$eq]="+params.slug[0] : "filters[slug][$null]=true";
    
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps /pages/[[...slug]].js slug_cur === ', slug_query);
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps /pages/[[...slug]].js QUERY  === ', "/pages?locale="+locale+"&"+slug_query+"&populate[0]=featuredImage"+"&populate[1]=SEO"+"&populate[2]=SEO.shareImage"+"&populate[3]=localizations");
    
    //console.log(`/pages?locale=${locale}&slug=${slug_cur}&populate[0]=featuredImage"+"&populate[1]=SEO"+"&populate[2]=SEO.shareImage"+"&populate[3]=localizations`);
    //const {locale} = context;
    /*const pagesRes = await fetchAPI("/pages", {
      filters: {
        slug: params.slug[0],
      },
      //populate: ["featuredImage", "category", "author.picture"],
      populate: {
          featuredImage: { populate: "*" },
          SEO: { populate: "*" },
        },
    });*/
    //pagesRes = await fetchAPI("/pages?locale="+locale+"&filters[slug]="+slug_cur+"&populate[0]=featuredImage"+"&populate[1]=SEO"+"&populate[2]=SEO.shareImage"+"&populate[3]=localizations", {
    //const pagesRes = await fetchAPI("/pages?locale="+locale+"&slug="+slug_cur+"&populate[0]=featuredImage"+"&populate[1]=SEO"+"&populate[2]=SEO.shareImage"+"&populate[3]=localizations", {
      
    const pagesRes = await fetchAPI("/pages?locale="+locale+"&"+slug_query+"&populate[0]=featuredImage"+"&populate[1]=SEO"+"&populate[2]=SEO.shareImage"+"&populate[3]=localizations", { 
      //const pagesRes = await fetchAPI(`/pages?locale=${locale}&slug=${slug_cur}&populate[0]=featuredImage"+"&populate[1]=SEO"+"&populate[2]=SEO.shareImage"+"&populate[3]=localizations`, {
    });
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps pagesRes === ', pagesRes);
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps pagesRes.data[0].attributes === ', pagesRes.data[0].attributes);
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps pagesRes.data[0].attributes.localizations === ', pagesRes.data[0].attributes.localizations);
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps pagesRes.data[0].attributes.localizations.data === ', pagesRes.data[0].attributes.localizations.data);
    if (!pagesRes) {
      console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps if (!pagesRes) ');
      return {
        notFound: true,
      }
    } 

    const pageContext = {
      locale: pagesRes.data[0].attributes.locale,  //page.locale,
      locales: /*context?.locales ||*/ locales,
      defaultLocale: /*context.defaultLocale*/ defaultLocale,
      slug: /*context.params.slug params.slug[0]*/params.slug ? params.slug[0] : false, //'',
      localizations: pagesRes.data[0].attributes.localizations.data,
    };

    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC  BEFORE getStaticProps pageContext === ', pageContext);
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC  BEFORE getStaticProps getLocalizedPaths(pageContext) === ', getLocalizedPaths(pageContext));
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC  BEFORE getStaticProps getLocalizedPaths({ ...pageContext }) === ', getLocalizedPaths({ ...pageContext }));
  
    //const articlesRes = await fetchAPI("/pages?locale="+locale+"&filters[slug]="+params.slug+"&populate[0]=featuredImage"+"&populate[1]=SEO"+"&populate[2]=localizations", {
    //});
    //console.log('555555555555555555555 getStaticProps /pages/[slug].js QUERY === ', "/pages?locale="+locale+"&filters[slug]="+params.slug+"&populate[0]=featuredImage"+"&populate[1]=SEO"+"&populate[2]=localizations");
    //const data5 = await articlesRes/*.json()*/; 
    //console.log('555555555555555555555 getStaticProps /pages/[slug].js DATA 5 === ', data5);
    
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps /pages/[slug].js pagesRes.data === ', pagesRes.data);
    const localizedPaths = getLocalizedPaths({ ...pageContext }).map((path) => {
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps PATHS === ', path);
    /*let arr = path.href.split('');
    const index = arr.lastIndexOf('/') + 1;
    arr.splice(index, 0, 'services/').join('');
    path.href = arr.join('');*/
    return path;
  });
  console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC AFTER getStaticProps pageContext === ', pageContext);
  console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps localizedPaths === ', localizedPaths);
  console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps { ...pageContext, localizedPaths } === ', { ...pageContext, localizedPaths });

  /*------------------------------------------------------------------*/
  let slug = params.slug ? params.slug[0] : null;
  const homepageRes = await fetchAPI("/pages?locale="+locale+"&filters[slug]="+slug+"&populate[0]=featuredImage"
                                    +"&populate[1]=Hero"+"&populate[2]=Hero.image"+"&populate[3]=Hero.buttons"
                                    +"&populate[5]=dynamicHomeSection"+"&populate[6]=dynamicHomeSection.image"
                                    +"&populate[7]=servicesPreview"+"&populate[8]=servicesPreview.services"+"&populate[9]=servicesPreview.services.coverImg"
                                    +"&populate[10]=postsSelection.featuredPosts"+"&populate[11]=postsSelection.featuredPosts.featuredImage"+"&populate[12]=postsSelection.featuredPosts.categories"+"&populate[13]=postsSelection.heading"
                                    +"&populate[14]=featuredJob.heading"+"&populate[15]=featuredJob.announcement"+"&populate[16]=featuredJob.job.images"+"&populate[17]=featuredJob.job.announcement", {
  });
  console.log("QUERY ====== ", "/pages?locale="+locale+"&filters[slug]="+slug+"&populate[0]=featuredImage"
  +"&populate[1]=Hero"+"&populate[2]=Hero.image"+"&populate[3]=Hero.buttons"
  +"&populate[5]=dynamicHomeSection"+"&populate[6]=dynamicHomeSection.image"
  +"&populate[7]=servicesPreview"+"&populate[8]=servicesPreview.services"+"&populate[8]=servicesPreview.services.coverImg");
  console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNN getStaticProps homepageRes === ', homepageRes);
  console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNN getStaticProps homepageRes.data[0] === ', homepageRes.data[0]);
  console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNN getStaticProps homepageRes.data[0].atributes.Hero === ', homepageRes.data[0]?.attributes.Hero);
  console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNN getStaticProps homepageRes.data[0].atributes.dynamicHomeSection === ', homepageRes.data[0]?.attributes.dynamicHomeSection);
  homepageRes.data[0].atributes?.Hero && console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNN getStaticProps homepageRes.data[0].atributes.Hero.image.data[0] === ', homepageRes.data[0]?.attributes.Hero.image.data[0]);

  const postsRes = await fetchAPI("/posts?locale="+locale+"&populate[0]=featuredImage"+"&populate[1]=categories", {
  });
  console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNN getStaticProps postsRes === ', postsRes);
  console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNN getStaticProps postsRes.data === ', postsRes.data);
  //const [postsRes3/*, menusRes, homepageRes7*/] = await Promise.all([
    //fetchAPI("/pages", { populate: "*" }),
    //fetchAPI("/posts", { populate: ["featuredImage", "categories"] }),
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
/*
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
    }),*/
  //]);
  //console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps postsRes3.data ============= ', postsRes3.data);
  //console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC getStaticProps homepageRes ============= ', homepageRes);
  /*------------------------------------------------------------------*/

  return {
    props: { 
        page: pagesRes.data[0],
        homepage: homepageRes.data[0],
        //posts: postsRes.data,
        pageContext: {
          ...pageContext,
          localizedPaths,
        },
        ...(await serverSideTranslations(locale, [])),
    },
    revalidate: false,    
  };
}

export async function getStaticPaths({ locales, defaultLocale }) {

  //const router = useRouter();
  //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX PAGES VVVVVVV getStaticPaths ", router.query.slug);
  const pagesRes = await fetchAPI("/pages", { fields: ["slug", "locale"], populate: {localizations: "*"} });
  //&filters[slug]="+params.slug[0]+"
  //const pagesRes = await fetchAPI("/pages", { fields: ["slug", "locale"], filters: {slug: "about-us"}, populate: {localizations: "*"} }); ///*filters: {slug: ""},*/ 
  //console.log("PAGES VVVVVVV getStaticPaths HELOOOOOOO OOOOOOOOOOOOOOOOO QUERY === /pages?slug='about-us'&populate[0]=localizations");
  /*const pagesRes = await fetchAPI("/pages?slug='about-us'&populate[0]=localizations", {  
  });*/
  const pages = pagesRes.data;
  console.log('PAGES VVVVVVV === ', pages);
  let paths = [];

  pages.forEach((page) => {
    //console.log('PAGE VVVVVVV === ', page); page.attributes.slug
    console.log('8888888888 FRONTEND/pages/ [[...slug.js]] getStaticPaths page.attributes.localizations?.data VVVVVVV === ', page.attributes.localizations?.data);
    console.log('8888888888 FRONTEND/pages/ [[...slug.js]] getStaticPaths page.attributes.slug VVVVVVV === ', page.attributes.slug);

    //let slug = '';
    //if(page.attributes.slug == 'null') slug = '';

    for (const locale of locales) {
      //console.log('LOCALE ====== ', locale),
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

  console.log('getStaticPaths /pages/[[...slug]].js PATHS VVVVVVVWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW === ', paths);
  paths.map((key, value) => {
    console.log('KEY === ', key,' VALUE === ', value, ' KEY.PARAMS.SLUG === ', key.params.slug );    
    //console.log("getStaticPaths /pages/[[...slug]].js router.pathname.localeCompare('/[[...slug]]') === ", router.pathname.localeCompare('/[[...slug]]'));
    if (key.params.slug == '/') { 
      console.log('Yessssssssssssssssssssssssssssssssssssssssssssssssssssssssssss');
    } else /*if (key.params.slug == 'about-us')*/ {
      console.log('Noooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
    }
  });

  return {
    paths,
    fallback: false,
  };

}
/*
  export async function getStaticPaths({ locales }) {
    // array of locales provided in context object in getStaticPaths
    const paths = (
        await Promise.all(
            locales.map(async (locale) => {
                // map through locales
                const { data } = await client.query({
                    query: gql`
                        query GetAllPages($locale: String) {
                            pages(locale: $locale) {
                                slug
                                locale
                            }
                        }
                    `, // fetch list of pages per locale
                    variables: { locale },
                });
                return {
                    pages: data.pages,
                    locale,
                };
            })
        )
    ).reduce((acc, item) => {
        item.pages.map((p) => {
            // reduce through the array of returned objects
            acc.push({
                params: {
                    slug: p.slug === '/' ? false : p.slug.split('/'),
                },
                locale: p.locale,
            });
            return p;
        });
        return acc;
    }, []);

    return {
        paths,
        fallback: false,
    };
}*/