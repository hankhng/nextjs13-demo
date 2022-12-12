import React from "react";

type PageProps = {
  params: {
    searchTerm: string;
  };
};

type SearchResults = {
  organic_results: [
    {
      title: string;
      position: number;
      link: string;
      thumbnail: string;
      snippet: string;
    }
  ];
};

const search = async (searchTerm: string) => {
  const response = await fetch(
    `https://serpapi.com/search.json?q=${searchTerm}&api_key=${process.env.API_KEY}}`
  );

  // throw new Error("Whoops error");
  const data: SearchResults = await response.json();
  return data;
};

async function SearchResults({ params: { searchTerm } }: PageProps) {
  const searchResults = await search(searchTerm); // this is a blocking function and the Loading page will show whenever there is a blocking function

  return (
    <div>
      <p>You searched for: {searchTerm}</p>

      <ol className="space-y-5 p-5">
        {searchResults.organic_results.map((result) => (
          <li key={result.position}>
            <p className="font-bold">{result.title}</p>
            <p>{result.snippet}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default SearchResults;
