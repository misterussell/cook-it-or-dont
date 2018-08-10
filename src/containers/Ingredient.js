import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';
import PropTypes from 'prop-types';

class Ingredient extends Component {
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

  componentWillMount() {

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
    let ingredientsArr = value.split('\n')
    let test = ingredientsArr.map((ingredient, i) => {
      return {
        ingredient,
        id: uuidV4(),
      }
    });
    this.setState({
      [key]: value,
      ingredientsArr,
    });
  }
}

export default Ingredient;
