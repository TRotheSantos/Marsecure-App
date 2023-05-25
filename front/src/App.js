import "./App.css";
import React, {useState, useEffect} from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader, LoadScript, DirectionsService, DirectionsRenderer, Polyline  } from "@react-google-maps/api";

const containerStyle = {
    width: "100vw",
    height: "96vh",
};

const zoom = 15;
const center = {
    lat: 43.295619380624494,
    lng: 5.373698165000376,
};

const streetNames = ["Av. du Prado, Marseille", "Cr Lieutaud, Marseille"]; // Array of street names to highlight

function App() {
        
    const [infoWindowKey, setInfoWindowKey] = useState(0);
    const [infoWindow, setInfoWindow] = useState(null);
    const [option, setOption] = useState('lights');
    const [description, setDescription] = useState('');

    const [paths, setPaths] = useState([]);

    // for the fetchStreetCoordinates Middle
    const [streetPaths, setStreetPaths] = useState([]);


    useEffect(() => {
        Promise.all(streetNames.map((name) => fetchStreetCoordinatesDEBFIN(name)))
            .then((results) => {
                setPaths(results);
            })
            .catch((error) => {
                console.error("Failed to fetch street coordinates:", error);
              });
        console.log(paths);
    }, []);


    // Provides DEBUT and FIN coordinates of a given street 
    const fetchStreetCoordinatesDEBFIN = async (streetName) => {
        const geocoder = new window.google.maps.Geocoder();
        try {
          const results = await geocodeAddress(geocoder, streetName);
      
          if (results.length > 0) {
            const startCoordinates = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            };
      
            const endCoordinates = {
              lat: results[results.length - 1].geometry.location.lat(),
              lng: results[results.length - 1].geometry.location.lng(),
            };
      
            return { startCoordinates, endCoordinates };
          } else {
            throw new Error("No results found for the provided street name.");
          }
        } catch (error) {
          throw new Error("Failed to geocode street: " + error.message);
        }
      };
      
      const geocodeAddress = (geocoder, address) => {
        return new Promise((resolve, reject) => {
          geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
              resolve(results);
            } else {
              reject(new Error(status));
            }
          });
        });
      };
      
      


    // Function to fetch the coordinates of the middle of each street from the streetNames array. Works
    const fetchStreetCoordinates = async () => {
        const geocoder = new window.google.maps.Geocoder();
  
        //works
        const fetchCoordinate = async (streetName) => {
          return new Promise((resolve, reject) => {
            geocoder.geocode({ address: streetName }, (results, status) => {
              if (status === "OK" && results.length > 0) {
                const coordinates = results[0].geometry.location;
                resolve(coordinates);
              } else {
                reject();
              }
            });
          });
        };
  
        const streetCoordinates = [];
  
        for (const streetName of streetNames) {
          try {
            const coordinates = await fetchCoordinate(streetName);
            console.log(`Coordinates for ${streetName}:`, coordinates.lat(), coordinates.lng());
            streetCoordinates.push(coordinates);

          } catch (error) {
            console.log(`Failed to fetch coordinates for ${streetName}`);
          }
        }
        setStreetPaths(streetCoordinates);
      };

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyCDB95dhVP6ZyBgqoIMW1LCGEFWcs_k_EM",
    });

    function handleOptionChange(event) {
        setOption(event.target.value); // Update the selected option in the state
      }
      
    function handleDescriptionChange(event) {
        setDescription(event.target.value); // Update the description in the state
    }

    const handleMapClick = (event) => {
        const clickedPosition = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
    };
        setInfoWindow(clickedPosition);
        setInfoWindowKey((prevKey) => prevKey + 1); // Change the key to reopen the InfoWindow
    };

    // Adds a new Entry when Submitting
    const handleSubmit = event => {
        event.preventDefault(); // no reloading of page
        const newEntry = {
            id:   0,
            subject: option,
            street: getStreetNameFromCoordinates(infoWindow.lat, infoWindow.lng),
            coord:{lat: infoWindow.lat, lng: infoWindow.lng },
            description: description
        };
        setDescription("");
        // Confirmation Window
        alert("Thank you for making your city a safer place!");
        // Close the InfoWindow
        setInfoWindow(null);
        fetch('http://localhost:4000/api', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEntry)
        })
            .then(response => response.json())

            .catch(error => {
            console.log(error)
            alert('An error occurred while adding the issue. Please try again later.');
            }); 
        };

          const getStreetNameFromCoordinates = async (latitude, longitude) => {
            const geocoder = new window.google.maps.Geocoder();
          
            const location = new window.google.maps.LatLng(latitude, longitude);
          
            return new Promise((resolve, reject) => {
              geocoder.geocode({ location }, (results, status) => {
                if (status === "OK" && results.length > 0) {
                  const streetName = results[0].formatted_address;
                  resolve(streetName);
                } else {
                  reject(new Error("Failed to reverse geocode coordinates."));
                }
              });
            });
          };
          

    return isLoaded ? (
      
        <div className="App" >
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
                    <InfoWindow key={infoWindowKey} position={infoWindow}>
                    <form onSubmit={handleSubmit} >     
                    <div>New Entry at  ({infoWindow.lat}/{infoWindow.lng})</div><pre></pre>
                    <label>
                        What have you noticed?: <pre></pre>
                        <select value={option} onChange={handleOptionChange}>
                            <option value="lights">Lights Broken</option>
                            <option value="traffic">Messy Traffic</option>
                            <option value="pot">Potholes</option>
                            <option value="construct">Dirty / Unaccessible Construction Zone</option>
                            <option value="sidewalk">Small Sidewalk</option>
                        </select>
                    </label>
                    <pre></pre>
                    <label>
                        Briefly explain the issue: <pre></pre>
                        <input 
                        className="descriptionfield" 
                        type="text"
                        maxLength="100" 
                        value={description}
                        onChange={handleDescriptionChange}
                     />
                    </label> <pre></pre>
                    <input type="submit" value="Submit" />
                    </form>
                    </InfoWindow>
                    )}
      
        {/* Render coloured street for array */}
        {/* {console.log("Street Paths:", streetPaths) */}
          
        {paths.map((promise, index) => (
  <Polyline
    key={index}
    path={[promise.startCoordinates, promise.endCoordinates]}
    options={{
      strokeColor: "red",
      strokeOpacity: 10,
      strokeWeight: 14,
    }}
  />
))}

        </GoogleMap>
        </div>
        
    ) : (
        <>Loading...</>
    );
}

export default App;


