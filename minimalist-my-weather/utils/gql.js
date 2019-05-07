import { gql } from 'apollo-boost';

export const GET_LOCATIONS = gql`
  query Location($query: String!) {
    getLocations(query: $query) {
      title
      woeid
    }
  }
`;
