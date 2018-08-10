import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';
import PropTypes from 'prop-types';

class IngredientList extends Component {
  static propTypes = {
    elementID: PropTypes.string.isRequired,
    updateIngredient: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      ingredients: '',
      ingredientsArr: [],
    }
  }

  render() {
    return (
      <textarea className="ingredient-list"
        value={this.state.ingredients}
        onChange={e => this.onChange("ingredients", e.target.value)}
        placeholder="list of ingredients"
      />
    )
  }

  onChange(key, value) {
    let ingredientsArr = value.split('\n').map((ingredient, i) => {
      return {
        ingredient,
        ingredientID: uuidV4(),
        elementID: this.props.elementID,
      }
    });
    this.setState({
      [key]: value,
      ingredientsArr,
    });
    this.props.updateIngredient(ingredientsArr);
  }
}

export default IngredientList;
