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

// -----------------------------------------------------
//  LOAD CODEBOOK
// -----------------------------------------------------
let CODEBOOK = {};
(async () => {
  try {
    const res = await fetch("./js/codebook.js");
    const text = await res.text();
    // Evaluate the JS file to load CODEBOOK
    eval(text);
  } catch (err) {
    console.error("Failed to load codebook.js", err);
  }
})();

// -----------------------------------------------------
//  CLIENT-SIDE GEOCODING (with caching)
// -----------------------------------------------------

const geocodeCache = {};

async function geocodeAddress(address) {
  if (!address) return null;

  if (geocodeCache[address]) return geocodeCache[address];

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ", Lexington KY")}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "BeaconMap" }
    });
    const json = await res.json();

    if (!json.length) return null;

    const geo = {
      lat: parseFloat(json[0].lat),
      lng: parseFloat(json[0].lon)
    };

    geocodeCache[address] = geo;
    return geo;

  } catch (err) {
    console.error("Geocoding failed:", err);
    return null;
  }
}

// -----------------------------------------------------
//  CATEGORY + TRANSLATION HELPERS
// -----------------------------------------------------

function translateType(type) {
  if (!type) return "";
  return CODEBOOK[type] || type;
}

function detectCategory(type) {
  if (!type) return "EMS";
  const t = type.toUpperCase();
  if (t.startsWith("F")) return "FIRE";
  return "EMS";
}

function getIconForCategory(cat) {
  return cat === "FIRE" ? fireIcon : emsIcon;
}

// -----------------------------------------------------
//  FETCH LEXINGTON INCIDENTS
// -----------------------------------------------------

async function loadLexingtonIncidents() {
  try {
    const response = await fetch("https://lexrescuealerts.jeffreydraper.workers.dev/");
    let data = await response.json();

    if (data.incidents) data = data.incidents;

    fireLayer.clearLayers();
    emsLayer.clearLayers();

    for (const incident of data) {
      const type = incident.type || "";
      const translated = translateType(type);
      const category = detectCategory(type);
      const address = incident.address || "";

      const geo = await geocodeAddress(address);
      if (!geo) continue;

      const marker = L.marker([geo.lat, geo.lng], {
        icon: getIconForCategory(category)
      });

      const apparatusHTML = Object.keys(incident)
        .filter(k => k.startsWith("aa"))
        .map(k => incident[k])
        .join("<br>");

      marker.bindPopup(`
        <b>${category}</b><br>
        ${type} - ${translated}<br><br>

        Incident: ${incident.incident || ""}<br>
        Alarm: ${incident.alarm || ""}<br>
        Address: ${address}<br>
        Enroute: ${incident.enroute || ""}<br>
        Arrive: ${incident.arrive || ""}<br><br>

        ${apparatusHTML ? `<strong>Units:</strong><br>${apparatusHTML}` : ""}
      `);

      if (category === "FIRE") {
        fireLayer.addLayer(marker);
      } else {
        emsLayer.addLayer(marker);
      }
    }

    fireLayer.addTo(map);
    emsLayer.addTo(map);

  } catch (err) {
    console.error("Lexington incident load failed:", err);
  }
}

loadLexingtonIncidents();
setInterval(loadLexingtonIncidents, 60000);
