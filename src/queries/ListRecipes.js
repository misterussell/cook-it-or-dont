import gql from 'graphql-tag';

export default gql`
  query listRecipes {
    listRecipes {
      id
      title
      ingredients
      type
    }
  }
`
