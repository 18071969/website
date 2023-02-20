import { getStrapiMedia } from "../lib/media";
import NextImage from "next/image";

const Image = ({ image }) => {

  const { alternativeText, width, height } = image.data.attributes;
  //console.log('Components/image.js image.data.attributes = &&&&&&&&&&&&&&&&&&&&&&', image.data.attributes);
  return (
    <NextImage
      layout="responsive"
      width={width}
      height={height}
      objectFit="contain"
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
    />
  );
};

export default Image;