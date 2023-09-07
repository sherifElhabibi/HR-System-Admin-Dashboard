'use client'
import Image from 'next/image'

import './globals.css';
import Loading from '../components/Loading';
import { useState } from 'react';
import { Router } from 'next/router';
import { Provider } from 'react-redux';
import store from 'redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import FormHome from '../components/FormHome';
import LandingPage from '../components/LandingPage';
import Modules from '../components/Modules';
import axios from 'axios';
import Layout from './layout';

//  import { SessionProvider } from 'next-auth/react';
export default function Home({ Component }: any) {
  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });

  return (

    <>
      <p>
        mnnnnnnnnnnnn
      </p>

    </>


  )
}
