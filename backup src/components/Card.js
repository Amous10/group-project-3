import React from 'react';
import styled from 'styled-components';

// const Button = styled.button`
//     margin-left: 30px
// `
const A = styled.a`
  margin-left: 5px;
`;

const Card = props => {
  return (
    <div className="col l12">
      <div className="card horizontal">
        <div className="card-image col l2">
          <img src={props.url} alt={props.name} />
        </div>
        <div className="card-stacked col l10">
          <div className="card-content">
            <div className="col 3">
              <span className="card-title activator grey-text text-darken-4">
                <strong>{props.name}</strong>
              </span>
              <h6>{props.author}</h6>
              {/* <p>{props.desc}</p> */}
              {props.desc.length > 2500 ? <p>{props.desc.substring(0, 600) + '...'}</p> : <p>{props.desc}</p>}
            </div>
            <div className="col 3">
              <a href={props.infoLink} target="_blank" className="waves-effect waves-light btn">
                {props.leftButton}
              </a>
              <A onClick={props.handleBookSave || props.handleBookDelete} data-id={props.id} className="waves-effect waves-light btn">
                {props.rightButton}
              </A>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
