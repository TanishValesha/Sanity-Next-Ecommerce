import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  const { query } = await searchParams;
  console.log(query);
  return <div>SearchPage</div>;
};

export default SearchPage;
