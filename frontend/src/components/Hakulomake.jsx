import { useState } from "react";

// Tällä hakulomake-komponentilla voidaan hakea englanninkielinen vastine suomenkieliselle sanalle
function Hakulomake() {
  // Määritellään tilamuuttujat(? onkohan tämä oikea sana tuosta useStatesta suomeksi) käyttäen useState-hookia
  const [suomiSana, setSuomiSana] = useState(""); // Suomenkielinen sana, jonka käyttäjä syöttää
  const [englantiSana, setEnglantiSana] = useState(""); // Haettu englanninkielinen sana

  // Funktio, joka hakee suomenkieliselle sanalle englanninkielisen vastineen backendista
  const haeSana = async () => {
    // Lähetetään GET-pyyntö backendille, käyttäen suomenkielistä sanaa URL-parametrina
    const response = await fetch(`http://localhost:3000/words/${suomiSana}`);
    const data = await response.json(); // Muutetaan vastauksen sisältö JSON-muotoon

    // Tarkistetaan, löytyikö sana ja asetetaan englanninkielinen sana
    if (response.ok) {
      setEnglantiSana(data.eng); // Jos löytyi, asetetaan haettu englanninkielinen sana
    } else {
      setEnglantiSana("Sanaa ei löytynyt"); // Jos sanaa ei löytynyt, näytetään virheviesti
    }
  };

  return (
    <div>
      <h2>Hae englanninkielinen vastine</h2>
      {/* Input-kenttä suomenkieliselle sanalle */}
      <input
        type="text"
        value={suomiSana}
        onChange={(e) => setSuomiSana(e.target.value)} // Päivitetään suomenkielinen sana
        placeholder="Anna suomenkielinen sana"
      />
      {/* Painike, joka lähettää hakupyynnön backendille kun sitä painetaan */}
      <button onClick={haeSana}>Hae</button>
      {/* Näytetään haettu englanninkielinen sana tai virheviesti */}
      <p>Englanninkielinen vastine: {englantiSana}</p>
    </div>
  );
}

export default Hakulomake;
