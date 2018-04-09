import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import styles from './Layout.styles.scss';

const Layout = ({ children }) => (
  <div className={styles.container}>
    <Nav />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.array.isRequired
};

export default Layout;
