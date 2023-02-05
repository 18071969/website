//import { url } from "../config/next.config";
import Link from "next/link";

export default function About({ data }) {
  return (
    <div>
      <Link href="/">Home</Link> | <Link href="/about">About Us</Link> |{" "}
      <Link href="/news">News</Link>
      <h1>About page</h1>
      {data.data.attributes && data.data.attributes.Body}
      {data.data.Body}
    </div>
  );
}

export const getStaticProps = async () => {
  //const res = await fetch(`${url}/about-us`);
  const res = await fetch(`http://localhost:1337/api/about-us`);
  const data = await res.json();

  return {
    props: { data },
    revalidate: 1,
  };
};
