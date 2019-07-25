import React from 'react';

const CardWrapper = props => {
  return (
    <div className="row">
      <div className="col l12 m6">
        <div className="card">
          <div className="card-content black-text">
            <span className="card-title">
              {props.count} {props.title}
            </span>
            <h5 className="center-align">{props.message}</h5>
            <div className="row">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWrapper;
