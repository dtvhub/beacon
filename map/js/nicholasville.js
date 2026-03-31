// ===============================
// Nicholasville PulsePoint Layer
// ===============================

// Create the Leaflet layer for Nicholasville
const nicholasvilleLayer = L.layerGroup();

// PulsePoint endpoint for Nicholasville Fire/EMS
const NICHOLASVILLE_URL =
  "https://web.pulsepoint.org/DB/giba/api/v1/incidents?agencyId=EMS1808";

// Main loader function
async function loadNicholasville() {
  try {
    const response = await fetch(NICHOLASVILLE_URL);
    const data = await response.json();

    // Clear old markers before adding new ones
    nicholasvilleLayer.clearLayers();

    if (!data.incidents || data.incidents.length === 0) {
      console.log("Nicholasville: No active incidents");
      return;
    }

    data.incidents.forEach(incident => {
      const lat = incident.latitude;
      const lon = incident.longitude;

      // Skip if coordinates are missing
      if (!lat || !lon) return;

      const type = incident.type || "Incident";
      const address = incident.address || "No address listed";
      const time = incident.eventTime || "";

      const popup = `
        <strong>${type}</strong><br>
        ${address}<br>
        <small>${time}</small>
      `;

      L.marker([lat, lon])
        .bindPopup(popup)
        .addTo(nicholasvilleLayer);
    });

    console.log("Nicholasville incidents loaded:", data.incidents.length);

  } catch (err) {
    console.error("Error loading Nicholasville PulsePoint:", err);
  }
}

// Auto-refresh every 60 seconds
setInterval(loadNicholasville, 60000);

// Initial load
loadNicholasville();
