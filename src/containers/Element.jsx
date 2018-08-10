import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';
import PropTypes from 'prop-types';

import { IngredientList } from './';

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
              <IngredientList
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

export default Element;
