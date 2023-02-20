import Seo from "../../components/seo";
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
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.attributes.name}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          {/*console.log('JJJJJJJJJJJJJJJJJJJJJJJJ article ', article)*/}
          <ReactMarkdown
            children={article.attributes.description}
            escapeHtml={true}
          />

          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
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
