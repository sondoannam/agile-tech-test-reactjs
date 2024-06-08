import Image from 'next/image';

import TopImage from '@public/images/1.png';

import styles from './index.module.scss';

const TopSection = () => {
  return (
    <div className={styles.home_top}>
      <div className={styles.left_content}>
        <h1 className='heading-1'>Save your data storage here.</h1>
        <p className='body-1'>
          Data Warehouse is a data storage area that has been tested for security, so you can store
          your data here safely but not be afraid of being stolen by others.
        </p>
        <button className='btn-large'>Learn more</button>
      </div>
      <div className={styles.right_content}>
        <Image src={TopImage.src} width={759} height={402} alt='hero' />
      </div>
    </div>
  );
};

export default TopSection;
