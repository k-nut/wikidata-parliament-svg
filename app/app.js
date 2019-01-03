import parliamentSVG from 'parliament-svg'
import createElement from "virtual-dom/create-element";
import {getData, getNRW} from './api'

const draw = (parties) => {
    const svg = parliamentSVG(parties, true)
    const domNode = createElement(svg)
    document.body.appendChild(domNode)
};

const getValuesFromurl = () => {
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);
    return {
        parliament: params.get("parliament"),
        term: params.get("term"),
    }
};

function styledBubble(color){
    const bubble = document.createElement('span');
    bubble.className = "bubble";
    bubble.style.width = "10px";
    bubble.style.height = "10px";
    bubble.style.marginRight = "10px";
    bubble.style.backgroundColor = '#' + color;
    bubble.style.display = "inline-block";
    bubble.style.borderRadius = "50%";
    return bubble;
}

function showList(parties) {
    const listItems = parties.sort((p1, p2)  =>  p2.count.value - p1.count.value)
        .map(party => {
        const item = document.createElement('li');
        item.appendChild(styledBubble(party.rgb.value));
        item.appendChild(document.createTextNode(party.partyLabel.value));
        item.appendChild(document.createTextNode(" - "));
        item.appendChild(document.createTextNode(party.count.value));
        return item;
    });
    const ul = document.createElement('ul');
    listItems.forEach((li) => ul.appendChild(li));
    document.body.appendChild(ul);
}

const init = () => {
    const values = getValuesFromurl();
    if (!values.parliament || !values.term ){
        const exampleBundestagUrl = `${window.location.origin}/?parliament=Q1939555&term=Q30579723`;
        const exampleBelgiumUrl = `${window.location.origin}/?parliament=Q15705021&term=Q17173094`;

        document.write(`Please add the URL-Parameters <code>parliament</code> and <code>term</code> to the url.<br />
                        An example for the 19th Bundestag would be‸= ""
                        <code><a href="${exampleBundestagUrl}">${exampleBundestagUrl}</a></code>.<br/>
                        Another example for the 54th Chamber of Representatives of Belgium would be =
                        <code><a href="${exampleBelgiumUrl}">${exampleBelgiumUrl}</a></code>.<br/>
                        <h2> More Example for Nordrhein-Westfalen</h2>`)

        getNRW().then(results => {
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
        draw(parties)
        showList(data)
    });
};

init();





