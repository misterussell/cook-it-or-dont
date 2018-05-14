import gql from 'graphql-tag';

export default gql`
  mutation createRecipe(
    $id: ID!
    $title: String!
    $ingredients: [String!]
    $type: String!
  ) {
    createRecipe(input: {
      id: $id, title: $title, ingredients: $ingredients, type: $type,
    }) {
      id
    }
  }
`
