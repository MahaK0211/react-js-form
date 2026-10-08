import React, { useRef, useCallback, useState } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "500px" };
const center = { lat: 13.0827, lng: 80.2707 }; // Chennai

function GoogleMapComponent() {
  const [position, setPosition] = useState(center);
  const autoCompleteRef = useRef(null);

  // When a place is selected from autocomplete
  const onPlaceChanged = useCallback(() => {
    if (autoCompleteRef.current) {
      const place = autoCompleteRef.current.getPlace();
      if (place.geometry) {
        setPosition({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      } else {
        alert("No details available for this location!");
      }
    }
  }, []);

  // Allow placing marker by clicking on the map
  const onMapClick = useCallback((event) => {
    setPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyBq6-iYuHXm12yzzApU7TyNb0shcvj6r4k"} // ✅ use .env
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={12}
        onClick={onMapClick} // ✅ allow manual marker placement
      >
        {/* Search Input */}
        <Autocomplete onLoad={(ac) => (autoCompleteRef.current = ac)} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search location..."
            style={{
              boxSizing: "border-box",
              border: "1px solid gray",
              width: "240px",
              height: "40px",
              padding: "0 12px",
              marginTop: "10px",
              marginLeft: "10px",
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 999,
            }}
          />
        </Autocomplete>

        {/* Marker */}
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapComponent;
