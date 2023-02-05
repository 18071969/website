import Link from "next/link";

import Seo from "../../components/seo";
import Layout from "../../components/layout";

import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

export default function Home({ posts }) {

  return (
    <div>
      <Link href="/">Home</Link> | <Link href="/about">About Us</Link> | <Link href="/news">News</Link>

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
}