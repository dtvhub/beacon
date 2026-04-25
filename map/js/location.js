// -----------------------------------------------------
//  USER LOCATION LAYER (PULSING ICON)
// -----------------------------------------------------

const userLocationLayer = L.layerGroup();
let locationWatchInterval = null;

// Create a pulsing marker using a Leaflet divIcon + CSS animation
const pulsingIcon = L.divIcon({
  className: "pulsing-user-icon",
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

// Update the user's location
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

      L.marker([lat, lng], { icon: pulsingIcon })
        .bindPopup("You are here")
        .addTo(userLocationLayer);
    },
    (err) => console.error("Location error:", err),
    { enableHighAccuracy: true }
  );
}

// Enable live tracking
function enableLocationTracking() {
  updateUserLocation(); // immediate update

  if (!locationWatchInterval) {
    locationWatchInterval = setInterval(updateUserLocation, 10000);
  }
}

// Disable live tracking
function disableLocationTracking() {
  if (locationWatchInterval) {
    clearInterval(locationWatchInterval);
    locationWatchInterval = null;
  }

  userLocationLayer.clearLayers();
}
