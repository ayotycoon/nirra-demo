import React from 'react';
import { mock } from '../../../../providers/auth';
import ButtonC from '../../../misc/ButtonC/ButtonC';
import InputC from '../../../misc/InputC/InputC';
import Logo from '../../../misc/LogoC/LogoC';
import TabsC from '../../../misc/TabsC/TabsC';

import './UnAuthenticatedLayout.scss';



function UnAuthenticatedLayout(props: any) {


  const isModeLogin = window.location.pathname.toLowerCase() == '/login';
  return (
    <div className='UnAuthenticatedLayout bg-primary2 text-center text-dark'>



      <div className='top-left bg-primary'> <div className='top-left-inner bg-primary2'></div></div>
      <div className='bottom-right bg-danger'> <div className='bottom-right-inner bg-primary2'></div></div>



      <div className='inner-container'>
        <br />
        <br />
        <Logo />
        <br />
        <br />
        <div className='inner-content d-inline-block bg-white rounded' >

{props.children}
        </div>

      </div>


    </div>

  );
}

export default UnAuthenticatedLayout;
