import { useQuery, gql } from "@apollo/client";

const query = gql`
query GetTodosWithUser {
getTodos {
id
title
completed
user {
name
}
}}
`;

function App() {
  const {data, loading} =  useQuery(query);


  return (
    <>
      <p className="text-4xl text-center font-semibold my-10">
{JSON.stringify(data)}
      </p>
    </>
  );
}

export default App;
