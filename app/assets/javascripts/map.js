// Global coordinates var used for users location
var coords;

function initialize() {
  coords = {lat: 43.471035, lng: -80.544545};

  // Check to see if browser has geo support, then plot users position
  if(navigator.geolocation) {
    // If there is geo support at the position and display on map
    navigator.geolocation.getCurrentPosition(displayOnMap);
  }

  // Adds users location and centers on it on the map
  function displayOnMap(position){
    coords.lat = position.coords.latitude;
    coords.lng = position.coords.longitude;
    marker = handler.addMarker(
      {
        "lat": coords.lat,
        "lng": coords.lng,
        "infowindow": "hello!"
      }
    );
    // Having init map here will block and wait for the users location
    //initMap();
  };

  initMap();
}


function initMap() {

  handler = Gmaps.build('Google');
  handler.buildMap({
      // pass in Google Maps API options in the provider object here
      provider: {
        //disableDefaultUI: true

        // Makes it so the map is not zoomed in so much with only a single marker
        maxZoom: 16,

        // Set the default center of the map
        center: new google.maps.LatLng(coords.lat, coords.lng),

        // Removes the street view option
        streetViewControl: false,

        // Removes fullscreen control
        fullscreenControl: false,

        // Removes the map view controls (satelite/terrain)
        mapTypeControl: false
      },
      // Link to the containing div
      internal: {
        id: 'map'
      }
    },
    function(){

      // Check to see if browser has geo support, then plot users position
      if(!navigator.geolocation) {
        // Otherwise fit the zoom the markers populated on the map
        handler.bounds.extendWith(markers);
        handler.fitMapToBounds();
      }

      // Add markers to map
      // Eventually make a request to backend to fetch markers
      marker = handler.addMarker(
        {
          "lat": coords.lat,
          "lng": coords.lng,
          "infowindow": "hello!"
        }
      );
      handler.map.centerOn(marker);
    }
  );
}
