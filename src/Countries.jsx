import { useEffect, useState } from "react";

const CountryCard = ({ name, flag, alttext }) => {
  return (
    <div
      className="countryCard" 
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
        border: "1px solid black",
        borderRadius: "8px",
        height: "200px",
        width: "200px",
        margin: "10px",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <img
        src={flag}
        alt={alttext}
        style={{
          width: "100px",
          height: "100px",
        }}
      />
      <h2>{name}</h2>
    </div>
  );
};

const API_URL = "https://restcountries.com/v3.1/all";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const jsonResponse = await response.json();
        setCountries(jsonResponse);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);


  const filteredCountries = countries.filter((country) =>
    (country.name?.common || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{
          display: "block",
          margin: "20px auto",
          padding: "10px",
          width: "80%",
          maxWidth: "400px",
          fontSize: "16px",
          textAlign: "center",
        }}
      />
      
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center", 
        }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryCard
              key={country.cca3} 
              name={country.name?.common || "Unknown"} 
              flag={country.flags?.png || ""} 
              alttext={country.cca3} 
            />
          ))
        ) : (
          <p>No countries match your search criteria.</p>
        )}
      </div>
    </div>
  );
}

export default Countries;
