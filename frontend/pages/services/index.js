import Link from "next/link";
import Posts from "../../components/posts";
import Seo from "../../components/seo";
import Banner from "../../components/banner";
import ServicesSection from "../../components/servicesSection";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";
//import nextConfig from '../../next.config.js';
import nextI18NextConfig from '../../next-i18next.config.js'
import { SSRConfig, UserConfig } from 'next-i18next';
import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Services({ services, servicesPage, servicesTr }) {

  //console.log('SERVICES PAGE props ============================ ', props);
  const imageUrl = getStrapiMedia(servicesPage.attributes.coverImg);
  //console.log('SERVICES SERVICES ============================ ', services);
  //console.log('SERVICES PAGE ============================ ', servicesPage);
  //console.log('SERVICES PAGE servicesPage.attributes.seo.shareImage ============================ ', servicesPage.attributes.seo.shareImage);
  //console.log('SERVICES PAGE servicesPage.attributes.coverImg ============================ ', servicesPage.attributes.coverImg);
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
      <ServicesSection articles={services} />
    </>
  )
}

export async function getStaticProps({ locale = 'en' }) {
  // Run API calls in parallel
  console.log('Services page ============= locale = ', locale);
  //let configOverride = UserConfig;
  //const config = /*configOverride ??*/ nextI18NextConfig;
  //console.log('Services page ============= config = ', config);
  //const [data_t] = await serverSideTranslations(locale, ['common', 'footer'], config );
  
  const [servicesRes, servPageRes] = await Promise.all([
    fetchAPI("/services", { populate: ["coverImg", "tags"] }),
    fetchAPI("/services-page", {
      populate: {
        coverImg: { populate: "*" },
        seo: { populate: "*" }, 
      },
    }),
  ]);

  //const [data_t] = await serverSideTranslations(locale, []/*, config*/ );
  //console.log('Services page ============= data_t = ', data_t);
  //console.log('servicesRes ============= ', servicesRes);
  //console.log('servPageRes ============= ', servPageRes);

  return {
    props: {
      /*...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'footer',
      ])),*/
      services: servicesRes.data,
      servicesPage: servPageRes.data,
      //servicesTr: data_t.data,
      ...(await serverSideTranslations(locale, [])),
    },
    revalidate: 60,
  };
}