import "./App.css";
import React, {useState} from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";


const containerStyle = {
    width: "100vw",
    height: "96vh",
};

const zoom = 15;
const center = {
    lat: 43.295619380624494,
    lng: 5.373698165000376,
};





function App() {

    fetch("/api/entries", {
        method: "GET",
        headers: { "Content-type": "application/json" },
    })
        .then((result) => {
            return result.json();
        })
        .then((data) => console.log(data));

    const [option, setOption] = useState('');
    const [description, setDescription] = useState('');

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyCDB95dhVP6ZyBgqoIMW1LCGEFWcs_k_EM",
    });

    const [infoWindow, setInfoWindow] = useState(null);

    const handleMapClick = (event) => {
        const clickedPosition = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setInfoWindow(clickedPosition);
    };

        const handleSubmit = event => {
            event.preventDefault();
            console.log(option);
            console.log(description);
        }


    return isLoaded ? (
        <div className="App">
            <header>

            </header>   
                <nav className ="navbar">
                    <li>
                    <a href="/">Main</a>
                    </li>
                    <li>
                    <a href="/">Latest Entries</a>
                    </li>
                    <li>
                    <a href="/">The Team</a>
                    </li>
                </nav>
                    <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={zoom}
                    onClick={handleMapClick}

                    // onLoad={onLoad}
                    // onUnmount={onUnmount}
                >
                    {infoWindow && (
                    <InfoWindow position={infoWindow}>
                    <form >     
                    {/* onSubmit={handleSubmit} */}
                    <div>New Entry at  ({infoWindow.lat}/{infoWindow.lng})</div><pre></pre>
                    <label>
                        What have you noticed?: <pre></pre>
                        <form>
                        <select value = {option}>
                            <option value="lights">Lights Broken</option>
                            <option value="traffic">Messy Traffic</option>
                            <option value="pot">Potholes</option>
                            <option value="construct">Dirty / Unaccessible Construction Zone</option>
                            <option value="sidewalk">Small Sidewalk</option>
                        </select>
                        </form>
                    </label>
                    <pre></pre>
                    <label>
                        Briefly explain the issue: <pre></pre>
                        <input className="descriptionfield" type="text" maxLength="100" value={description} />
                    </label> <pre></pre>
                    <input type="submit" value="Submit"  />
                    </form>
                    </InfoWindow>
                    )}
                </GoogleMap>
        </div>):("Loading...")
    
}

export default App;


