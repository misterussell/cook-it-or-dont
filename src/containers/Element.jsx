import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';
import PropTypes from 'prop-types';

import { Ingredient } from './';

class Element extends Component {
  static propTypes = {
    addIngredient: PropTypes.func.isRequired,
    updateElement: PropTypes.func.isRequired,
    updateIngredient: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    recipeID: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      id: uuidV4(),
      name: '',
      ingredients: [{}],
    }

  }

  componentWillMount() {
    this.props.updateElement(this.props.index, 'id', this.state.id);
    this.props.updateElement(this.props.index, 'recipeID', this.props.recipeID);
  }

  render() {
    return (
      <div className="element-builder">
        <span className="element-index">{this.props.index}</span>
        <input
          className="text-input"
          value={this.state.name}
          onChange={e => this.onChange(this.props.index, 'name', e.target.value)}
          placeholder='element'
        />
        {
          this.state.ingredients.map((ingredient, i) => {
            return (
              <Ingredient
                key={i}
                index={i}
                updateIngredient={this.props.updateIngredient}
                elementID={this.state.id}
              />
            )
          })
        }
      </div>
    )
  }

  onChange(index, key, value) {
    this.setState({[key]: value});
    this.props.updateElement(index, key, value);
  }
}

// <Ingredient
//   key={i}
//   index={i}
//   updateIngredient={this.props.updateIngredient}
// />
export default Element;
