import { gql } from 'apollo-boost';

export const GET_LOCATIONS = gql`
  query Location($query: String!) {
    getLocations(query: $query) {
      title
      woeid
    }
  }
`;

export const GET_LOCATION = gql`
  query Weather($woeid: String!) {
    getLocation(woeid: $woeid) {
      consolidated_weather {
        id
        applicable_date
        weather_state_name
        wind_speed
        wind_direction
        the_temp
        min_temp
        max_temp
      }
    }
  }
`;
