L.geoJSON(cameraLayer, {
  onEachFeature: (feature, layer) => {
    layer.bindPopup(`
      <strong>${feature.properties.name}</strong><br>
      <a href="${feature.properties.url}" target="_blank">Open Camera</a>
    `);
  }
}).addTo(map);
