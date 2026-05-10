// -----------------------------------------------------
//  CREATE THE LEAFLET MAP
// -----------------------------------------------------

// Basemap layers
const darkMatter = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 19,
    attribution: "&copy; CartoDB"
  }
);

const tonerLite = L.tileLayer(
  "https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png",
  {
    maxZoom: 20,
    attribution: "Map tiles by Stamen Design"
  }
);

// Create the map centered on Lexington with Dark Matter as default
const map = L.map("map", {
  center: [38.0464, -84.4970],
  zoom: 12,
  layers: [darkMatter]
});

// -----------------------------------------------------
//  BASEMAP TOGGLE SWITCH (Dark ↔ Light)
// -----------------------------------------------------

// Listen for the toggle switch in your menu
const toggle = document.getElementById("basemapToggle");

if (toggle) {
  toggle.addEventListener("change", function () {
    if (this.checked) {
      // Light mode ON
      map.removeLayer(darkMatter);
      map.addLayer(tonerLite);
      console.log("Switched to Toner Lite (Light Mode)");
    } else {
      // Dark mode ON
      map.removeLayer(tonerLite);
      map.addLayer(darkMatter);
      console.log("Switched to Dark Matter (Dark Mode)");
    }
  });
}

console.log("MAP JS LOADED (Dark/Light Toggle Enabled)");
