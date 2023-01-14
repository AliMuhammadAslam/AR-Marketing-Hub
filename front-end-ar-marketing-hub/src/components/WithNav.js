import React from 'react';
import NavBar from './NavigationBar';
import Footer from './Footer';
import { Outlet } from 'react-router';

export default () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
