// -----------------------------------------------------
//  USER LOCATION LAYER
// -----------------------------------------------------

const userLocationLayer = L.layerGroup();

function updateUserLocation() {
  if (!navigator.geolocation) {
    console.warn("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      userLocationLayer.clearLayers();

      const userIcon = L.icon({
        iconUrl: 'icons/location.png',   // add your own icon
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      L.marker([lat, lng], { icon: userIcon })
        .bindPopup("You are here")
        .addTo(userLocationLayer);
    },
    (err) => console.error("Location error:", err),
    { enableHighAccuracy: true }
  );
}

// Optional: auto-refresh every 10 seconds
setInterval(updateUserLocation, 10000);

// Initial load
updateUserLocation();
