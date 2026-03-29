// -----------------------------
//  ICONS (Blue for MED, Red for FIRE)
// -----------------------------
const medIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

const fireIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

// Choose icon based on incident type
function getIncidentIcon(type) {
  if (!type) return fireIcon;
  return type.toUpperCase() === "MED" ? medIcon : fireIcon;
}

// -----------------------------
//  GEOCODER (Nominatim)
// -----------------------------
async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  const res = await fetch(url, {
    headers: { "User-Agent": "LexRescueMap" }
  });

  const json = await res.json();
  if (json.length === 0) return null;

  return {
    lat: parseFloat(json[0].lat),
    lng: parseFloat(json[0].lon)
  };
}

// -----------------------------
//  MAIN LAYER LOADER
// -----------------------------
async function loadLexRescueLayer() {
  const url = "https://lexrescuealerts.jeffreydraper.workers.dev/";

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("LexRescue incidents:", data);

    for (const incident of data.incidents) {
      if (!incident.address) continue;

      // Geocode the address
      const geo = await geocodeAddress(incident.address + ", Lexington KY");
      if (!geo) continue;

      // Add marker to map
      L.marker([geo.lat, geo.lng], {
        icon: getIncidentIcon(incident.type)
      })
      .addTo(map)
      .bindPopup(`
        <b>${incident.type}</b><br>
        Incident: ${incident.incident}<br>
        Alarm: ${incident.alarm}<br>
        Address: ${incident.address}<br>
        Enroute: ${incident.enroute}<br>
        Arrive: ${incident.arrive}
      `);
    }

  } catch (err) {
    console.error("Error loading LexRescue layer:", err);
  }
}

// -----------------------------
//  AUTO-REFRESH
// -----------------------------
loadLexRescueLayer();
setInterval(loadLexRescueLayer, 60000); // refresh every 60 seconds
