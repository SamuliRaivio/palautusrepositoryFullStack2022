import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/";

  //useEffect is called only when "name" is changed
  useEffect(() => {
    //if name is null (when application starts) nothing happens
    if (name) {
      axios
        .get(baseUrl + name)
        .then((res) =>
          //setting data from api to country and found to true
          setCountry({
            data: {
              name: res.data.name.common,
              capital: res.data.capital,
              population: res.data.population,
              flag: res.data.flags.png,
            },
            found: true,
          })
        )
        //if there is error when getting data from api, found is setted to false
        .catch((err) => {
          setCountry({ found: false });
          console.log(err.message);
        });
    }
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
