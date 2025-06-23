import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";

import Breadcrumb from "../components/Breadcrumb";
import Login from "../components/Login";
import Register from '../components/Register';
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
import { Routes, Route } from 'react-router-dom';


const AccountPage = () => {



  return (
    <>
      {/* ColorInit */}
      <ColorInit color={false} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#299E60" />

      {/* Preloader */}
      <Preloader />

      {/* HeaderOne
 */}
      {/* <HeaderOne
 category={true} /> */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title={"Đăng nhập"} />

      {/* Account */}
      <Login />

      {/* ShippingOne */}
      {/* <ShippingOne /> */}

      {/* FooterTwo */}
      {/* <FooterTwo /> */}

      {/* BottomFooter */}
      {/* <BottomFooter /> */}


    </>
  );
};

export default AccountPage;
