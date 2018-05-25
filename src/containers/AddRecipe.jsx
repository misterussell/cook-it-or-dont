import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import uuidV4 from 'uuid/v4';
import CreateRecipe from '../mutations/CreateRecipe';
import CreateElement from '../mutations/CreateElement';
import CreateElements from '../mutations/CreateElements';
import ListRecipes from '../queries/ListRecipes';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeID: uuidV4(),
      element: '',
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
    this.setState({ [key]: value });
  }

  addElement() {
    if (this.state.element === '') return
    const elements = [
      {
        name: this.state.element,
        id: uuidV4(),
        recipeID: this.state.recipeID,
      },
      ...this.state.elements];
    this.setState({
      elements,
      element: '',
    });
  }

  addIngredient() {
    if (this.state.ingredientItem === '') return
    const { ingredientCount, ingredientItem, ingredientMeasurement } = this.state;
    const ingredient = {
      ingredientCount,
      ingredientItem,
      ingredientMeasurement,
    };
    const ingredients = [ingredient, ...this.state.ingredients];
    this.setState({
      ingredients,
      ingredientCount: '',
      ingredientItem: '',
      ingredientMeasurement: '',
    });
  }

  addRecipe() {
    const { title, type, elements } = this.state;
    // plan to chain together these promises to get all elements and ingredients built
    // this.props.onAddRecipe({
    //   id: uuidV4(),
    //   title,
    //   type,
    // }).then(result => console.log('success ' + result))
    //   .catch(error => console.log(error));

    // this.addElements();
    this.props.onAddElements(elements);
    this.setState({
      title: '',
      type: '',
    });
  }

  async addElements() {
    await Promise.all(this.state.elements.map(async element => {
      const response = await this.props.onAddElement(element);
    }));
  }
}

export default compose(
  graphql(CreateRecipe, {
    props: props => ({
      onAddRecipe: recipe => props.mutate({
        variables: recipe,
        optimisticResponse: {
          __typename: 'Mutation',
          createRecipe: { ...recipe,  __typename: 'Recipe' }
        }
      })
    })
  }),
  graphql(CreateElement, {
    props: props => ({
      onAddElement: element => props.mutate({
        variables: element,
        optimisticResponse: {
          __typename: 'Mutation',
          createElement: { ...element, __typename: 'Element'}
        }
      })
    })
  }),
  graphql(CreateElements, {
    props: props => ({
      onAddElements: elements => props.mutate({
        variables: {
          id: elements.id,
          name: elements.name,
          recipeID: elements.recipeID,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          addElements: { ...elements, __typename: 'Element'}
        }
      })
    })
  }),
)(AddRecipe);
