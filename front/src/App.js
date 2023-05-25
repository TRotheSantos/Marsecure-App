import "./App.css";
import React from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "60vw",
    height: "60vh",
};

const zoom = 15;
const center = {
    lat: 43.295619380624494,
    lng: 5.373698165000376,
};

const places = [
    {
        key: "Cool",
        name: "La Friche",
        coord: { lat: 43.31064201725967, lng: 5.39046901171601 },
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    },
    {
        key: "Booo",
        name: "Polytech Luminy",
        coord: { lat: 43.23207174121906, lng: 5.4431462110285045 },
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    },
];

function App() {
    // let entries;
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyCDB95dhVP6ZyBgqoIMW1LCGEFWcs_k_EM",
    });

    fetch("api/entries", {
        method: "GET",
        headers: { "Content-type": "application/json" },
    })
        .then((result) => {
            return result.json();
        })
        .then((data) => console.log(data));

    // const [map, setMap] = React.useState(null);

    // const onLoad = React.useCallback(function callback(map) {
    //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //     // map.setZoom(zoom);

    //     setMap(map);
    // }, []);

    // const onUnmount = React.useCallback(function callback(map) {
    //     setMap(null);
    // }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
        >
            {
                /* Child components, such as markers, info windows, etc. */
                /* We should create the objects in defined functions, not
                map them in the return. Just google how, or we can discuss
                together. */
                places.map((place) => {
                    return (
                        <MarkerF
                            key={place.key}
                            label={place.name} //Not super pretty, wanted to see if it works
                            position={place.coord}
                            icon={place.icon}
                        ></MarkerF>
                    );
                })
            }
            {/* <pre>
                <code>{entries}</code>
            </pre> */}
        </GoogleMap>
    ) : (
        <></>
    );
}

export default App;
