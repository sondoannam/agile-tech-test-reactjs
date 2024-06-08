import Image, { StaticImageData } from 'next/image';

import ContentImage3 from '@public/images/3.png';
import ContentImage4 from '@public/images/4.png';
import ContentImage5 from '@public/images/5.png';
import ContentImage6 from '@public/images/6.png';
import ArrowRight from '@public/svg/right-arrow.svg';

import styles from './index.module.scss';

interface FeatureCardProps {
  bgColor: string;
  img: StaticImageData;
  title: string;
  desc: string;
}

const FeatureCard = ({ bgColor, img, title, desc }: FeatureCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_bg} style={{ backgroundColor: bgColor }}></div>
      <svg
        width='427'
        height='353'
        viewBox='0 0 427 353'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          opacity='0.1'
          d='M43.733 41.784C47.7703 17.6952 68.6204 0.048645 93.0453 0.048645H376.922C404.536 0.048645 426.922 22.4344 426.922 50.0486V302.608C426.922 330.222 404.536 352.608 376.922 352.608H50.7169C19.8016 352.608 -3.7054 324.833 1.40467 294.343L43.733 41.784Z'
          fill={bgColor}
        />
      </svg>

      <Image src={img} alt='content-image' />

      <div className={styles.card_content}>
        <h5 className='heading-5-light'>{title}</h5>
        <p className='body-2'>{desc}</p>
        <div>
          <p className='body-2-bold'>Learn more</p>
          <Image src={ArrowRight.src} width={20} height={14} alt='learn-more' />
        </div>
      </div>

      <div className={styles.card_content_mobile}>
        <p className='body-2'>{desc}</p>
        <div>
          <p className='body-2-bold'>Learn more</p>
          <Image src={ArrowRight.src} width={20} height={14} alt='learn-more' />
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className={styles.features}>
      <div className={styles.title}>
        <h3 className='heading-3'>Features</h3>
        <p className='body-1'>
          Some of the features and advantages that we provide for those of you who store data in
          this Data Warehouse.
        </p>
      </div>
      <div className={styles.content}>
        <FeatureCard
          bgColor='#68C9BA'
          img={ContentImage3}
          title='Search Data'
          desc='Don’t worry if your data is very large, the Data Warehoue provides a search engine, which is useful for making it easier to find data effectively saving time.'
        />

        <FeatureCard
          bgColor='#9C69E2'
          img={ContentImage4}
          title='24 Hours Access'
          desc='Access is given 24 hours a full morning to night and
          meet again in the morning, giving you comfort when
          you need data when urgent.'
        />

        <FeatureCard
          bgColor='#F063B8'
          img={ContentImage5}
          title='Print Out'
          desc='Print out service gives you convenience if someday
          you need print data, just edit it all and just print it.'
        />

        <FeatureCard
          bgColor='#2D9CDB'
          img={ContentImage6}
          title='Security Code'
          desc='Data Security is one of our best facilities. Allows for your files
          to be safer. The file can be secured with a code or password that 
          you created, so only you can open the file.'
        />
      </div>
    </div>
  );
};

export default Features;
