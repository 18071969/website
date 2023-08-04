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

export default function Services({ services, servicesPage, servicesTr, locale, pageContext }) {

  console.log('SERVICES PAGE locale = ', locale);
  //if (!locale) locale = useRouter();
  const { /*locale,*/ locales, defaultLocale/*, asPath*/ } = pageContext; //useRouter();
  
  console.log('SERVICES PAGE locales ============================ ', locales);
  console.log('SERVICES PAGE defaultLocale ============================ ', defaultLocale);
  //console.log('SERVICES PAGE asPath ============================ ', asPath);
  console.log('SERVICES PAGE pageContext ============================ ', pageContext);
  //console.log('SERVICES PAGE props ============================ ', props);
  console.log('SERVICES PAGE servicesPage ============================ ', servicesPage);
  const imageUrl = getStrapiMedia(servicesPage.attributes.coverImg);
  console.log('SERVICES SERVICES imageUrl ============================ ', imageUrl);
  //console.log('SERVICES SERVICES services ============================ ', services);
  console.log('SERVICES SERVICES servicesPage.attributes.servicesPreview ============================ ', servicesPage.attributes.servicesPreview);
  console.log('SERVICES SERVICES servicesPage.attributes.servicesPreview.featuredServices.data ============================ ', servicesPage.attributes.servicesPreview.featuredServices.data);
  
  console.log('SERVICES PAGE servicesPage servicesPage.attributes.servicesPreview.heading ============================ ', servicesPage.attributes.servicesPreview.heading);
  /*console.log('SERVICES PAGE servicesPage servicesPage.attributes.servicesPreview.featuredServices.heading============================ ', servicesPage.attributes.servicesPreview.featuredServices.heading);
  */console.log('SERVICES PAGE servicesPage.attributes.seo.shareImage ============================ ', servicesPage.attributes.seo.shareImage);
  console.log('SERVICES PAGE servicesPage.attributes.coverImg ============================ ', servicesPage.attributes.coverImg);
  console.log('SERVICES PAGE servicesTr ============================ ', servicesTr);
  
  const seo = {
    metaTitle: servicesPage.attributes.seo.metaTitle,
    metaDescription: servicesPage.attributes.seo.mataDescription,
    shareImage: getStrapiMedia(servicesPage.attributes.seo.shareImage),
    page: true,
  };
  return (
    <>
      <Seo seo={seo} />     
      <Banner slogan={servicesPage.attributes.title}  imageUrl={imageUrl} />        
      <ServicesFeaturedSection articles={servicesPage.attributes.servicesPreview.featuredServices.data} title={servicesPage.attributes.servicesPreview.heading} locale={locale} defaultLocale={defaultLocale} />
      {/*<ServicesSection articles={services} title={services.sectionTitle} locale={locale} defaultLocale={defaultLocale} />*/}
    </>
  )
}

export async function getStaticProps({ locale, locales, defaultLocale, params }) {
  // Run API calls in parallel
  console.log('Services page ============= params = ', params);
  console.log('Services page ============= locale = ', locale);
  
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
//+"&populate[3]=servicesPreview.featuredServices&populate[4]=servicesPreview.featuredServices.coverImg&populate[5]=servicesPreview.featuredServices.localizations"
  //const [data_t] = await serverSideTranslations(locale, []/*, config*/ );
  //console.log('Services page ============= data_t = ', data_t);
  console.log('servicesRes ============= ', servicesRes);
  console.log("Services page query ============= /services-page?locale="+locale+"&populate[0]=coverImg"+"&populate[1]=seo"+"&populate[2]=localizations"+"&populate[3]=servicesPreview.featuredServices");
  console.log("Services page ============= QUERY === /services-page?locale="+locale+"&populate[0]=coverImg"+"&populate[1]=seo"+"&populate[2]=localizations"+"&populate[3]=servicesPreview.featuredServices&populate[4]=servicesPreview.featuredServices.coverImg&populate[5]=servicesPreview.featuredServices.localizations"),
  //console.log('Services page servPageRes ============= ', servPageRes);
  console.log('Services page servPageRes servPageRes.data ============= ', servPageRes.data);

  const pageContext = {
    locale: servPageRes.data.attributes.locale,  //page.locale,
    locales: locales, //context.locales,
    defaultLocale: defaultLocale, //context.defaultLocale,
    slug: 'services', //servPageRes.data.attributes.slug,
    localizations: [],  //servPageRes.data.attributes.localizations.data,
  };
  console.log('servPageRes ============= getStaticProps getLocalizedPaths({ ...pageContext }) === ', getLocalizedPaths({ ...pageContext }));
  //const localizedPaths = getLocalizedPaths({ ...pageContext });
  let localizedPaths = [];
  locales.map(loc =>{
    console.log('servPageRes =============  LOC ===  ', loc);
    let path = formatSlug("services", loc, defaultLocale);
    console.log('servPageRes =============  formatSlug("services", loc, defaultLocale)  ', path);
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