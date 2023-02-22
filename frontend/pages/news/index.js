import Link from "next/link";
import Posts from "../../components/posts";
import Seo from "../../components/seo";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

export default function News({ posts, newspage }) {
  const imageUrl = getStrapiMedia(newspage.attributes.headerImage);
  console.log('NEWSPAGE ============================ ', newspage);
  //console.log('NEWSPAGE newspage.attributes.seo.shareImage ============================ ', newspage.attributes.seo.shareImage);
  const seo = {
    metaTitle: newspage.attributes.seo.metaTitle,
    metaDescription: newspage.attributes.seo.mataDescription,
    shareImage: getStrapiMedia(newspage.attributes.seo.shareImage),
    page: true,
  };
  return (
    <>
      <Seo seo={seo} />     
      <div
        id="banner"
        /*className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img*/
        data-image-src={imageUrl}
        src={imageUrl}
        data-srcset={imageUrl}  
        data-uk-img
        data-img={true}
      >
        <h1>{newspage.attributes.title}</h1>
      </div> 
      <div>
        <Posts articles={posts} />
      </div>
    </>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
 
  const [postsRes, newspageRes] = await Promise.all([
    fetchAPI("/posts", { populate: ["featuredImage", "categories"] }),
    fetchAPI("/news-page", {
      populate: {
        headerImage: { populate: "*" },
        seo: { populate: "*" },
      },
    }),
  ]);

  console.log('postsRes ============= ', postsRes);
  //console.log('newspageRes ============= ', newspageRes);

  return {
    props: {
      posts: postsRes.data,
      newspage: newspageRes.data,
    },
    revalidate: 60,
  };
}
/*export default function News({ posts }) {

  return (
    <div>
     
      {posts.data &&
        posts.data.map((post) => (
          <Link href={`/news/${post.attributes.slug}`} key={post.id}>          
              <h2>{post.attributes.title}</h2>
              <div>{post.attributes.excerpt}</div>           
          </Link>
        ))}
    </div>
  );
}

export async function getStaticProps() {
  
  const res = await fetch("http://localhost:1337/api/posts");
  const posts = await res.json();
  return {
    props: { posts },
  };
}*/