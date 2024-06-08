import Footer from '@components/Footer';
import Header from '@components/Header';

import Features from './Features';
import Testimonials from './Testimonials';
import TopSection from './TopSection';

const HomePage = () => {
  return (
    <>
      <Header />
      <div className='content-wrapper'>
        <TopSection />
        <Features />
        <Testimonials />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
