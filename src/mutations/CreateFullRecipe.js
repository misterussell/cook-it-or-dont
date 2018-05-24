import gql from 'graphql-tag';

export default gql`
  mutation createFullRecipe(
    $recipeID: ID!
    $elementID: ID!
    $ingredientID: ID!
    $title: String!
    $type: String!
    $elementName: String!
    $ingredientCount: Float!
    $measurement: String!
    $item: String!
  ) {
    createRecipe(input: {
      id: $recipeID,
      title: $title,
      type: $type,
    }) { id }
    createElement(input: {
      id: $elementID,
      recipeID: $recipeID,
      name: $elementName,
    }) { id }
    createIngredient(input: {
      id: $ingredientID,
      elementID: $elementID,
      count: $ingredientCount,
      measurement: $measurement,
      item: $item,
    }) { id }
  }
`
