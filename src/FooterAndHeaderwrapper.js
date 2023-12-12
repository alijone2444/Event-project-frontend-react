import ThemedFooter from './Containers/Home/StudentHome/Footer/footer';
import React from 'react';
import Navbar from './Containers/Home/StudentHome/navbar/navbar';

const WrapperComponent = ({ children, showstyle, notshowstyle  }) => {
  return (
    <div>
        {children}
      <ThemedFooter/>
      <Navbar showstyle={showstyle} notshowstyle={notshowstyle} />
    </div>
  );
};

export default WrapperComponent;
