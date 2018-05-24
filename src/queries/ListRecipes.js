import gql from 'graphql-tag';

export default gql`
  query listRecipes {
    listRecipes {
      items {
        id
        title
        type
        elements {
          id
          name
          ingredients {
            id
            count
            measurement
            item
          }
        }
      }
    }
  }
`
