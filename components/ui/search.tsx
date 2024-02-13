'use client';
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDebouncedCallback } from "use-debounce";
import SearchResults from "./searchresults";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Search() {
  const [query, setQuery] = useState("");

  const handleSearch = useDebouncedCallback((term: string) => {
    setQuery(term);
  }, 300)
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-3/4 bg-gray-900 rounded-3xl flex flex-row gap-2">
        <div className="rounded-3xl flex justify-center items-center px-4">
          <FaMagnifyingGlass className="" />
        </div>
        <input
          onChange={(e) => handleSearch(e.target.value)}
          value={query}
          type="text" placeholder="Search..." className="w-full bg-gray-900 rounded-3xl focus:outline-none text-3xl py-1"
        />
        {query &&
          <div className="absolute top-20 left-0 min-h-10 w-full grid grid-cols-12 justify-center items-center">
            <div className="col-start-3 col-end-11 h-full w-full flex justify-center items-center">
              <SearchResults query={query} setQuery={setQuery} />
            </div>
          </div>

        }

      </div>
    </QueryClientProvider>
  )
}
