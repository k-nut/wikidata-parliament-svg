const getData = (parliament, term) => {
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

const getNRW = () => {
    const query = `
SELECT ?period ?periodLabel ?number WHERE {
  ?period wdt:P31 wd:Q15238777.
  ?period p:P31 ?thing .
  ?thing pq:P642 wd:Q571436.
  ?thing pq:P1545 ?number .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "de,en" }
}
ORDER BY xsd:integer(?number)
`;
    const url = `https://query.wikidata.org/bigdata/namespace/wdq/sparql?format=json&query=${encodeURIComponent(query)}`;
    return window.fetch(url)
        .then(response => response.json())
        .then(data => data.results.bindings)
        .catch((err) => {
            console.warn('Fetch Error :-S', err);
        });
};

export {
    getData,
    getNRW
}