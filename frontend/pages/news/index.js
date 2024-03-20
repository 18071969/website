import Link from "next/link";
import Posts from "../../components/posts";
import Seo from "../../components/seo";
import Banner from "../../components/banner";
import { fetchAPI, setCssVar } from "../../lib/api";
//import { responseFetch } from "../api/css-variables";
import { getStrapiMedia } from "../../lib/media";
//import nextI18NextConfig from '../../next-i18next.config.js'
//import { SSRConfig, UserConfig } from 'next-i18next';
//import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//import { useRouter } from 'next/router'
import { getLocalizedPaths, formatSlug } from '../../lib/localize-helpers';

/*function loadCssVar() {
  fetch('http://localhost:3000/api/css-variables')
  .then ((response) => {
      console.log('NEWS PAGE loadCssVar response ============================ ', response),
      responseFetch?.json())
  }
  .then((data) => {
    console.log('NEWS PAGE loadCssVar data ============================ ', data);
  });
}*/

export default function News({ cssProps, posts, newspage, newsPageTr, locale, pageContext }) {

  //console.log('NEWS PAGE locale = ', locale);
  const { locales, defaultLocale } = pageContext;
  //console.log('NEWS PAGE pageContext ============================ ', pageContext);
  //console.log('NEWS PAGE newsPageTr ============================ ', newsPageTr);
 
  const imageUrl = getStrapiMedia(newspage.attributes.headerImage);
  //console.log('NEWSPAGE ============================ ', newspage);
  //console.log('NEWSPAGE newspage.attributes.seo.shareImage ============================ ', newspage.attributes.seo.shareImage);
  const seo = {
    metaTitle: newspage.attributes.seo.metaTitle,
    metaDescription: newspage.attributes.seo.mataDescription,
    shareImage: getStrapiMedia(newspage.attributes.seo.shareImage),
    page: true,
  };
  return (
    <>
      <Seo seo={seo} />   
      <Banner slogan={newspage.attributes.title}  imageUrl={imageUrl} />  
      <Posts articles={posts} />
    </>
  )
}

export async function getStaticProps({ locale, locales, defaultLocale, params }) {
  const arrdata = await setCssVar();
  // Run API calls in parallel
  //console.log('News page ============= params = ', params);
  //console.log('News page ============= locale = ', locale);
  //loadCssVar();
  //const [data_t] = await serverSideTranslations(locale, ['common', 'footer'], config );
  const [postsRes, newsPageRes] = await Promise.all([
    /*fetchAPI("/posts", { populate: ["featuredImage", "categories"] }),
    fetchAPI("/news-page", {
      populate: {
        headerImage: { populate: "*" },
        seo: { populate: "*" },
      },
    }),*/
    fetchAPI("/posts?locale="+locale+"&populate[0]=featuredImage"+"&populate[1]=categories"+"&populate[2]=seo.tags"+"&populate[3]=admin_users", {}), 
    fetchAPI("/news-page?locale="+locale+"&populate[0]=headerImage"+"&populate[1]=seo"+"&populate[2]=seo.shareImage"+"&populate[3]=localizations", {}), 
  ]);

  //console.log('postsRes ============= ', postsRes);
  //console.log('newsPageRes ============= ', newsPageRes);

  const pageContext = {
    locale: newsPageRes.data.attributes.locale,  //page.locale,
    locales: locales, //context.locales,
    defaultLocale: defaultLocale, //context.defaultLocale,
    slug: 'news', //newsPageRes.data.attributes.slug,
    localizations: [],  //newsPageRes.data.attributes.localizations.data,
  };
  //console.log('newsPageRes ============= getStaticProps getLocalizedPaths({ ...pageContext }) === ', getLocalizedPaths({ ...pageContext }));
  //const localizedPaths = getLocalizedPaths({ ...pageContext });
  let localizedPaths = [];
  locales.map(loc =>{
    //console.log('newsPageRes =============  LOC ===  ', loc);
    let path = formatSlug("news", loc, defaultLocale);
    //console.log('servPageRes =============  formatSlug("news", loc, defaultLocale)  ', path);
    localizedPaths.push({ locale: loc, href: path });

  })
  //console.log('newsPageRes =============  localizedPaths  ', localizedPaths);

  return {
    props: {
      cssProps: arrdata,
      posts: postsRes.data,
      newspage: newsPageRes.data,
       /*...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'footer',
      ])),*/
      defaultLocale: defaultLocale,
      locale: locale,
      //services: servicesRes.data,
      newsPage: newsPageRes.data,
      collection: 'news-page',
      pageContext: {
        ...pageContext,
        localizedPaths,  //localizedPaths,
      },
      //servicesTr: data_t.data,
      ...(await serverSideTranslations(locale, [])),
    },
    revalidate: 60,
  };
}
/*export default function News({ posts }) {

  return (
    <div>
     
      {posts.data &&
        posts.data.map((post) => (
          <Link href={`/news/${post.attributes.slug}`} key={post.id}>          
              <h2>{post.attributes.title}</h2>
              <div>{post.attributes.excerpt}</div>           
          </Link>
        ))}
    </div>
  );
}

export async function getStaticProps() {
  
  const res = await fetch("http://localhost:1337/api/posts");
  const posts = await res.json();
  return {
    props: { posts },
  };
}*/