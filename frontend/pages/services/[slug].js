import Seo from "../../components/seo";
import Banner from "../../components/banner";
import ReactMarkdown from "react-markdown"; //react-markdown/with-html

import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

const Service = ({ article /*, menus*/ }) => {
  //console.log('BBBBBBBBBBBBBBBBBBB pages/services/[slug].js  article = ', article);
  const imageUrl = getStrapiMedia(article.attributes.coverImg);

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.coverImg,
    article: true,
  };

  return (
    <>
      <Seo seo={seo} />
      <Banner slogan={article.attributes.name}  imageUrl={imageUrl} />  
      <div className="">
          {/*console.log('JJJJJJJJJJJJJJJJJJJJJJJJ article ', article)*/}
          <ReactMarkdown
            children={article.attributes.description}
            escapeHtml={true}
          />

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
          </div>
      </div>
    </>
  );
};

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI("/services", {
    filters: {
      slug: params.slug,
    },
    populate: ["coverImg", "tags"],
  });

  return {
    props: {
      article:
        articlesRes.data[0] /*, categories: categoriesRes, menus: menusRes*/,
    },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/services", { fields: ["slug"] });

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: "blocking",
  };
}

export default Service;
