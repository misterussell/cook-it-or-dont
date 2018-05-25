import gql from 'graphql-tag';

export default gql`
  mutation createElement(
    $id: ID!
    $name: String!
    $recipeID: ID!
  ) {
    createElement(input: {
      id: $id, name: $name, recipeID: $recipeID,
    }) {
      id
    }
  }
`
