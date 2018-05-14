import gql from 'graphql-tag';

export default gql`
  subscription NewRecipeSub {
    onCreateRecipe {
      id
      ingredients
      title
      type
    }
  }
`
