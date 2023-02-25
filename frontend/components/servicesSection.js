//import Card from "./card";
import Link from "next/link";
import Image from "./image";
import Button from "./ui/button"; 
import styles from './servicesSection.module.scss';

const ServicesSection = ( props ) => {
    //console.log('SERVICES SECTION props ))))))))))))))))))))))  ', props);
    const {articles} = props;
    //console.log('SERVICES SECTION articles ))))))))))))))))))))))  ', articles);    
    //console.log('POSTS SECTION articles ))))))))))))))))))))))  ', articles);
    return (
      <div className={styles.servicesWrapper}>
          <div>
            <h1 className={styles.servicesTitle}>What We Offer</h1>
            <div className={styles.button}><Button link={`services/`}>All Services</Button></div>
          </div>
          {articles.map((article) => {
              //console.log('SERVICES SECTION  article.attributes ))))))))))))))))))))))  ',article.attributes);
              const {name, slug, coverImg} = article.attributes;
              //console.log('SERVICES SECTION  coverImg ))))))))))))))))))))))(((((((((((((((())))))))))))))))  ',coverImg);
          return (
            <Link key={`article_${article.id}`} href={`services/`+slug} className={styles.singleServ}>
              <h2>{name}</h2>
              <Image image={coverImg} />
            </Link>
          );
        })}
      </div>
    );
}

export default ServicesSection;