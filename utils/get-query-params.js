export function getQueryParams(url) {
    var queryParams = {};
    var queryString = url.split('?')[1];

    if (queryString) {
        var pairs = queryString.split('&');

        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1] || '');

            queryParams[key] = value;
        }
    }

    return queryParams;
}