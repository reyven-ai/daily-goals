import React from "react";
import { useGetDummyQuery } from "../graphql/generated";

const DummyData: React.FC = () => {
  const { data, loading, error } = useGetDummyQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

  return (
    <div>
      <h1>{data?.dummy.title}</h1>
      <p>{data?.dummy.description}</p>
    </div>
  );
};

export default DummyData;
