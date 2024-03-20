import Seo from "../components/seo";
import Banner from "../components/banner";
import ContactForm from "../components/contactForm";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";

function ContactPage({ contactPage }) {

    const imageUrl = getStrapiMedia(contactPage.attributes.headerImage);
    //console.log('SERVICES SERVICES ============================ ', services);
    //console.log('SERVICES PAGE ============================ ', servicesPage);
    //console.log('SERVICES PAGE servicesPage.attributes.seo.shareImage ============================ ', servicesPage.attributes.seo.shareImage);
    //console.log('SERVICES PAGE servicesPage.attributes.coverImg ============================ ', servicesPage.attributes.coverImg);
    const seo = {
      metaTitle: contactPage.attributes.seo.metaTitle,
      metaDescription: contactPage.attributes.seo.mataDescription,
      shareImage: getStrapiMedia(contactPage.attributes.seo.shareImage),
      page: true,
    };

    
  if (typeof document !== "undefined") {
    const declaration = document.styleSheets[0].cssRules[0].style;
    console.log('NEWS PAGE declaration ============================ ', declaration);
    const value = declaration.getPropertyValue("backgroundColor"); // "1px 2px"
    console.log('NEWS PAGE declaration value ============================ ', value);
  } else console.log('NEWS PAGE NOT WORKING document.styleSheets[0].cssRules[0].style ============================ ');
 

    return (
      <>
        <Seo seo={seo} />     
        <Banner slogan={contactPage.attributes.title}  imageUrl={imageUrl} />  
        <ContactForm />
      </>
    )
}
  
  export async function getStaticProps() {
    // Run API calls in parallel
  
    const [contactPageRes] = await Promise.all([
      //fetchAPI("/contact-page", { populate: ["coverImg", "tags"] }),
        fetchAPI("/contact-page", {
            populate: {
                headerImage: { populate: "*" },
                tags: { populate: "*" },
                seo: { populate: "*" }, 
            },
        }/**/),
    ]);
  
    //console.log('servicesRes ============= ', servicesRes);
    //console.log('servPageRes ============= ', servPageRes);
  
    return {
      props: {
        //services: servicesRes.data,
        contactPage: contactPageRes.data,
      },
      revalidate: 60,
    };
  }

  export default ContactPage;
