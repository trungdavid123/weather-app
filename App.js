import React, {useState} from 'react';
import './App.css';

function App() {

    const [query, setQuery] = useState("");
    const [location, setLocation] = useState({});
    const [weather, setWeather] = useState({});
    const [found, setFound] = useState(true);
    const [key2, setKey2] = useState(false);

    const api = {
        key : "94e0617a23c2f303678dc7fe38602abc", 
        base : "http://api.weatherstack.com/"
    }

    const search = (evt) => {
        if(evt.key === "Enter") {
            fetch(`${api.base}current?access_key=${api.key}&query=${query}`)
            .then(res => res.json())
            .then(result => { 
                if(result.location !== undefined && query !== ""){
                    setLocation(result.location);
                    setWeather(result.current)
                    setQuery("")
                    setKey2(true)

                } else if(query !== "") {
                    setKey2(true)
                    setQuery("")
                    setFound(!found)
                }
            });
        }
    }

    let date = String(new window.Date());

    date = date.slice(3,15);

    return (
    <div className="app-wrap">
      {(typeof weather.name !== undefined) ? (
        <div className={weather.temperature >= 16 ? "wrap" : "cold"}>
             <header>
              <input 
                 type="text" 
                 className="search-box" 
                 placeholder="Search for a city..." 
                 onChange={e => setQuery(e.target.value)}
                 value={query}
                 onKeyPress={search}
              />
            </header>
            <main>
              {found && key2 ? (
              <div>
                  <section className="location">
                   <div className="city">{location.name !== undefined ? `${location.name},` : "City"} {location.country}</div>
                   <div className="date">{date}</div>
                  </section>
                  <div className="current">
                      <div className="temp">{weather.temperature}<span>°c</span></div>
                      <div className="weather">{weather.weather_descriptions}</div>
                      <div className="hi-low">Cloudcover : {weather.cloudcover}</div>
                  </div>
              </div>
              ) : key2 ? (<div className="current"><h3 className="temp">Not Found</h3></div>) : ""}
            </main>
        </div>
        ) : ("") }
       <div>
       </div>
    </div>
    );
}

export default App;
