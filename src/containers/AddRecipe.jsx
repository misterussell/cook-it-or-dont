import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import uuidV4 from 'uuid/v4';
import AddRecipeGQL from '../mutations/AddRecipe';

import { updateObject } from '../models/Recipe';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      recipeID: uuidV4(),
      recipeTitle: '',
      recipeType: '',
      element: '',
      elementID: '',
      elements: [],
      ingredientCount: '',
      ingredientItem: '',
      ingredientMeasurement: '',
      ingredients: [],
      title: '',
      type: '',
   };

   this.onChange = this.onChange.bind(this);
   this.addRecipe = this.addRecipe.bind(this);
   this.addElement = this.addElement.bind(this);
   this.addIngredient = this.addIngredient.bind(this);
  }
  // the elements array should contain named objects so that elements.ingredients can be iterated over for rendering.
  render() {
   return (
    <div>
      <h2>Create Recipe</h2>
      <input
        value={this.state.recipeTitle}
        onChange={e => this.onChange('title', e.target.value)}
        placeholder="recipe title"
      />
      <input
        value={this.state.recipeType}
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
                  <p>{element.name}</p>
                  <input
                    value={this.state.ingredientCount}
                    onChange={e => this.onChange('ingredientCount', e.target.value)}
                    placeholder='ingredient'
                  />
                  <input
                    value={this.state.ingredientMeasurement}
                    onChange={e => this.onChange('ingredientMeasurement', e.target.value)}
                    placeholder='measurement'
                  />
                  <input
                    value={this.state.ingredientItem}
                    onChange={e => this.onChange('ingredientItem', e.target.value)}
                    placeholder='item'
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
    // this.setState((prevState) => {
    //   const recipe = updateObject({[key]: value}, prevState.recipe);
    //   return { recipe };
    // })
    this.setState({ recipe: updateObject({[key]: value})});
    this.setState({[key]: value});
  }

  addElement() {
    if (this.state.element === '') return
    const elements = [
      {
        id: uuidV4(),
        name: this.state.element,
        recipeID: this.state.recipeID,
      },
      ...this.state.elements];
    this.setState({
      elements,
      element: '',
      elementID: uuidV4(),
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
      title: this.state.title,
      type: this.state.type,
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

  // async addElements() {
  //   await Promise.all(this.state.elements.map(async element => {
  //     const response = await this.props.onAddElement(element);
  //   }));
  // }
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
