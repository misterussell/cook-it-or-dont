import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import uuidV4 from 'uuid/v4';
import { observer } from 'mobx-react'
import AddRecipeGQL from '../mutations/AddRecipe';
import { Element } from './';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuidV4(),
      recipeTitle: '',
      recipeType: '',
      elements: [{}],
      ingredients: [{}],
   };

   this.onChange = this.onChange.bind(this);
   this.addRecipe = this.addRecipe.bind(this);
   this.addElement = this.addElement.bind(this);
   this.updateElement = this.updateElement.bind(this);
   this.addIngredient = this.addIngredient.bind(this);
   this.updateIngredient = this.updateIngredient.bind(this);
  }

  render() {
   return (
    <div>
      <h2>Create Recipe</h2>
      <input
        value={this.state.recipeTitle}
        onChange={e => this.onChange('recipeTitle', e.target.value)}
        placeholder="recipe title"
      />
      <input
        value={this.state.recipeType}
        onChange={e => this.onChange('recipeType', e.target.value)}
        placeholder="recipe type"
      />
      <div>
        <p>Elements</p>
          {
            this.state.elements.map((element, i) => {
              return (
                <Element
                  key={i}
                  index={i}
                  updateElement={this.updateElement}
                  addIngredient={this.addIngredient}
                  updateIngredient={this.updateIngredient}
                  recipeID={this.state.id}
                />
              )
            })
          }
      </div>
      <button onClick={this.addElement}>add element</button>
      <div onClick={this.addRecipe}>
        <p>add recipe</p>
      </div>
    </div>
   )
  }

  onChange(key, value) {
    this.setState({[key]: value});
  }

  addElement() {
    const elements = [...this.state.elements, {}];
    this.setState({ elements });
  }

  updateElement(index, key, value) {
    const elements = this.state.elements;
    const element = elements[index];
    element[key] = value;
    this.setState({
      element,
      ...elements
    });
  }

  addIngredient() {
    const ingredients = [...this.state.ingredients, {}];
    this.setState({ ingredients })
  }

  updateIngredient(index, key, value) {
    const ingredients = this.state.ingredients;
    const ingredient = ingredients[index];
    ingredient[key] = value;
    this.setState({
      ingredient,
      ...ingredients
    });
  }

  addRecipe() {
    // need to convert this to the new schema
    // info {}
    // elements []
    // ingredients []
    // response payload will continue to comeback as null, but the data is getting added to the backend
    const recipes = [{
      title: this.state.recipeTitle,
      type: this.state.recipeType,
      id: this.state.id,
    }];
    const { elements, ingredients } = this.state;
    const recipeObject = {
      recipes,
      elements,
      ingredients,
    }

    this.props.addRecipe(recipeObject);
  }
}

export default compose(
  graphql(AddRecipeGQL, {
    props: props => ({
      addRecipe: (recipeData) => props.mutate({
        // payload changes go here
        variables: {
          recipes: recipeData.recipes,
          elements: recipeData.elements,
          ingredients: recipeData.ingredients,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          addRecipe: {
             ...recipeData,
             __typename: 'Recipe'
          }
        }
      })
    })
  }),
)(AddRecipe);
