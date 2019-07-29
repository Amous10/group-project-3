import React from 'react';
import IntroHero from '../IntroHero';
import IntroHowItWorks from '../IntroHowItWorks';
import { ScrollTo } from 'react-scroll-to';

function Intro() {
  return (
    <React.Fragment>
      <IntroHero />
      <IntroHowItWorks id="works" />
    </React.Fragment>
  );
}

export default Intro;
