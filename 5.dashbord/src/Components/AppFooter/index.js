import Typography from 'antd/es/typography/Typography';
import React from 'react';

const AppFooter = () => {
    return (
        <div className='AppFooter'>
            <Typography.Link href="tel+8801704081993">+8801704081993</Typography.Link>
            <Typography.Link>Privacy Policy</Typography.Link>
            <Typography.Link>Terms of Use</Typography.Link>
        </div>
    );
};

export default AppFooter;