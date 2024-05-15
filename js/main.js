import { clearPushListener, clearSearchText, setSearchFocus, showClearTextButton } from "./searchBar.js";
import { deleteSearchResults, buildSearchResults, clearStatsLine, setStatsLine } from "./searchResults.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";

document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === 'complete') {
        initApp();
    }
});

const initApp = () => {
    // Set search bar focus
    setSearchFocus();

    // const search = document.getElementById('search');
    // search.addEventListener('input', showClearTextButton);
    // const clear = document.getElementById('clear');
    // clear.addEventListener('click', clearSearchText);
    // clear.addEventListener('keydown', clearPushListener);
    
    const form = document.getElementById('searchBar');
    form.addEventListener('submit', submitSearch);
}

// Procedural "workflow" function
const submitSearch = (event) => {
    event.preventDefault();

    // Delete the search results
    deleteSearchResults();

    // Process the incoming search query
    processSearch();

    // Set search bar focus
    setSearchFocus();
}

const processSearch = async () => {
    // Clear the stats line
    clearStatsLine();

    const searchTerm = getSearchTerm();
    if (searchTerm === "") return;
    const resultArray = await retrieveSearchResults(searchTerm);
    if (resultArray.length > 0) {
        buildSearchResults(resultArray);
    }
    // Set stats line
    setStatsLine(resultArray.length);
}