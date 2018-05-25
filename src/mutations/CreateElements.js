import gql from 'graphql-tag';

export default gql`
  mutation addElements(
    $elements: [ElementInput]
  ) {
    addElements(elements: $elements) {
      id
    }
  }
`
