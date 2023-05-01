import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
  if (media == null) return null;
  //console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ media = ', media);
  //const { url } = (typeof media.data.attributes !== 'undefined') ? media.data.attributes : media.attributes;
  const { url } = media.data?.attributes ? media.data.attributes : media;
  //console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ url = ', url);
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  //console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ imageUrl = ', imageUrl);
  return imageUrl;
}
