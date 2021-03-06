import React from 'react';
import Link from 'next/link';

import styles from './Nav.styles.scss';

export default () => (
  <div>
    <Link href="/">
      <a className={styles.link}>Home</a>
    </Link>
    <Link href="/about">
      <a className={styles.link}>About</a>
    </Link>
  </div>
);
