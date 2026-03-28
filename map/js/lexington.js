// -------------------------------------
//  ICONS (kept for future use)
// -------------------------------------
const medIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

const fireIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

// Keep marker array defined (future use)
let activeMarkers = [];


// -------------------------------------
//  FETCH DISABLED
// -------------------------------------
async function fetchLexingtonCalls() {
  console.log("fetchLexingtonCalls(): disabled");
  return [];   // always return empty list
}


// -------------------------------------
//  GEOCODING DISABLED
// -------------------------------------
async function geocodeAddress(address) {
  console.log("geocodeAddress(): disabled");
  return null; // never returns coordinates
}


// -------------------------------------
//  UPDATE MAP DISABLED
// -------------------------------------
async function updateMap() {
  console.log("updateMap(): disabled — no fetching, no markers");
  return; // do nothing
}


// -------------------------------------
//  INITIALIZE (disabled)
// -------------------------------------
updateMap();
// setInterval(updateMap, 60000);  // intentionally not running
