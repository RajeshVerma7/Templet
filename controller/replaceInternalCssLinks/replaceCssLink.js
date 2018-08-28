function checkModification(cssContent) {
    var _cssContent = cssContent;
    var _arrayIndex = [];
    function checkUrl(s) {
        var sIndex, eIndex;
        if (s) {
            sIndex = s;
            sIndex = _cssContent.indexOf('url(', sIndex);
        } else {
            sIndex = _cssContent.indexOf('url(');
        }
        if (sIndex > 0) {
            eIndex = _cssContent.indexOf(')', sIndex);
            if (eIndex > 0) {
                _arrayIndex.push({ 's': sIndex, 'e': eIndex + 1 });
                checkUrl(eIndex + 1);
            }
        }
    };
    checkUrl();
    return _arrayIndex;
}

function linkToReplace(l, t) {
    var lIndex;
    var oLink = l;
    function findReplaceLink(lIndex) {
        if (!lIndex) {
            lIndex = oLink.lastIndexOf('/');
            oLink = oLink.substr(0, lIndex);
        } else {
            oLink = oLink.substr(0, lIndex);
            lIndex = oLink.lastIndexOf('/');
        }
        return oLink;
    }
    var i;
    for (i = 0; i < t; i++) {
        findReplaceLink();
    }
    if (i === t)
        return oLink;
}

var modify = function (cssContent, cssLink) {
    var content = cssContent;
    var arrayIndex = checkModification(cssContent);
    if (arrayIndex.length > 0) {
        arrayIndex.forEach((e, i) => {
            var urlSrc = cssContent.substr(e.s, (e.e - e.s));
            var beReplace = urlSrc;
            if (urlSrc.substr(0, 4) === "url(" && urlSrc.substr(urlSrc.length - 1) === ")") {
                if(urlSrc.substr(4, 1) === "'" || urlSrc.substr(4, 1) === '"'){
                    var toReplace = urlSrc.substr(5, (urlSrc.length - 2 - 5));
                }else if(urlSrc.substr(4, 1) === ".") {
                    var toReplace = urlSrc.substr(4, (urlSrc.length - 2 - 3));
                }
                if (toReplace && toReplace.length > 0 && toReplace.substr(0, 3) === "../") {
                    var change = linkToReplace(cssLink, 2);
                    var newBeReplace = beReplace;
                    var replacedTxt = newBeReplace.replace("..", change);
                    content = content.replace(beReplace, replacedTxt);
                }
            }
        });
    }
    return content;
}

module.exports = {
    modify: modify
}