import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Head from '../components/Head';
import Layout from '../components/Layout';

const User = ({ user }) => (
  <div>
    <Head title="User Info" />
    <Layout>
      <h1>{user.name}</h1>
      <ul>
        <li>Name: {user.name}</li>
        <li>Phone: {user.phone}</li>
        <li>Email: {user.email}</li>
        <li>Website: {user.website}</li>
      </ul>
    </Layout>
  </div>
);

User.getInitialProps = async context => {
  const { id } = context.query;
  const res = await axios(`https://jsonplaceholder.typicode.com/users/${id}`);

  return { user: res.data };
};

User.propTypes = {
  user: PropTypes.string
};

User.defaultProps = {
  user: 'Mike'
};

export default User;
