import galleryApiRequest from 'src/apiRequests/gallery';

import Carousel from './Carousel';
import styles from './index.module.scss';

export default async function Testimonials() {
  const testimonials = await galleryApiRequest.getGalleries();

  return (
    <div className={styles.testimonials}>
      <h3 className='heading-3 text-white'>Testimonials</h3>
      <div className={styles.slider}>
        <Carousel testimonials={testimonials} />
      </div>
    </div>
  );
};
