import Link from "next/link";
import Posts from "../../components/posts";
import Seo from "../../components/seo";
import Banner from "../../components/banner";
import ServicesSection from "../../components/servicesSection";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

export default function Services({ services, servicesPage }) {

  const imageUrl = getStrapiMedia(servicesPage.attributes.coverImg);
  console.log('SERVICES SERVICES ============================ ', services);
  console.log('SERVICES PAGE ============================ ', servicesPage);
  console.log('SERVICES PAGE servicesPage.attributes.seo.shareImage ============================ ', servicesPage.attributes.seo.shareImage);
  console.log('SERVICES PAGE servicesPage.attributes.coverImg ============================ ', servicesPage.attributes.coverImg);
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

export async function getStaticProps() {
  // Run API calls in parallel

  const [servicesRes, servPageRes] = await Promise.all([
    fetchAPI("/services", { populate: ["coverImg", "tags"] }),
    fetchAPI("/services-page", {
      populate: {
        coverImg: { populate: "*" },
        seo: { populate: "*" }, 
      },
    }),
  ]);

  console.log('servicesRes ============= ', servicesRes);
  console.log('servPageRes ============= ', servPageRes);

  return {
    props: {
      services: servicesRes.data,
      servicesPage: servPageRes.data,
    },
    revalidate: 60,
  };
}