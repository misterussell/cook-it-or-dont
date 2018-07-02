import gql from 'graphql-tag';

// edit the $recipes variable so that is is a single CreateInfoInput
// need to figure out how the bulk returns work so that I can evaluate the response.

// export default gql`
//   mutation createRecipe(
//     $info: CreateInfoInput!
//     $elements: [CreateElementInput]!
//     $ingredients: [CreateIngredientInput!]
//   ) {
//     createRecipe(
//       info: $info
//       elements: $elements
//       ingredients: $ingredients
//     ) {
//       info {
//         id
//       }
//       elements {
//         id
//       }
//       ingredients {
//         id
//       }
//     }
//   }
// `

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
