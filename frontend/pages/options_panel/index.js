import Link from "next/link";
import Posts from "../../components/posts";
import Seo from "../../components/seo";
import Banner from "../../components/banner";
import ServicesFeaturedSection from "../../components/servicesFeaturedSection";
import ServicesSection from "../../components/ServicesSection";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";
//import nextConfig from '../../next.config.js';
import nextI18NextConfig from '../../next-i18next.config.js'
import { SSRConfig, UserConfig } from 'next-i18next';
import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { getLocalizedPaths, formatSlug } from '../../lib/localize-helpers';
import { useContext, useEffect, useState } from "react";

export default function OptionsPanel({ services, servicesPage, servicesTr, locale, pageContext }) {

  const { /*locale,*/ locales, defaultLocale/*, asPath*/ } = pageContext; //useRouter();
  
  const imageUrl = getStrapiMedia(servicesPage.attributes.coverImg);
 
  const seo = {
    metaTitle: servicesPage.attributes.seo.metaTitle,
    metaDescription: servicesPage.attributes.seo.mataDescription,
    shareImage: getStrapiMedia(servicesPage.attributes.seo.shareImage),
    page: true,
  };
  return (
    <>
        <h1>Options Panel</h1>

      {/*<Seo seo={seo} />     
      <Banner slogan={servicesPage.attributes.title}  imageUrl={imageUrl} />        
      <ServicesFeaturedSection articles={servicesPage.attributes.servicesPreview.featuredServices.data} title={servicesPage.attributes.servicesPreview.heading} locale={locale} defaultLocale={defaultLocale} />
      <ServicesSection articles={services} title={services.sectionTitle} locale={locale} defaultLocale={defaultLocale} />*/}
    </>
  )
}

export async function getStaticProps({ locale, locales, defaultLocale, params }) {
  
  //const [data_t] = await serverSideTranslations(locale, ['common', 'footer'], config );
  
  const [servicesRes, servPageRes] = await Promise.all([
    //fetchAPI("/services", { populate: ["localizations", "coverImg", "tags"] }),
    fetchAPI("/services", { populate: {
                              localizations: { populate: "*" },
                              coverImg: { populate: "*" },
                            } 
                          }),
    fetchAPI("/services-page?locale="+locale+"&populate[0]=coverImg"+"&populate[1]=seo"+"&populate[12]=seo.shareImage"+"&populate[2]=localizations"+"&populate[3]=servicesPreview.featuredServices"+"&populate[44]=servicesPreview.featuredServices.coverImg", {}),
  ]);

  const pageContext = {
    locale: servPageRes.data.attributes.locale,  //page.locale,
    locales: locales, //context.locales,
    defaultLocale: defaultLocale, //context.defaultLocale,
    slug: 'services', //servPageRes.data.attributes.slug,
    localizations: [],  //servPageRes.data.attributes.localizations.data,
  };
  
  let localizedPaths = [];
  locales.map(loc =>{
    let path = formatSlug("services", loc, defaultLocale);
    localizedPaths.push({ locale: loc, href: path });
  })
  console.log('servPageRes =============  localizedPaths  ', localizedPaths);
  return {
    props: {
      /*...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'footer',
      ])),*/
      defaultLocale: defaultLocale,
      locale: locale,
      services: servicesRes.data,
      servicesPage: servPageRes.data,
      collection: 'services-page',
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