import { useState } from "react";

// Tämä on Lisayslomake-komponentti, jolla voidaan lisätä uusi sana
function Lisayslomake() {
  // Määritellään tilamuuttujat käyttäen useState-hookia
  const [suomiSana, setSuomiSana] = useState(""); // Suomenkielinen sana
  const [englantiSana, setEnglantiSana] = useState(""); // Englanninkielinen sana
  const [viesti, setViesti] = useState(""); // Viesti onnistumisesta tai virheestä

  // Funktio, joka lähettää suomen ja englannin sanat backendille
  const lisaaSana = async () => {
    // Lähetetään POST-pyyntö backendille
    const response = await fetch("http://localhost:3000/words", {
      method: "POST", // Käytetään POST-metodia uuden sanan lisäämiseksi
      headers: {
        "Content-Type": "application/json", // Tässä määritellään että lähetettävä data on JSON dataa
      },
      body: JSON.stringify({ fin: suomiSana, eng: englantiSana }), // Muutetaan sanat JSON-muotoon
    });

    // Tarkistetaan, onnistuiko lisäys ja asetetaan viesti sen mukaisesti
    if (response.ok) {
      setViesti("Sana lisätty onnistuneesti"); // Jos onnistui
    } else {
      setViesti("Virhe lisäyksessä"); // Jos epäonnistui
    }
  };

  return (
    <div>
      <h2>Lisää uusi sana</h2>
      {/* Input-kenttä suomenkieliselle sanalle */}
      <input
        type="text"
        value={suomiSana}
        onChange={(e) => setSuomiSana(e.target.value)} // Päivitetään suomenkielinen sana
        placeholder="Suomenkielinen sana"
      />
      {/* Input-kenttä englanninkieliselle sanalle */}
      <input
        type="text"
        value={englantiSana}
        onChange={(e) => setEnglantiSana(e.target.value)} // Päivitetään englanninkielinen sana
        placeholder="Englanninkielinen sana"
      />
      {/* Painike, joka lähettää sanat kun sitä painetaan */}
      <button onClick={lisaaSana}>Lisää</button>
      {/* Näytetään viesti lisäyksen onnistumisesta tai epäonnistumisesta */}
      <p>{viesti}</p>
    </div>
  );
}

export default Lisayslomake;
