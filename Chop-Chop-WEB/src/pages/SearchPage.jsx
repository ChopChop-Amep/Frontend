import React from "react"

function SearchPage() {
    const query = new URLSearchParams(window.location.search).get("query");

    return (
        <main>
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