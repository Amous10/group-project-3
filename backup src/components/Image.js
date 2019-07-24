import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
  height: 350px;
`;

const Image = () => {
  return (
    <div>
      <Img src="../../images/cook.jpg" />
    </div>
  );
};

export default Image;
