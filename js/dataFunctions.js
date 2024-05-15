export const getSearchTerm = () => {
    const rawSearchTerm = document.getElementById('search').value.trim();
    const regex = /[ ]{2,}/gi;
    const searchTerm = rawSearchTerm.replaceAll(regex, ' ');
    return searchTerm;
}

export const retrieveSearchResults = async (searchTerm) => {
    const wikiSearchString = getWikiSearchString(searchTerm);
    const wikiSearchResults = await requestData(wikiSearchString);
    let resultArray = [];
    if (wikiSearchResults.hasOwnProperty('query')) {
        resultArray = processWikiResults(wikiSearchResults.query.pages);
    }
    return resultArray;
}

const getWikiSearchString = (searchTerm) => {
    const maxChars = getMaxChars();
    const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
    const searchString = encodeURI(rawSearchString);
    return searchString;
}

const getMaxChars = () => {
    const width = window.innerWidth || document.body.clientWidth;
    let maxChars;

    if (width < 414) maxChars = 65;
    else if (width < 1400) maxChars = 100;
    else maxChars = 130;

    return maxChars;
}

const requestData = async (searchString) => {
    try {
        const response = await fetch(searchString);
        console.log(response);
        const data = response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
}

const processWikiResults = (results) => {
    const resultArray = [];
    Object.keys(results).forEach(key => {
        const id = results[key].pageid;
        const title = results[key].title;
        const img = results[key].hasOwnProperty('thumbnail')
            ? results[key].thumbnail.source
            : null;
        const extract = results[key].extract;
        const item = {
            id: id,
            title: title,
            thumbnail: img,
            extract: extract
        }
        resultArray.push(item);
    });

    return resultArray;
}
