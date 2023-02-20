import Card from "./card";
import styles from './postSelections.module.css';

const PostsSelection = ( props ) => {
    //console.log('POSTS SECTION props ))))))))))))))))))))))  ', props);
    const {articles, heading} = props;
    //console.log('POSTS SECTION heading ))))))))))))))))))))))  ', heading);    
    //console.log('POSTS SECTION articles ))))))))))))))))))))))  ', articles);
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.titleSection}>{heading}</h1>
            {articles.data.map((article) => {
                //console.log('POSTS SECTION posts_section article.attributes ))))))))))))))))))))))  ',article.attributes);
            return (
              <Card className={styles.items}
                article={article}
                key={`article_${article.id}`}
              />
            );
          })}
        </div>
    );
}

export default PostsSelection;