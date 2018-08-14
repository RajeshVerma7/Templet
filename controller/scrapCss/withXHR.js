var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; 

var scrap = async (url) => {
    var scrapedContent = '';
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", url, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                scrapedContent = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);

    return await scrapedContent;
}

module.exports = {
    scrap: scrap
}