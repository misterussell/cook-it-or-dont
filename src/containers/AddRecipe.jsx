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
      recipe: {},
      recipeID: uuidV4(),
      recipeTitle: '',
      recipeType: '',
      elements: [{}],
      ingredientCount: '',
      ingredientItem: '',
      ingredientMeasurement: '',
      ingredients: [],
   };

   this.onChange = this.onChange.bind(this);
   this.addRecipe = this.addRecipe.bind(this);
   this.addElement = this.addElement.bind(this);
   this.updateElement = this.updateElement.bind(this);
   this.addIngredient = this.addIngredient.bind(this);
  }

  componentWillMount() {
    this.props.store.recipe.newRecipe();
  }
  // the elements array should contain named objects so that elements.ingredients can be iterated over for rendering.
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
    this.setState({elements});
  }

  updateElement(index, key, value) {
    const elements = this.state.elements;
    const element = this.state.elements[index];
    element[key] = value;
    this.setState({
      element,
      ...elements
    });
  }

  addIngredient() {
    if (this.state.ingredientItem === '') return
    const ingredients = [
      {
        count: this.state.ingredientCount,
        elementID: this.state.elementID,
        id: uuidV4(),
        item: this.state.ingredientItem,
        measurement: this.state.ingredientMeasurement,
      },
      ...this.state.ingredients];
    this.setState({
      ingredients,
      ingredientCount: '',
      ingredientItem: '',
      ingredientMeasurement: '',
    });
  }

  addRecipe() {
    const recipes = [{
      title: this.state.recipeTitle,
      type: this.state.recipeType,
      id: this.state.recipeID,
    }];
    const { elements, ingredients } = this.state;

    const recipeObject = {
      recipes,
      elements,
      ingredients,
    }

    console.log(recipeObject);

    this.props.addRecipe(recipeObject);
    this.setState({
      title: '',
      type: '',
    });
  }
}

export default compose(
  graphql(AddRecipeGQL, {
    props: props => ({
      addRecipe: (recipeData) => props.mutate({
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
