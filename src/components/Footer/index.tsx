import { LogoIcon, MessageBox } from '@components/UI/IconJsx';

const Footer = () => {
  return (
    <div className='footer'>
      <hr />
      <div className='footer_content content-wrapper'>
        <div className='top_content'>
          <div className='item'>
            <div className='flex items-center web-logo item-head'>
              <LogoIcon />
              <h6 className='heading-6'>DataWarehouse</h6>
            </div>
            <div className='flex flex-col'>
              <div className='address'>
                <p className='body-2'>
                  Warehouse Society, 234
                  <br />
                  Bahagia Ave Street PRBW 29281
                </p>
              </div>
              <div className='contact'>
                <p className='body-2'>
                  info@warehouse.project
                  <br />
                  1-232-3434 (Main)
                </p>
              </div>
            </div>
          </div>

          <div className='item'>
            <h6 className='subtitle-2 item-head'>About</h6>
            <div className='flex flex-col item-bottom'>
              <p className='body-2'>Profile</p>
              <p className='body-2'>Features</p>
              <p className='body-2'>Careers</p>
              <p className='body-2'>DW News</p>
            </div>
          </div>

          <div className='item'>
            <h6 className='subtitle-2 item-head'>Help</h6>
            <div className='flex flex-col item-bottom'>
              <p className='body-2'>Support</p>
              <p className='body-2'>Sign up</p>
              <p className='body-2'>Guide</p>
              <p className='body-2'>Reports</p>
              <p className='body-2'>Q&A</p>
            </div>
          </div>

          <div className='item'>
            <h6 className='subtitle-2 item-head'>Social Media</h6>
            <div className='flex'>
              <div className='circle-media'></div>
              <div className='circle-media'></div>
              <div className='circle-media'></div>
            </div>
          </div>
        </div>
        <div className='bottom_content flex justify-between items-end'>
          <p className='body-2'>
            © Datawarehouse™, 2020. All rights reserved.<br />Company Registration Number: 21479524.
          </p>
          <MessageBox />
        </div>
      </div>
    </div>
  );
};

export default Footer;
