import '../styles/globals.css';
import '../styles/index.css';
import '../styles/navbar.css';
import Navbar from './components/navbar';
import Head from 'next/head';
import '../styles/cards.css';
import '../styles/spinner.css';
import Image from 'next/image'

function MyApp({ Component, pageProps }) {
  return (
    <>
        <Head>
          <meta charSet='utf-8'></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2"></meta>
          <title>Sukuna</title>
          <link rel="icon" href='/images/logo.gif' ></link>
        </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;