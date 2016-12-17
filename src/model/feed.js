import gql from 'graphql-tag';

const feedQuery = gql`
  query Feed($source: String!, $sortBy: SortType!, $offset: Int, $limit: Int) {
  feed(source: $source, sortBy: $sortBy, offset: $offset, limit: $limit) {
    source
    status
    articles {
      author
      title
      description
      url
      urlToImage
      publishedAt
    }
  }
  }
`;

export default feedQuery;
