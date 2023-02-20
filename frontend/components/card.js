import React from "react";
import Link from "next/link";
import NextImage from "./image";

import styles from './card.module.css';

const Card = ({ article }) => {
  //console.log('CARD COMPONENT ------------- ', article);
 
  //console.log('CARD COMPONENT article.attributes.featuredImage.data ------------- ', article.attributes.featuredImage.data);
  let categories = [];
  if(article.attributes.categories.data) categories=article.attributes.categories.data;
  //console.log('CARD COMPONENT article.attributes.categories.data ------------- ', article.attributes.categories.data);
  //console.log('CARD COMPONENT categories ------------- ', categories);
  return (
    <Link href={`/news/${article.attributes.slug /*.id*/}`}>
      <div className={styles.cardWrapper}>
       
          <div className={styles.cardMedia}>
            <NextImage image={article.attributes.featuredImage} />
          </div>
          <div className={styles.cardBody}>
          {/*}
          {categories} && (<p id="category" className="uk-text-uppercase">
              {categories && categories.map(
                (category, index) => {return(<div key={index}>{category.attributes.name}</div>)}//category.attributes.name
              )}
            </p>);*/}
            <p id="title" className={styles.cardTitle}>
              {article.attributes.title}
            </p>
          </div>
        
      </div>
    </Link>
  );
};

export default Card;
