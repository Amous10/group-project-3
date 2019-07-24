
import React from 'react';

import ProductHero from './modules/views/ProductHero';

import ProductHowItWorks from './modules/views/ProductHowItWorks';


function Intro() {
  return (
    <React.Fragment>
      
      <ProductHero />
     
     
      <ProductHowItWorks />
      
    </React.Fragment>
  );
}

export default Intro;