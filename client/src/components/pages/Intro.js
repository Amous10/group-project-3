import React from 'react';
import IntroHero from '../IntroHero';
import IntroHowItWorks from '../IntroHowItWorks';
import { ScrollTo } from 'react-scroll-to';

function Intro(props) {
  const scrollToContent = content => {
    section1.current.scrollIntoView({ behavior: 'smooth' });
  };
  const section1 = React.createRef();
  return (
    <React.Fragment>
      <IntroHero
        loggedIn={props.loggedIn}
        userName={props.userName}
        scrollToContent={scrollToContent}
      />
      <IntroHowItWorks id="works" ref={section1} />
    </React.Fragment>
  );
}

export default Intro;
