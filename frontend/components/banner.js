import Button from "./ui/button";

import styles from "./banner.module.scss";

function Banner(props) {
  console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% styles.banner', styles.banner);
  return (
    <>
      <style global jsx>{`
        .backgr {
          @include background("${props.imageUrl}");
        }
        .bckgr {
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url("${props.imageUrl}");
        }
      `}</style>
      <div id="banner" className={`${styles.banner} bckgr`}> 
      <h1>{props.slogan}</h1>
        {props.buttons && props.buttons.map((button) => (
          <Button link={button.url}>{button.label}</Button>
        ))}
      </div>
    </>
  );
}

export default Banner;
