"use client"; // this is a client component - https://beta.nextjs.org/docs/rendering/fundamentals

import { useRouter } from "next/navigation"; // use next/nav not next/router
import React, { FormEvent, useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");
    router.push(`/search/${search}`);
  };

  return (
    <form onSubmit={(e) => handleChange}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter search term"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg ml-2"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
