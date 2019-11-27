importScripts('https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.6.1/papaparse.js');

const cout = console.log.bind(console);
const url = require('./stationdata.csv'); //`stationdata.csv`;

cout('hi from worker');

fetch(url)
.then(r => r.text())
.then(d => processCSV(d))
.catch(e => cout(e));

function processCSV(data)
{
    cout('debug processCSV start');

    const options = {
        worker: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        step: row => postMessage(row.data),
        complete: () => {cout('done parsing csv'); postMessage('done');}
    };
    Papa.parse(data, options);

    cout('debug processCSV end');
}