import React, { useRef, useState, useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const WrapTooltip = props => {
  const divRef = useRef(null);
  const [allowTooltip, setAllowTooltip] = useState(false);
  useEffect(() => {
    if (
      !allowTooltip &&
      divRef.current.scrollHeight > divRef.current.offsetHeight
    ) {
      setAllowTooltip(true);
    }
  }, [allowTooltip]);
  if (allowTooltip) {
    return (
      <Tooltip title={props.text}>
        <div ref={divRef} className={props.className}>
          {props.text}
        </div>
      </Tooltip>
    );
  }
  return (
    <div ref={divRef} className={props.className}>
      {props.text}
    </div>
  );
};

export default WrapTooltip;
