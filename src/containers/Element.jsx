import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';
import PropTypes from 'prop-types';

class Element extends Component {
  static propTypes = {
    updateElement: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      id: uuidV4(),
      name: '',
      ingredients: [],
    }
  }

  componentWillMount() {
    this.props.updateElement(this.props.index, 'id', this.state.id);
  }

  render() {
    return (
      <input
       value={this.state.name}
       onChange={e => this.onChange(this.props.index, 'name', e.target.value)}
       placeholder='element'
      />
    )
  }

  onChange(index, key, value) {
    this.setState({[key]: value});
    this.props.updateElement(index, key, value);
  }
}

export default Element;
