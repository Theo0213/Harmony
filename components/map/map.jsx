import "leaflet/dist/leaflet.css";
import "next-leaflet-cluster/lib/assets/MarkerCluster.css";
import "next-leaflet-cluster/lib/assets/MarkerCluster.Default.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";

import L from "leaflet";
import MarkerClusterGroup from "next-leaflet-cluster";
import PopUpHost from "./subComponent/popUpHost";
import PopUpUsers from "./subComponent/popUpUsers";
import style from "./map.module.css";
import { updateUser } from "@utils";
import { useMainStore } from "../../src/store/store";

const MapComponent = ({ users }) => {
  const track = useMainStore((state) => state.track);
  const { imageURL } = track;
  const user = useMainStore((state) => state.user);
  const setUser = useMainStore((state) => state.setUser);

  // par défault, pointe sur la Citadelle de LILLE
  const [position, setPosition] = useState({
    latitude: user?.latitude ?? 50.651536001689726,
    longitude: user?.longitude ?? 3.0436324484364815,
  });

  const saveUser = async (userId, latitude, longitude) => {
    try {
      await updateUser(userId, latitude, longitude);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setPosition({ latitude, longitude });
        setUser({
          ...user,
          latitude: latitude,
          longitude: longitude,
        });
        if (user?.id && latitude && longitude) saveUser(user.id, latitude, longitude);
      });
    }
  }, []);

  useEffect(() => {}, [users]);

  const iconGen = (url) => {
    return L.icon({
      iconUrl: url
        ? url
        : "https://images.bfmtv.com/MCXtMIc-RQ0rXDbz1Bfob9d3P6k=/0x40:768x472/768x0/images/Le-patron-de-Spotify-Daniel-Ek-en-septembre-2016-a-Tokyo-au-Japon-1225197.jpg",
      iconSize: [50, 50], // size of the icon
      className: style.borderIcon,
      popupAnchor: [0, -25],
    });
  };

  return (
    <>
      <MapContainer
        center={[position.latitude, position.longitude]}
        zoom={13}
        className={style.mapContainer}
        maxBounds={[
          [-(85), -180], // Limite inférieure (sud-ouest)
          [85, 180],     // Limite supérieure (nord-est)
        ]}
      >
        <TileLayer
          attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a>| &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}.png?access-token={accessToken}"
          minZoom="3"
          maxZoom="18"
          accessToken="nw1ZpuvpRBIV7xHKRS1bxzUN5NJnBHvQwCpxwO71aQ6IODcqQOComaPpJlO83mMH"
        />
        <MarkerClusterGroup>
          <Marker
            position={[position.latitude, position.longitude]}
            icon={iconGen(imageURL)}
          >
            <Popup>
              <div
                className={`${style.popUpWrapper} leaflet-popup-content-wrapper`}
              >
                <PopUpHost className={style.popUp} />
              </div>
            </Popup>
          </Marker>

          {users &&
            users.map((user) => (
              <Marker
                key={user.id}
                position={[user?.latitude, user?.longitude]}
                icon={iconGen(user?.player?.track?.imageURL)}
              >
                <Popup>
                  <div
                    className={`${style.popUpWrapper} leaflet-popup-content-wrapper`}
                  >
                    <PopUpUsers user={user} />
                  </div>
                </Popup>
              </Marker>
            ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
};

export default MapComponent;
