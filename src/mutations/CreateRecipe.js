import gql from 'graphql-tag';

export default gql`
  mutation createRecipe(
    $title: String!
    $ingredients: [String!]
    $type: String!
  ) {
    createRecipe(input: {
      title: $title, ingredients: $ingredients, type: $type,
    }) {
      id
    }
  }
`
