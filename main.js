import  { saveAs } from 'file-saver';
import leafletImage from 'leaflet-image';
import '@google-web-components/google-chart';

const cout = console.log;
const cerr = console.error;
const sel = s => document.querySelector(s);
const middleindiacoords = [23.012455, 78.085792];
const NDLScoords = [28.642257, 77.218603];
const DELAY_MIN = 0;
const DELAY_MAX = 120;
const DELAY_RANGE = DELAY_MAX - DELAY_MIN;
const PARTITIONS = 5;
const STEP = DELAY_RANGE / PARTITIONS;
const delayRangeColors = ['blue', 'green', 'orange', 'yellow', 'red'];

const accessToken = 'pk.eyJ1IjoidGVzdGluZ21hcGJveGlpdGsiLCJhIjoiY2pvanlqN3JnMDFiOTNwbW5xbG83NnE1cSJ9.Fx5Gu72P14nE2qcVshLMbg';

const stationMarkers = [];
const stationData = {}, stationsByName = {}, options = [];
const searchBar = sel('#searchBar');
const months = ['October 2017', 'November 2017', 'Decmber 2017', 'January 2018', 'February 2018', 'March 2018', 'April 2018', 'May 2018', 'June 2018', 'July 2018', 'August 2018', 'September 2018', 'October 2018']
const month_keys = ['oct17', 'nov17', 'dec17', 'jan18', 'feb18', 'mar18', 'apr18', 'may18', 'jun18', 'jul18', 'aug18', 'sep18', 'oct18'];

let newMap = null;
let satelliteLayer = null;
let streetsLayer = null;

let counter = 4;

// MAIN

main();

function main()
{
    cout('hi from the main thread');

    newMap = createMap();

    const worker = new Worker('worker.js');
    worker.onmessage = event => handleRow(event, newMap);
}

// FUNCTIONS

function createMap()
{
    const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    const tileOptions = { attribution, accessToken, maxZoom: 18 };
    const mapBoxURL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';

    satelliteLayer = L.tileLayer(mapBoxURL, {...tileOptions, id: 'mapbox.satellite'});
    streetsLayer = L.tileLayer(mapBoxURL, {...tileOptions, id: 'mapbox.streets'});
    const mapOptions = {
        preferCanvas: true,
        layers: [satelliteLayer],
        center: NDLScoords,
        zoom: 10
    };
    const newMap = L.map('mapid', mapOptions)

    return newMap;
}

const normalizeStationName = name => name.trim().toLowerCase();
const roundValue = value => Math.round((value + Number.EPSILON) * 100) / 100;

