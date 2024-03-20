import Link from 'next/link';

import classes from './button.module.scss';

function Button(props) {
  //console.log('BUTTON COMPONNENT props === ', props);
  //console.log('BUTTON COMPONNENT props.btnStyle === ', props.btnStyle);
  if (props.type && (props.type !== 'submit')){
    
    if (props.link /*&& (props.type!=='submit')*/) {
      return (
        <Link href={props.link} className={classes[props.btnStyle]}> 
          {props.children}
        </Link>
      );
    }

    return (
      <button className={classes.bnt} type={props.type ? 'submit' : 'button'} onClick={props.onClick}>
        {props.children}
      </button>
    );

  } else {

    return (
      <button className={classes[props.btnStyle]} type={props.type ? 'submit' : 'button'}>
        {props.children}
      </button>
    );
  }
}

export default Button;