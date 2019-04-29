const { gql } = require('apollo-server-express');
const fetch = require('node-fetch');

const BASE_API_URL = 'https://www.metaweather.com/api';

const typeDefs = gql`
  type Location {
    title: String
    location_type: String
    latt_long: String
    woeid: String
    distance: String
    consolidated_weather: [Weather]
  }
  type Weather {
    id: ID
    applicable_date: String
    weather_state_name: String
    weather_state_abbr: String
    wind_speed: String
    wind_direction: String
    wind_direction_compass: String
    min_temp: String
    max_temp: String
    the_temp: String
  }
  type Query {
    getLocations(query: String): [Location]
    getLocation(woeid: Int): Location
    getWeatherDay(woeid: Int): [Weather]
  }
`;

const resolvers = {
  Query: {
    getLocations: (_, { query }) =>
      fetch(`${BASE_API_URL}/location/search/?query=${query}`)
        .then(res => res.json())
        .then(data => data),
    getLocation: (_, { woeid }) =>
      fetch(`${BASE_API_URL}/location/${woeid}`)
        .then(res => res.json())
        .then(data => data),
    getWeatherDay: (_, { woeid, date }) =>
      fetch(`${BASE_API_URL}/location/${woeid}/${date}`)
        .then(res => res.json())
        .then(data => data)
  }
};

module.exports = {
  typeDefs,
  resolvers
};
