import gql from 'graphql-tag';

export default gql`
  mutation addRecipe(
    $recipes: [CreateRecipeInput!]
    $elements: [CreateElementInput!]
    $ingredients: [CreateIngredientInput!]
  ) {
    addRecipe(
      recipes: $recipes
      elements: $elements
      ingredients: $ingredients
    ) {
      recipes {
        id
      }
      elements {
        id
      }
      ingredients {
        id
      }
    }
  }
`
