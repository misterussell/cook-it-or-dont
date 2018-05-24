import gql from 'graphql-tag';

export default gql`
  mutation createRecipe(
    $id: ID!
    $title: String!
    $type: String!
  ) {
    createRecipe(input: {
      id: $id, title: $title, type: $type,
    }) {
      id
    }
  }
`
