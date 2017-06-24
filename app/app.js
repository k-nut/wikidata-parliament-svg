import parliamentSVG from 'parliament-svg'
import toStr from 'virtual-dom-stringify'
import getData from './api'

const draw = (parties) => {
    const svg = parliamentSVG(parties, true)
    const svgstr = toStr(svg)
    document.write(svgstr)
};

const getValuesFromurl = () => {
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);
    return {
        parliament: params.get("parliament"),
        term: params.get("term"),
    }
};

const init = () => {
    const values = getValuesFromurl();
    if (!values.parliament || !values.term ){
        const exampleUrl = `${window.location.origin}/?parliament=Q1939555&term=Q15081430`;
        document.write(`Please add the URL-Parameters <pre>parliament</pre> and <pre>term</pre> to the url <br />
                        an example for the current 18th Bundestag would be: 
                        <pre><a href="${exampleUrl}">${exampleUrl}</a></pre>`)
    }
    getData(values.parliament, values.term).then(data => {
        const parties = data.reduce((acc, party) => {
            const seats = parseInt(party.count.value, 10)
            const colour = `#${party.rgb.value}`;
            acc[party.partyLabel.value] = { seats, colour}
            return acc;
        }, {});
        console.log(parties)
        draw(parties)
    });
};

init();





