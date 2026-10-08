import { GoogleMap, LoadScript } from "@react-google-maps/api";

function MapFunction() {
  const containerStyle = { width: "100%", height: "400px" };
  const center = { lat: 13.0827, lng: 80.2707 }; // Example: Chennai

  return (
    <LoadScript googleMapsApiKey={"AIzaSyBq6-iYuHXm12yzzApU7TyNb0shcvj6r4k"}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} />
    </LoadScript>
  );
}

export default MapFunction;
