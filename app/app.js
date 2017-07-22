import parliamentSVG from 'parliament-svg'
import toStr from 'virtual-dom-stringify'
import {getData, getNRW} from './api'

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

        document.write(`Please add the URL-Parameters <code>parliament</code> and <code>term</code> to the url <br />
                        an example for the current 18th Bundestag would be: 
                        <code><a href="${exampleUrl}">${exampleUrl}</a></code>.
                        <h2> More Example for Nordrhein-Westfalen</h2>`)

        getNRW().then(results => {
            console.log(results);
            const listItems = results.map(entry => {
                const item = document.createElement('li');
                const link = document.createElement('a');
                const term = entry.period.value.match(/\/(\w+)$/)[1]
                link.href = `${window.location.origin}/?parliament=Q17781726&term=${term}`;
                link.appendChild(document.createTextNode(entry.periodLabel.value));
                item.appendChild(link)
                return item;
            })
            const ul = document.createElement('ul');
            listItems.forEach((li) => ul.appendChild(li));
            document.body.appendChild(ul);
        });


        return;
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





