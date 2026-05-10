// -----------------------------------------------------
//  CREATE THE LEAFLET MAP
// -----------------------------------------------------

// DARK BASEMAP — Carto Dark Matter (default)
const darkMatter = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 19,
    attribution: "&copy; CartoDB"
  }
);

// LIGHT BASEMAP — Carto Light (Positron)
const lightMap = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 19,
    attribution: "&copy; CartoDB"
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

const toggle = document.getElementById("basemapToggle");

if (toggle) {
  toggle.addEventListener("change", function () {
    if (this.checked) {
      // Light mode ON
      map.removeLayer(darkMatter);
      map.addLayer(lightMap);
      console.log("Switched to Carto Light (Light Mode)");
    } else {
      // Dark mode ON
      map.removeLayer(lightMap);
      map.addLayer(darkMatter);
      console.log("Switched to Dark Matter (Dark Mode)");
    }
  });
}

console.log("MAP JS LOADED (Dark/Light Toggle Enabled)");
