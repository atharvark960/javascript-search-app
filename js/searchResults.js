export const deleteSearchResults = () => {
    const parentElement = document.getElementById('searchResults');
    let child = parentElement.lastElementChild;
    while (child != null) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
}

export const buildSearchResults = (resultArray) => {
    resultArray.forEach(result => {
        const resultItem = createResultItem(result);
        const resultContent = document.createElement('div');
        resultContent.classList.add('resultContent');
        if (result.thumbnail) {
            const resultImage = createResultImage(result);
            resultContent.append(resultImage);
        }
        const resultText = createResultText(result);
        resultContent.append(resultText);
        resultItem.append(resultContent);
        document.getElementById('searchResults').append(resultItem);
    });
}

const createResultItem = (result) => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('resultItem');
    const resultTitle = document.createElement('div');
    resultTitle.classList.add('resultTitle');
    const link = document.createElement('a');
    link.href = `https://en.wikipedia.org/?curid=${result.id}`;
    link.textContent = result.title;
    link.target = '_blank';
    resultTitle.append(link);
    resultItem.append(resultTitle);
    return resultItem;
}

const createResultImage = (result) => {
    const resultImage = document.createElement('div');
    resultImage.classList.add('resultImage');
    const img = document.createElement('img');
    img.src = result.thumbnail;
    img.alt = result.title;
    resultImage.append(img);
    return resultImage;
}

const createResultText = (result) => {
    const resultText = document.createElement('div');
    resultText.classList.add('resultText');
    const p = document.createElement('p');
    p.classList.add('resultDescription');
    p.textContent = result.extract;
    resultText.append(p);
    return resultText;
}

export const clearStatsLine = () => {
    document.getElementById('stats').textContent = '';
}

export const setStatsLine = (numberOfResults) => {
    const statsLine = document.getElementById('stats');
    if (numberOfResults > 0) {
        statsLine.textContent = `Displaying ${numberOfResults} results`;
    } else {
        statsLine.textContent = 'Sorry, no results!';
    }
}
