// -----------------------------------------------------
//  LAYER CONTROL FOR BEACON MAP
// -----------------------------------------------------

// Base layers (if you add more later, put them here)
const baseLayers = {};

// Overlay layers (toggleable)
const overlays = {
  "Lexington": lexington,
  "Cameras": cameras
};

// Add the control to the map
L.control.layers(baseLayers, overlays, {
  collapsed: false   // set to true if you want the small button instead
}).addTo(map);
