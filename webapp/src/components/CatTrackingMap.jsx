import React, { useEffect, useState } from "react";
import { Avatar, Text, VStack } from "@chakra-ui/react";
import { GoogleMap, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import moment from "moment";

const CatTrackingMap = ({ cat, trackingPoint, googleMapsApiKey }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
  });
  const [map, setMap] = useState(null);
  const [location, setLastLocation] = useState({
    lat: trackingPoint.point.latitude,
    lng: trackingPoint.point.longitude,
  });
  const [lastSeen, setLastSeen] = useState(trackingPoint.createdAt);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(location);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    setLastLocation({
      lat: trackingPoint.point.latitude,
      lng: trackingPoint.point.longitude,
    });
    setLastSeen(trackingPoint.createdAt);
  }, [trackingPoint]);

  return isLoaded && cat && location && lastSeen ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={location}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <InfoWindow position={location}>
        <VStack>
          <Avatar src={cat.profilePicture ?? ""} />
          <Text fontWeight={600}>{cat.name}</Text>
          <Text mt={2}>{moment(lastSeen).toNow()}</Text>
        </VStack>
      </InfoWindow>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(CatTrackingMap);
