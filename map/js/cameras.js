// -----------------------------------------------------
//  CAMERAS LAYER FOR BEACON MAP
// -----------------------------------------------------

// Custom camera icon
const cameraIcon = L.icon({
  iconUrl: 'https://github.com/dtvhub/beacon/blob/main/map/assets/images/icons/camera.png?raw=true',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28]
});

// -----------------------------------------------------
//  CAMERA GEOJSON LAYER (fixed syntax errors)
// -----------------------------------------------------

const cameraLayer = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Raven Run Nature Sanctuary",
        "category": "camera",
        "url": "https://dtvhub.github.io/beacon/ro/redirect/Raven_Run.html"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-84.4097, 37.8993]
      }
    },

    {
      "type": "Feature",
      "properties": {
        "name": "Hazcam: Nicholasville, KY",
        "category": "camera",
        "url": "https://video.hazcams.com/nicholasville-ky-us-001/main_stream.m3u8"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-84.5705, 37.8413]
      }
    }

    // Add more cameras here as needed
  ]
};

// -----------------------------------------------------
//  CREATE CAMERA LAYER
// -----------------------------------------------------

const cameras = L.geoJSON(cameraLayer, {
  pointToLayer: (feature, latlng) => {
    return L.marker(latlng, { icon: cameraIcon });
  },
  onEachFeature: (feature, layer) => {
    layer.bindPopup(`
      <strong>${feature.properties.name}</strong><br>
      <a href="${feature.properties.url}" target="_blank">Open Camera</a>
    `);
  }
});

// Add to map
cameras.addTo(map);
