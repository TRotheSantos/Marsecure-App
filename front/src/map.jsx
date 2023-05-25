import React, { useState } from "react";
import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import ClipLoader from "react-spinners/ClipLoader";
import "./map.css";

const containerStyle = {
    width: "100vw",
    height: "96vh",
};

const zoom = 12;
const center = {
    lat: 43.295619380624494,
    lng: 5.373698165000376,
};

function Map() {
    /* Set states and load map */

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyCDB95dhVP6ZyBgqoIMW1LCGEFWcs_k_EM",
    });
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [infoWindow, setInfoWindow] = useState(null);

    /* Functionality */
    const handleMapClick = (event) => {
        const clickedPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setInfoWindow(clickedPosition);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(subject);
        console.log(description);
    };

    const renderMap = () => {
        return (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onClick={handleMapClick}
            >
                {infoWindow && (
                    <InfoWindow position={infoWindow}>
                        <form onSubmit={handleSubmit}>
                            <div>
                                New Entry at ({infoWindow.lat}/{infoWindow.lng})
                            </div>
                            <pre></pre>
                            <label>
                                What have you noticed?: <pre></pre>
                                <form>
                                    <select value={subject}>
                                        <option value="lights">
                                            Lights Broken
                                        </option>
                                        <option value="traffic">
                                            Messy Traffic
                                        </option>
                                        <option value="pot">Potholes</option>
                                        <option value="construct">
                                            Dirty / Unaccessible Construction
                                            Zone
                                        </option>
                                        <option value="sidewalk">
                                            Small Sidewalk
                                        </option>
                                    </select>
                                </form>
                            </label>
                            <pre></pre>
                            <label>
                                Briefly explain the issue: <pre></pre>
                                <input
                                    className="descriptionfield"
                                    type="text"
                                    maxLength="100"
                                    value={description}
                                />
                            </label>{" "}
                            <pre></pre>
                            <input type="submit" value="Submit" />
                        </form>
                    </InfoWindow>
                )}
            </GoogleMap>
        );
    };

    return isLoaded ? (
        renderMap()
    ) : (
        <ClipLoader
            loading={isLoaded}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}

export default Map;
