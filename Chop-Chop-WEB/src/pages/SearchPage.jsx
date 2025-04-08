import React from "react"
import { HeaderMenu } from "./components/HeaderMenu.jsx"

function SearchPage() {
    const query = new URLSearchParams(window.location.search).get("query");

    return (
        <main>
            <HeaderMenu />
            <h1>Search Results</h1>
            {query ? (
                <p>Showing results for: <strong>{query}</strong></p>
            ) : (
                <p>Please enter a search query.</p>
            )}
        </main>
    );
}

export default SearchPage