function handleRow(event, newMap)
{
    if(event.data === 'done')
    {
        cout('worker is done');
        return nextStage(newMap);
    }

    if(event.data.length < 1)return cout('length of row < 1');

    const data = event.data[0];
    if(!isValid(data))
    {
        if(counter < 1)return;
        counter--;
        cout('event:', event)
        return cout('data is not valid');
    }
    const normalized_name = normalizeStationName(data.station_name);

    stationData[data.station_code] = data;
    stationsByName[normalized_name] = data;
  
    //const delayColor = {color: '#FF0000', colorClass: 'red'};

    const red = blueToRed(data.yr_mean);
    const delayColor = {color: `rgb(${red}, 0, ${255 - red})`, colorClass: 'red'}

    for(let i = 0, threshold = DELAY_MIN; i < PARTITIONS; i++, threshold += STEP)
    {
        if(data.yr_mean < threshold)break;
        delayColor.colorClass = delayRangeColors[i];
    }
    /*
    for(let threshold in delayRange)
    {
        if(data.yr_mean < threshold)
        {
            const [color, colorClass] = delayRange[threshold];
            //delayColor.color = color;
            delayColor.colorClass = colorClass;
            break;
        }
    }
    */

    const google_chart_string = `<google-chart type="line" options='{"chartArea":{"width": "100%", "height": "80%"}}' data='[["Month", "Delay", {"type":"number", "role":"interval"}, {"type":"number", "role":"interval"}],` +
    months.map((month, i) => {
        const key = month_keys[i];
        const mean = roundValue(data[key + '_mean']);
        const std = roundValue(data[key + '_std']) / 10;
        const lower = roundValue(mean - std);
        const upper = roundValue(mean + std);
        return `["${month}",${mean},${lower},${upper}]`;
    }).join(',') +
    `]'></google-chart>`;

    const stationPopupHtml = `
    ${google_chart_string}
    <div class="station_name">${data.station_name}(${data.station_code})</div>
    <div class="station_delay ${delayColor.colorClass}">

    <div>Time period</div><div>Mean delay<br/>(in minutes)</div><div>Standard deviation<br/>of delay</div>
    <div>Oct 2017 to Oct 2018</div><div>${roundValue(data.yr_mean)}</div><div>${roundValue(data.yr_std)}</div>` +
    months.map((month, i) => {
        const key = month_keys[i];
        const mean = roundValue(data[key + '_mean']);
        const std = roundValue(data[key + '_std']);
        return `<div>${month}</div><div>${mean}</div><div>${std}</div>`;
    }).join('') +
    `<div>Christmas 2017</div><div>${roundValue(data.christmas17_mean)}</div><div>${roundValue(data.christmas17_std)}</div>
    <div>Diwali 2018</div><div>${roundValue(data.diwali18_mean)}</div><div>${roundValue(data.diwali18_std)}</div>
    <div>Holi 2018</div><div>${roundValue(data.holi18_mean)}</div><div>${roundValue(data.holi18_std)}</div>
    
    </div>
    `;
  
    const marker = L.circleMarker([data.longitude, data.latitude], {radius: 1, color: delayColor.color})
    marker.bindPopup(stationPopupHtml);//.addTo(newMap);
    stationMarkers.push(marker);

    stationData[data.station_code].marker = marker;
    stationsByName[normalized_name].marker = marker;

    const option = document.createElement('option');
    option.value = normalized_name;
    options.push(option);
}

function isValid(data)
{
    if(!('latitude' in data) || data['latitude'] === null)return false;
    if(!('longitude' in data) || data['longitude'] === null)return false;
    if(!('station_code' in data) || data['station_code'] === null)return false;
    return true;
}

function nextStage(newMap)
{
    const stationsLayer = L.layerGroup(stationMarkers);
    newMap.addLayer(stationsLayer);
    var baseMaps = {
        "Satellite": satelliteLayer,
        "Streets": streetsLayer
    };
    var overlayMaps = {
        "Stations": stationsLayer
    };
    L.control.layers(baseMaps, overlayMaps).addTo(newMap);

    const dataList = document.createElement('datalist');
    dataList.id = 'stations-name-list';
    dataList.append(...options);
    document.body.appendChild(dataList);

    // Hack for firefox for desktop start.
    // Firefox version 70.0.1 on Windows 10 doesn't fire change event when a option is selected.
    searchBar.addEventListener('keyup', e =>
    {
        if(e.key !== 'Enter')return;
        handleSearch();
    });
    // Hack for firefox for desktop end.

    searchBar.addEventListener('change', () => handleSearch());

    const saveButton = sel('#save');
    saveButton.addEventListener('click', () => handleClickSave(saveButton, newMap));
    const loading = sel('#loading');
    loading.classList.add('hidden');

    stationData['NDLS'].marker.openPopup();
}

function handleSearch()
{
    const query = searchBar.value.trim().toUpperCase();
    if(query in stationData)
    {
        cout('Found it');
        const station = stationData[query];
        newMap.panTo([station.longitude, station.latitude]);
        station.marker.openPopup();
    }
    else if(query.toLowerCase() in stationsByName)
    {
        cout('Found it');
        const station = stationsByName[query.toLowerCase()];
        newMap.panTo([station.longitude, station.latitude]);
        station.marker.openPopup();
    }
    else
    {
        return alert("Couldn't find station");
    }
}

function blueToRed(delay)
{
    let x = 0;
    if(delay > DELAY_MAX)x = 1;
    else if(delay < DELAY_MIN)x = 0;
    else x = (delay - DELAY_MIN) / DELAY_RANGE;

    return x * 255;
}

function handleClickSave(saveButton, map)
{
    const loading = sel('#loading');
    loading.classList.remove('hidden');

    leafletImage(map, (err, canvas) => {
        loading.classList.add('hidden');

        if(err)return cout(err);

        const filename = `map_saved_at_${Date()}.png`;
        canvas.toBlob(blob => saveAs(blob, filename));
    });
}