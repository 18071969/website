import Head from "next/head";
import { useContext } from "react";
import { GlobalContext } from "../pages/_app";
import { getStrapiMedia } from "../lib/media";

const Seo = ({ seo }) => {
    
    console.log('SEO>seo +++++++++++++++++++++ ', seo);
    //console.log('SEO>JS GlobalContext +++++++++++++++++++++ ', GlobalContext);
   
  const { DefaultSeo, SiteName } = useContext(GlobalContext);

  const seoWithDefaults = {
    ...DefaultSeo,
    ...seo,
  };
  
  //console.log('SEO>JS DefaultSeo +++++++++++++++++++++ ', DefaultSeo);
  //console.log('SEO>JS SiteName +++++++++++++++++++++ ', SiteName);
  //console.log('SEO>JS seoWithDefaults +++++++++++++++++++++ ', seoWithDefaults);

  const fullSeo = {
    ...seoWithDefaults,
    // Add title suffix
    metaTitle: `${seoWithDefaults.metaTitle} | ${SiteName}`,
    // Get full image URL
    //shareImage: getStrapiMedia(seoWithDefaults.shareImage),
  };

  //console.log('SEO>JS fullSeo +++++++++++++++++++++ ', fullSeo);

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Seo;