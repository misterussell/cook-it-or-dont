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
      count: 0,
      item: '',
      measurement: '',
    }
  }

  componentWillMount() {
    this.props.updateIngredient(this.props.index, 'id', this.state.id);
    this.props.updateIngredient(this.props.index, 'elementID', this.props.elementID);
  }

  render() {
    return (
      <div className="ingredient-builder">
        <input
           value={this.state.item}
           onChange={e => this.onChange(this.props.index, 'item', e.target.value)}
           placeholder='ingredient'
        />
        <input
           value={this.state.count}
           onChange={e => this.onChange(this.props.index, 'count', e.target.value)}
           placeholder='count'
        />
        <input
           value={this.state.measurement}
           onChange={e => this.onChange(this.props.index, 'measurement', e.target.value)}
           placeholder='measurement'
        />
      </div>
    )
  }

  onChange(index, key, value) {
    this.setState({[key]: value});
    this.props.updateIngredient(index, key, value);
  }
}

export default Ingredient;
