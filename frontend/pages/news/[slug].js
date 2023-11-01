import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Seo from "../../components/seo";
import Banner from "../../components/banner";
import ReactMarkdown from 'react-markdown'; //react-markdown/with-html

import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";
import { getLocalizedPaths } from '../../lib/localize-helpers';

const Post = ({ article/*, menus*/ }) => {
  const { t } = useTranslation(['common', 'second-page'])
  const imageUrl = getStrapiMedia(article.attributes.featuredImage);
 //console.log('BBBBBBBBBBBBBBBBBBB menus = ', menus);
  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.featuredImage,
    article: true,
  };

  return (
  
      <>
      <Seo seo={seo} />
      <Banner slogan={article.attributes.title}  imageUrl={imageUrl} />  
      <div className="">
        <div className="">
          {/*<ReactMarkdown children={article.attributes.content}  escapeHtml={false}/> */}
          {article.attributes.content}
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
            <div className="">
              <p className="">
                By {article.attributes.author/*.data.attributes.name*/}
              </p>
              <p className="">
                {/*<Moment format="MMM Do YYYY">*/ }
                  {article.attributes.date}
                {/*</Moment>*/}
              </p>
            </div>
          </div>
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

//export async function getStaticProps({ context, paths, params/*, ctx, router*/ }) { //
//export async function getStaticProps({ params }){
export async function getStaticProps({ params, locale, locales, defaultLocale }){

  //const { req } = ctx;  console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps req ', req);
  //const { locale } = router;  console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps locale ', locale);
  //console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps paths ', paths);
  //console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps context ', context);
  //console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps paths ', paths);

  //console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps params ', params);
  //const {locale} = params;
  //console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps locale === ', locale); 
  //const slug = context.params?.slug ?? null;
  const slug = params?.slug ?? null;
  //console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps slug === ', slug, `/n /posts?locale=${locale}`);
  
  const articlesRes = 
  /*await fetchAPI("/posts", {
    filters: {
      slug: params.slug,
    },
    populate: ["featuredImage", "category", "author.picture"],
    "/services?locale="+locale+"&filters[slug]="+context.params.slug+"&populate[0]=coverImg"+"&populate[1]=tags"+"&populate[2]=localizations",
  });*/
  await fetchAPI("/posts?locale="+locale+"&filters[slug]="+params.slug+"&populate[0]=featuredImage"+"&populate[1]=tags"+"&populate[2]=localizations", {
  });
  const data = await articlesRes; 
  //console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps DATA data === ', data);
  if (!articlesRes) {
    return {
      notFound: true,
    }
  } 

  const categoriesRes = await fetchAPI("/categories");
  const dataCat = await categoriesRes; 
  if (!categoriesRes) {
    return {
      notFound: true,
    }
  } 

  const pageContext = {
    locale: articlesRes.data[0].attributes.locale,  //page.locale,
    locales: locales,
    defaultLocale: defaultLocale,
    slug: params.slug,
    localizations: articlesRes.data[0].attributes.localizations.data,
  };
  //console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps pageContext === ', pageContext);

  const localizedPaths = getLocalizedPaths({ ...pageContext }).map((path) => {
    //console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps PATHS === ', path);
    let arr = path.href.split('');
    const index = arr.lastIndexOf('/') + 1;
    arr.splice(index, 0, 'news/').join('');
    path.href = arr.join('');
    return path;
  });
  //console.log('JJJJJJJJJJJJJJJJJJJJJJJJ getStaticProps localizedPaths === ', localizedPaths);

  return {
    props: { 
      article: articlesRes.data[0], categories: categoriesRes/*, menus: menusRes }*/,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
      ...(await serverSideTranslations(locale, [])),
      revalidate: false,
    }
  }
}

export async function getStaticPaths({ locales, defaultLocale }) {

  const articlesRes = await fetchAPI("/posts", { fields: ["slug", "locale"], populate: {localizations: "*"} });
  const posts = articlesRes.data;
    //console.log('111111111111111 POSTS-NEWS VVVVVVV === ', posts);
    let paths = [];

    posts.forEach((page) => {
      //console.log('111111111111111 PAGE VVVVVVV posts.forEach((page) === ', page);

      for (const locale of locales) {
        //console.log('1111111111111111111 LOCALE ====== ', locale),
        (
          (page.attributes.localizations && page.attributes.localizations.data.length) ?
            (                  
              (locale === defaultLocale) && paths.push({
                params: {
                  id: page.id,
                  slug: page.attributes.slug.toString(),
                },
                locale: defaultLocale,
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

    console.log('getStaticPaths PATHS === ', paths);
    return {
      paths,
      fallback: false,
    };
  /*try {
    const articlesRes = await fetchAPI("/posts", { fields: ["slug"] });
    //console.log('WWWWWWWWWWWWWWWWWWWW getStaticPaths articlesRes = ', articlesRes);
    return {
      paths: articlesRes.data.map((article) => ({
        params: {
          slug: article.attributes.slug,
        },
      })),
      fallback: 'blocking',
    };
  } catch (error) {
    console.log('News page [slug] ', error);
    return redirect('/');
  }*/

};

export default Post;