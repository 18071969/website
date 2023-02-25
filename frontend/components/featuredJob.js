import Link from "next/link";
import Image from "./image";
import Button from "./ui/button"; 
import styles from './servicesSection.module.scss';

const FeaturedJob = ( props ) => {
    //console.log('FEATURED-JOB SECTION props VVVVVVVVVVVVVVVVVVVVVV  ', props);
    const {heading, announcement, job} = props.jobData;
    //console.log('FEATURED-JOB SECTION job ))))))))))))))))))))))  ', job);    
    //console.log('FEATURED-JOB SECTION heading ))))))))))))))))))))))  ', heading);
    let desc = job.data.attributes.description;
    const slug = job.data.attributes.slug;
    //console.log('FEATURED-JOB SECTION slug ))))))))))))))))))))))  ', slug);
    const images = job.data.attributes.images;
    //console.log('FEATURED-JOB SECTION images ))))))))))))))))))))))  ', images);
    let imgStyle = {width:'250px',height:'250px'}
    return (
      <div className={styles.servicesWrapper}>
        <div>
          <h1 className={styles.servicesTitle}>{heading}</h1>
          <h3>{announcement}</h3>
          
          <Button link={`jobs/`}>See All Jobs</Button>
          {/*<Button link={button.url}>See All Jobs</Button>*/}
        </div>
        <div>
            <div>{/*images.map(image => /*console.log('image.attributes.url ===!!! ', image.attributes.url)<Image image={image} />)*/}
                <div style={imgStyle}> <Image image={images} /></div>
                <p>{desc}</p>
            </div>
            <Button link={`jobs/`+slug}>Learn More</Button>
        </div>
          {/*<Link key={`job_${article.id}`} href={`job/`+slug} className={styles.singleServ}>
              <h2>{name}</h2>
              <Image image={coverImg} />
            </Link>
          {articles.map((article) => {
              //console.log('SERVICES SECTION  article.attributes ))))))))))))))))))))))  ',article.attributes);
              const {name, slug, coverImg} = article.attributes;
              //console.log('SERVICES SECTION  coverImg ))))))))))))))))))))))(((((((((((((((())))))))))))))))  ',coverImg);
          return (
            <Link key={`article_${article.id}`} href={`services/`+slug} className={styles.singleServ}>
              <h2>{name}</h2>
              <Image image={coverImg} />
            </Link>
         {/*} );
        })}*/}
      </div>
    );
}

export default FeaturedJob;