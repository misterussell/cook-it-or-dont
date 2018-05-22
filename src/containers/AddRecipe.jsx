import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import uuidV4 from 'uuid/v4';
import CreateRecipe from '../mutations/CreateRecipe';
import ListRecipes from '../queries/ListRecipes';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      element: '',
      elements: [],
      ingredient: '',
      ingredients: [],
      instruction: '',
      instructions: [],
      title: '',
      type: '',
   };

   this.onChange = this.onChange.bind(this);
   this.addElement = this.addElement.bind(this);
   // this.addInstruction = this.addInstruction.bind(this);
  }

  render() {
   return (
    <div>
      <h2>Create Recipe</h2>
      <input
        value={this.state.title}
        onChange={e => this.onChange('title', e.target.value)}
        placeholder="recipe title"
      />
      <input
        value={this.state.type}
        onChange={e => this.onChange('type', e.target.value)}
        placeholder="recipe type"
      />
      <div>
        <p>Elements</p>
          {
            this.state.elements.map((element, i) => {
              return (
                <div
                  key={i}
                  className="element-builder"
                >
                  <p>{element}</p>
                  <input
                    value={this.state.ingredient}
                    onChange={e => this.onChange('ingredient', e.target.value)}
                    placeholder='ingredient'
                  />
                  <button onClick={this.addIngredient}>add ingredient</button>
                </div>
              )
            })
          }
      </div>
      <input
       value={this.state.element}
       onChange={e => this.onChange('element', e.target.value)}
       placeholder='element'
      />
      <button onClick={this.addElement}>add element</button>
      <div onClick={this.addRecipe}>
        <p>add recipe</p>
      </div>
    </div>
   )
  }

  onChange(key, value) {
    this.setState({ [key]: value });
  }

  addElement() {
    if (this.state.element === '') return
    const elements = [this.state.element, ...this.state.elements];
    this.setState({
      elements,
      element: '',
    });
  }

  addIngredient() {
    if (this.state.ingredient === '') return
    const ingredients = [this.state.ingredient, ...this.state.ingredients];
    this.setState({
      ingredients,
      ingredient: ''
    });
  }

  addRecipe() {
    const { elements, instructions, title, type } = this.state;
    this.props.onAdd({
      id: uuidV4(),
      elements,
      instructions,
      title,
      type,
    });
    this.setState({
      title: '',
      type: '',
      ingredient: '',
      ingredients: [],
    });
  }
}

export default graphql(CreateRecipe, {
  props: props => ({
    onAdd: recipe => props.mutate({
      variables: recipe,
      optimisticResponse: {
        __typename: 'Mutation',
        createRecipe: { ...recipe,  __typename: 'Recipe' }
      },
      update: (proxy, { data: { createRecipe } }) => {
        const data = proxy.readQuery({ query: ListRecipes });
        data.listRecipes.items.push(createRecipe);
        proxy.writeQuery({ query: ListRecipes, data });
      },
    })
  })
})(AddRecipe)
