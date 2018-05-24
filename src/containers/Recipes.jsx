import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import ListRecipes from '../queries/ListRecipes';
import NewRecipeSubscription from '../subscriptions/newRecipeSubscription';

class Recipes extends Component {
  componentWillMount(){
    this.props.subscribeToNewRecipes();
  }
  render() {
    return (
      <div>
        <h1>Recipes</h1>
        {
          this.props.recipes.map((r, i) => (
            <div key={i}>
              <p>Recipe name: {r.title}</p>
              <p>Recipe type: {r.type}</p>
            </div>
          ))
        }
      </div>
    )
  }
}

export default graphql(ListRecipes, {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: props => ({
    recipes: props.data.listRecipes ? props.data.listRecipes.items : [],
    subscribeToNewRecipes: params => {
      props.data.subscribeToMore({
        document: NewRecipeSubscription,
        updateQuery: (prev, { subscriptionData: { data : { onCreateRecipe } } }) => {
          return {
            ...prev,
            listRecipes: {
              __typename: 'RecipeConnection',
              items: [onCreateRecipe, ...prev.listRecipes.items.filter(recipe => recipe.id !== onCreateRecipe.id)]
            }
          }
        }
      })
    }
  })
})(Recipes)
