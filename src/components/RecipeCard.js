import React from 'react';
import styled from 'styled-components';

// const Button = styled.button`
//     margin-left: 30px
// `
const A = styled.a`
  margin-left: 5px;
`;

const RecipeCard = props => {
  return (
    <div className="col l12">
      <div className="card horizontal">
        RecipeCARD
        <div className="card-image col l2">
          <img src={props.imgurl} alt={props.name} />
        </div>
        <div className="card-stacked col l10">
          <div className="card-content">
            <div className="col 3">
              <span className="card-title activator grey-text text-darken-4">
                <strong>{props.name}</strong>
              </span>
              <h6>Label: {props.label}</h6>
              <p>URI: {props.uri}</p>
              <p>ShareUrl: {props.shareurl}</p>
              <p>Source: {props.source}</p>
              <p>Yield: {props.yield}</p>
              <p>Calories: {props.calories}</p>
            </div>
            <div className="col 3">
              <a href={props.shareurl} target="_blank" className="waves-effect waves-light btn">
                {props.leftButton}
              </a>
              <A onClick={props.handleRecipeSave || props.handleRecipeDelete} data-id={props.uri} className="waves-effect waves-light btn">
                {props.rightButton}
              </A>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
