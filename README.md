# Wikidata Parliament SVG

This is a small utility that draws parliament graphs based on data from wikidata.

Use it by supplying the respective parliament and the parliamentary term in the url.

All information about the distribution of seats, the associated parties and even their colors is taken directly from wikidata.

Based on [Parliament SVG](https://github.com/juliuste/parliament-svg).


## Example 

This is the [15th election Period](https://www.wikidata.org/wiki/Q30544772) of the [Landtag of Nordrhein-Westfahlen](https://www.wikidata.org/wiki/Q17781726)

[Live link](https://wikidata-parliament-svg.netlify.com/?parliament=Q17781726&term=Q30544772)

![example screenshot](https://raw.githubusercontent.com/k-nut/wikidata-parliament-svg/image-in-readme/example.png)

## Running
```bash
yarn install
npm start
```

## Buidling
```bash
npm run build
# creates a new folder /dist with bundled js and index
```
