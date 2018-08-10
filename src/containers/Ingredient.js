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
      id: uuidV4(),
      ingredients: '',
    }
  }

  componentWillMount() {
    this.props.updateIngredient(this.props.index, 'id', this.state.id);
    this.props.updateIngredient(this.props.index, 'elementID', this.props.elementID);
  }

  render() {
    return (
      <textarea className="ingredient-list"
        value={this.state.ingredients}
        onChange={e => this.onChange(this.props.index, "ingredients", e.target.value)}
        placeholder="list of ingredients"
      />
    )
  }

  onChange(index, key, value) {
    this.setState({[key]: value});
    let ingredientArr = this.state.ingredients.split('\n');
    this.props.updateIngredient(index, key, ingredientArr);
  }
}

export default Ingredient;
