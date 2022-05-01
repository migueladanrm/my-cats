import { Container } from "@chakra-ui/react";
import { GoogleApiWrapper, Map } from "google-maps-react";
import React from "react";

function MapContainer(props: any) {
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
  };
  return (
    <Map
      style={{ width: 600, height: 600, position: "relative" }}
      google={props.google}
    ></Map>
  );
}

const CatMap = GoogleApiWrapper({ apiKey: "" })(MapContainer);

export default CatMap;
