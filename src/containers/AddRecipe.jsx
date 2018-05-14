import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import uuidV4 from 'uuid/v4';
import CreateRecipe from '../mutations/CreateRecipe';
import ListRecipes from '../queries/ListRecipes';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      type: '',
      ingredient: '',
      ingredients: [],
   };

   this.onChange = this.onChange.bind(this);
   this.addIngredient = this.addIngredient.bind(this);
   this.addRecipe = this.addRecipe.bind(this);
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
        <p>Ingredients</p>
          {
            this.state.ingredients.map((ingredient, i) => <p key={i}>{ingredient}</p>)
          }
      </div>
      <input
       value={this.state.ingredient}
       onChange={e => this.onChange('ingredient', e.target.value)}
       placeholder='ingredient'
      />
      <button onClick={this.addIngredient}>add ingredient</button>
      <div onClick={this.addRecipe}>
        <p>add recipe</p>
      </div>
    </div>
   )
  }

  onChange(key, value) {
    this.setState({ [key]: value });
  }

  addIngredient() {
    if (this.state.ingredient === '') return
    const ingredients = this.state.ingredients;
    ingredients.push(this.state.ingredient);
    this.setState({
      ingredients,
      ingredient: '',
    }) ;
  }

  addRecipe() {
    const { ingredients, title, type } = this.state;
    this.props.onAdd({
      id: uuidV4(),
      ingredients,
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
