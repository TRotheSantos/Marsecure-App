import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
// import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import Navbar from "./Navbar.jsx";
import Entrieslist from "./entrieslist.jsx";
import Map from "./map.jsx";

// const containerStyle = {
//     width: "100vw",
//     height: "96vh",
// };

// const zoom = 12;
// const center = {
//     lat: 43.295619380624494,
//     lng: 5.373698165000376,
// };

function App() {
    // const [option, setOption] = useState("");
    // const [description, setDescription] = useState("");

    // const { isLoaded } = useJsApiLoader({
    //     id: "google-map-script",
    //     googleMapsApiKey: "AIzaSyCDB95dhVP6ZyBgqoIMW1LCGEFWcs_k_EM",
    // });

    // const [infoWindow, setInfoWindow] = useState(null);

    // const handleMapClick = (event) => {
    //     const clickedPosition = {
    //         lat: event.latLng.lat(),
    //         lng: event.latLng.lng(),
    //     };
    //     setInfoWindow(clickedPosition);
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(option);
    //     console.log(description);
    // };

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="*" element={<Map />} />
                <Route path="/entries" element={<Entrieslist />} />
            </Routes>
            {/* <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onClick={handleMapClick}
            >
                {infoWindow && (
                    <InfoWindow position={infoWindow}>
                        <form>
                            <div>
                                New Entry at ({infoWindow.lat}/{infoWindow.lng})
                            </div>
                            <pre></pre>
                            <label>
                                What have you noticed?: <pre></pre>
                                <form>
                                    <select value={option}>
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
            </GoogleMap> */}
        </div>
        //  : (
        //     "Loading..."
        // )
    );
}

export default App;
