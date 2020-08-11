import React, {useState} from 'react';
import {Icon} from 'semantic-ui-react';
import '../assets/scss/scrollTopButton.scss';


const ScrollTopButton = () =>{

  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop)

  return (
      <div className="scrollTop" onClick={scrollTop} style={{height: 40, display: showScroll ? 'flex' : 'none'}}>
          <Icon name="arrow up" className="arrow-up " />
      </div>
  );
}

export default ScrollTopButton;