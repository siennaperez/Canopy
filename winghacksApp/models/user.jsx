import { gql, userQuery } from '@apollo/client';

const GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            name 
            username 
            password 
        }
    }
`;

const User = ({ id }) => {
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <p>{data.user.name}</p>
            <p>{data.user.username}</p>
            <p>{data.user.password}</p>
        </div>
    );
}
