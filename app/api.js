export default function getData(parliament, term) {
    const query = `
SELECT ?partyLabel ?rgb ?party (COUNT(*) as ?count)
WHERE
{
	?item wdt:P39 wd:${parliament} .
    ?item p:P39 ?membership . 
    ?membership pq:P2937 wd:${term} .
    ?item wdt:P102 ?party .
    ?party wdt:P462 ?color .
    ?color wdt:P465 ?rgb . 
    
	SERVICE wikibase:label { bd:serviceParam wikibase:language "de" }
}
group by ?party ?partyLabel ?rgb 
#disable-caching-${Math.random()}
`;
    const url = `https://query.wikidata.org/bigdata/namespace/wdq/sparql?format=json&query=${encodeURIComponent(query)}`;
    return window.fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.warn(`Looks like there was a problem. Status Code: ${response.status}`);
                    return;
                }
                return response.json().then(function (data) {
                    return data.results.bindings;
                });
            }
        )
        .catch(function (err) {
            console.warn('Fetch Error :-S', err);
        });
}