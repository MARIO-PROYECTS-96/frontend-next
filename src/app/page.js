import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';




function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default MyApp;
