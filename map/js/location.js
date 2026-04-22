// -----------------------------------------------------
//  USER LOCATION LAYER
// -----------------------------------------------------

const userLocationLayer = L.layerGroup();
let locationWatchInterval = null;

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

      const userIcon = L.icon({
        iconUrl: "https://copilot.microsoft.com/th/id/BCO.570c5ff4-262a-4a69-b705-c282153d4737.png",
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

// Enable live tracking (called when toggle is turned ON)
function enableLocationTracking() {
  updateUserLocation(); // immediate update

  // Start auto-refresh every 10 seconds
  if (!locationWatchInterval) {
    locationWatchInterval = setInterval(updateUserLocation, 10000);
  }
}

// Disable live tracking (called when toggle is turned OFF)
function disableLocationTracking() {
  if (locationWatchInterval) {
    clearInterval(locationWatchInterval);
    locationWatchInterval = null;
  }

  userLocationLayer.clearLayers();
}
