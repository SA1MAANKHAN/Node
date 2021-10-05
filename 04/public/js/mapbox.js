// const locations = JSON.parse(document.getElementById("map").dataset.locations);

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FsbWFhbmtoYW4iLCJhIjoiY2txbmV0dW13MTI2NTJ2bjRlMHV5d3ltdyJ9.VrhzuuCtdd3ZMjRd7qov6g";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/salmaankhan/ckqngpydr10s418pbx59o7j2p",
});

const bounds = new mapboxgl.LngLatBounds();
locations.forEach((loc) => {
  // Create marker
  const el = document.createElement("div");
  el.className = "marker";

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: "bottom",
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBound(bounds, {
  padding: {
    top: 200,
    bottom: 200,
    left: 100,
    right: 100,
  },
});
