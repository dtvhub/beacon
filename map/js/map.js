// -----------------------------------------------------
//  CREATE THE LEAFLET MAP
// -----------------------------------------------------

// Create the map centered on Lexington
const map = L.map("map").setView([38.0464, -84.4970], 12);

// Add a guaranteed-working dark tile layer
L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png", {
  maxZoom: 20,
  attribution: "&copy; Stadia Maps, OpenMapTiles & OpenStreetMap contributors"
}).addTo(map);

console.log("MAP JS LOADED");
