import React from "react";
import Card from "./card";

import styles from './posts.module.scss';

const Posts = ({ articles }) => {

  //console.log('POSTS COMPONENET posts %%%%%%%%%55 ', articles);
  const leftArticlesCount = Math.ceil(articles.length / 5);
  const leftArticles = articles.slice(0, leftArticlesCount);
  const rightArticles = articles.slice(leftArticlesCount, articles.length);

  return (
    <div>
        {/*<div>
          {leftArticles.map((article, i) => {
            return (
              <Card
                article={article}
                key={`article__left__${article.attributes.slug}`}
              />
            );
          })}
        </div>*/}

        <div>
          <div className={styles.postsWrapper}>
            {articles.map((article, i) => {
              return (
                <Card
                  article={article}
                  key={`article__${article.attributes.slug}`}
                />
              );
            })}
          </div>
        </div>


        {/*<div>
          <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
            {rightArticles.map((article, i) => {
              return (
                <Card
                  article={article}
                  key={`article__left__${article.attributes.slug}`}
                />
              );
            })}
          </div>
        </div>*/}
    </div>
  );
};

export default Posts;