import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Content from '../components/Content';


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Content />
    </div>
  );
}

export default MyApp;
