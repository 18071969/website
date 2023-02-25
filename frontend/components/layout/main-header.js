import Link from 'next/link';

import classes from './main-header.scss';

function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href='/'>NextItems</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href='/items'>Browse All Items</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;