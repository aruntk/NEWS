import gql from 'graphql-tag';

const sourceQuery = gql`
  query Source($category: String!, $country: Country, $language: Language) {
  sources(category: $category, country: $country, language: $language){
    status
    sources {
      id
      name
      description
      url
      category
      language
      country
      urlsToLogos {
        small
      }
      sortBysAvailable
    }
  }
}
`;

export default sourceQuery;
