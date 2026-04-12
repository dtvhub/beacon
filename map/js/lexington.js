// -----------------------------------------------------
//  LEXINGTON FIRE & EMS INCIDENTS (Separate Layers)
// -----------------------------------------------------

const fireLayer = L.layerGroup();
const emsLayer = L.layerGroup();

// Icons
const fireIcon = L.icon({
  iconUrl: "https://github.com/dtvhub/beacon/blob/main/map/assets/images/icons/fire.png?raw=true",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const emsIcon = L.icon({
  iconUrl: "https://github.com/dtvhub/beacon/blob/main/map/assets/images/icons/ems.png?raw=true",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Flexible category detection
function getIncidentIcon(category) {
  const c = (category || "").toUpperCase();
  return c.includes("FIRE") ? fireIcon : emsIcon;
}

function isFire(category) {
  const c = (category || "").toUpperCase();
  return c.includes("FIRE");
}

function isEMS(category) {
  const c = (category || "").toUpperCase();
  return c.includes("EMS") || c.includes("MEDICAL");
}

// -----------------------------------------------------
//  FETCH LEXINGTON INCIDENTS
// -----------------------------------------------------

async function loadLexingtonIncidents() {
  try {
    const response = await fetch("https://lexrescuealerts.jeffreydraper.workers.dev/");
    let data = await response.json();

    // Some feeds wrap incidents in { incidents: [...] }
    if (data.incidents) data = data.incidents;

    fireLayer.clearLayers();
    emsLayer.clearLayers();

    data.forEach(incident => {
      // Flexible field detection
      const category = incident.category || incident.type || "";
      const code = incident.code || incident.callcode || "";
      const translated = incident.translated || incident.description || "";
      
      const geo = incident.geo || incident.location || {};
      const lat = geo.lat || geo.latitude;
      const lng = geo.lng || geo.lon || geo.longitude;

      if (!lat || !lng) return;

      const marker = L.marker([lat, lng], {
        icon: getIncidentIcon(category)
      });

      const apparatusHTML = incident.apparatus
        ? `<br><br><strong>Units:</strong><br>${incident.apparatus.join("<br>")}`
        : "";

      marker.bindPopup(`
        <b>${category}</b><br>
        ${code} - ${translated}<br><br>

        Incident: ${incident.incident || ""}<br>
        Alarm: ${incident.alarm || ""}<br>
        Address: ${incident.address || ""}<br>
        Enroute: ${incident.enroute || ""}<br>
        Arrive: ${incident.arrive || ""}
        ${apparatusHTML}
      `);

      // Correct layer assignment
      if (isFire(category)) {
        fireLayer.addLayer(marker);
      } else if (isEMS(category)) {
        emsLayer.addLayer(marker);
      } else {
        // Default to EMS if unknown
        emsLayer.addLayer(marker);
      }
    });

    fireLayer.addTo(map);
    emsLayer.addTo(map);

  } catch (err) {
    console.error("Lexington incident load failed:", err);
  }
}

loadLexingtonIncidents();
setInterval(loadLexingtonIncidents, 60000);
