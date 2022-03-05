import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  // const [loader, setLoader] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    (async function () {
      const { data } = await axios.get("/api/addresses");
      setAddresses(data.addresses);
      // setAddresses((currentAddress) =>
      //   currentAddress.concat({ city: "Tanay" })
      // );
    })();
  }, []);

  const addAddress = async () => {
    const add = {
      id: 101,
      city: newAddress
    };
    // setLoader(true);
    try {
      setMsg("Saving to the server...");
      await axios.post("/api/addresses", { address: add });
      setAddresses((addresses) => [...addresses, add]);
      setNewAddress("");
      setMsg("");
      // setLoader(false);
    } catch (error) {
      setMsg("ERROR!!!");
      console.log("error", error);
      // setLoader("true");
    }
  };
  return (
    <div className="App">
      <h1> address book </h1>
      <input
        type="text"
        value={newAddress}
        placeholder="enter city"
        onChange={(event) => {
          const { value } = event.target;
          setNewAddress(value);
        }}
      />
      <button onClick={addAddress}> Save Address </button>
      {<div>{msg}</div>}
      <ul>
        {addresses.map((address) => (
          <li key={address.id}>{address.city}</li>
        ))}
      </ul>
    </div>
  );
}
