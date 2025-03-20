import { useEffect, useState, useCallback } from "react";
import "./App.css";

/* Premessa: Stai sviluppando un campo di ricerca intelligente simile a quello di Amazon.
 Quando l'utente digita, una tendina di suggerimenti mostra i prodotti corrispondenti alla ricerca. Per evitare richieste API eccessive, 
 devi ottimizzare la ricerca con il debounce. */

//!  Milestone 1: Creare un campo di ricerca e mostrare la lista dei suggerimenti

/* Crea un campo di input (<input type="text">) in cui l’utente può digitare.

    Effettua una chiamata API a: 
    https://boolean-spec-frontend.vercel.app/freetestapi/products?search=[query]
        La query deve essere sostituita con il testo digitato.

    Mostra i risultati API sotto l'input in una tendina di suggerimenti.

    Se l'utente cancella il testo, la tendina scompare.

Obiettivo: Mostrare suggerimenti dinamici in base alla ricerca dell'utente. */

//! Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca

/* Attualmente, ogni pressione di tasto esegue una richiesta API. Questo è inefficiente!
    Implementa una funzione di debounce per ritardare la chiamata API fino a quando l’utente smette di digitare per un breve periodo (es. 300ms)
    Dopo l’implementazione, verifica che la ricerca non venga eseguita immediatamente a ogni tasto premuto, ma solo dopo una breve pausa.

Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni. */

function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}
function App() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const fetchApi = (query) => {
    fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => console.error(err));
    console.log("API call:", query);
  };

  const fetchApiDebaunced = useCallback(debounce(fetchApi, 500), []);
  /* useEffect */
  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }
    fetchApiDebaunced(query);
  }, [query]);

  return (
    <>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ricerca qualcosa..."
        />
        {products.length > 0 && (
          <div>
            {products.map((product, i) => (
              <p key={i}>{product.name}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
// brand: "Samsung"
// ​​
// color: "Blue"
// ​​
// description: "Fast and compact external SSD for data storage and transfer."
// ​​
// id: 10
// ​​
// image: "https://fakeimg.pl/500x500/3399ff"
// ​​
// interface: "USB 3.2 Gen 2"
// ​​
// name: "Portable External SSD"
// ​​
// price: 149.99
// ​​
// rating: 4.8
// ​​
// storage_capacity: "500GB"
