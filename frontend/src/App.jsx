import { useState } from "react";
import Hakulomake from "./components/Hakulomake";
import Lisayslomake from "./components/Lisayslomake";
import "./App.css";

function App() {
  // Luodaan "state", joka kertoo, mikä sivu on näkyvissä (aina alussa "Etusivu")
  const [sivu, setSivu] = useState("Etusivu");

  // Funktio, joka vaihtaa näkyvän sivun kun painiketta klikataan
  const meneSivulle = (sivu) => (event) => {
    event.preventDefault(); // Estetään sivun uudelleenlataus jotta ei hukata noita useState-hookin arvoja
    setSivu(sivu); // Vaihdetaan näkyvissä oleva sivu
  };

  // Funktio, joka palauttaa oikean sisällön valitun sivun perusteella
  const sisalto = () => {
    // Jos ollaan etusivulla, näytetään painikkeet "Sanojen haku" ja "Sanojen lisäys"
    if (sivu === "Etusivu") {
      return (
        <div>
          <button onClick={meneSivulle("Hakulomake")}>Sanojen haku</button>
          <button onClick={meneSivulle("Lisayslomake")}>Sanojen lisäys</button>
        </div>
      );
    }
    // Jos ollaan hakulomakesivulla, näytetään Hakulomake-komponentti
    else if (sivu === "Hakulomake") {
      return <Hakulomake />;
    }
    // Jos ollaan lisäyslomakesivulla, näytetään Lisayslomake-komponentti
    else if (sivu === "Lisayslomake") {
      return <Lisayslomake />;
    }
  };

  return (
    <>
      {/* Otsikko, joka näkyy aina riippumatta sivusta */}
      <h1>Sanakirja-sovellus</h1>
      {/* Näytetään sisältö valitun sivun perusteella */}
      {sisalto()}
    </>
  );
}

export default App;
