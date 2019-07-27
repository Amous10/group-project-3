import React from 'react';
import IntroHero from '../IntroHero';
import IntroHowItWorks from '../IntroHowItWorks';

function Intro() {
  return (
    <React.Fragment>
      <IntroHero />
      <IntroHowItWorks />
    </React.Fragment>
  );
}

export default Intro;
