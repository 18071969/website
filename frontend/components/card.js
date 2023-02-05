import React from "react";
import Link from "next/link";
import NextImage from "./image";

const Card = ({ article }) => {

   // console.log('CARD COMPONENT ------------- ', article);
   // console.log('CARD COMPONENT article.attributes.featuredImage.data ------------- ', article.attributes.featuredImage.data);
    
  return (
    <Link href={`/news/${article.attributes.slug/*.id*/}`}>
      <div className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <NextImage image={article.attributes.featuredImage} />
          </div>
          <div className="uk-card-body">
            <p id="category" className="uk-text-uppercase">
              {article.attributes.category.data.attributes.name}
            </p>
            <p id="title" className="uk-text-large">
              {article.attributes.title}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;