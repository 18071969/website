import Seo from "../../components/seo";
import ReactMarkdown from 'react-markdown'; //react-markdown/with-html

import { fetchAPI, getItemBySlug, getMenu } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

const Post = ({ article/*, menus*/ }) => {
  const imageUrl = getStrapiMedia(article.attributes.featuredImage);
  //console.log('BBBBBBBBBBBBBBBBBBB pages/news/[slug].js  article = ', article);
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
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.attributes.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          {/*<ReactMarkdown children={article.attributes.content}  escapeHtml={false}/> */}
          {article.attributes.content}
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
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {article.attributes.author/*.data.attributes.name*/}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
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

export async function getStaticProps({ params }) {

  /*const menusRes = await fetchAPI("/main-menu", { 
    populate: {
      MenuTab: { populate: "*" },
      SubMenuItem: { populate: {
        page: { populate: "*" },
      },
    } },
  }); console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGG ', menusRes);*/

  const articlesRes = await fetchAPI("/posts", {
    filters: {
      slug: params.slug,
    },
    populate: ["featuredImage", "category", "author.picture"],
  });
  const categoriesRes = await fetchAPI("/categories");

  return {
  props: { article: articlesRes.data[0], categories: categoriesRes/*, menus: menusRes*/ },
    revalidate: 1,
  };
}

export async function getStaticPaths() {

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
};

export default Post;