import { useQuery, gql } from "@apollo/client";
import Card from "./Card";

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
      <div className="grid grid-flow-col gap-6 grid-cols-4 ">
      
        {  data?.getTodos.map((element) => {
            <Card key={element.id} title={element.title} username={element?.user?.name}/>
          })
        }
      </div>
    </>
  );
}

export default App;
