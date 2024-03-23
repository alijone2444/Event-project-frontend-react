import ThemedFooter from './Containers/Home/StudentHome/Footer/footer';
import React from 'react';
import Navbar from './Containers/Home/StudentHome/navbar/navbar';

const WrapperComponent = ({ children, showstyle, notshowstyle, transparentNavbar }) => {
  return (
    <div>
      {children}
      <ThemedFooter EditedFooter={transparentNavbar} />
      <Navbar showstyle={showstyle} notshowstyle={notshowstyle} transparentNavbar={transparentNavbar} />
    </div>
  );
};

export default WrapperComponent;
