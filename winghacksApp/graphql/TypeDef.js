const {gql} = require('@apollo/client');

const TypeDef = gql`

    type User{
        id: ID!
        name: String!
        username: String!
        password: String!
    }

    
`;

module.exports = TypeDef;