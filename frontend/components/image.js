import { getStrapiMedia } from "../lib/media";
import NextImage from "next/image"; // next/legacy/image

const Image = ({ image }) => {
  //console.log('Components/image.js image = &&&&&&&&&&&&&&&&&&&&&&', image);
  const { alternativeText, width, height } = image.data?.attributes ? image.data.attributes : image;
  console.log('Components/image.js image.data.attributes = &&&&&&&&&&&&&&&&&&&&&&', image.data.attributes);
  //console.log('Components/image.js width = &&&&&&&&&&&&&&&&&&&&&&', width);
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