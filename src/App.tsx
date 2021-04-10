import React from 'react';
import './App.css';
import { FilterComponent } from './components/FilterComponent';

function App() {
  return (
    <div className="App container">
      <header className="hero"></header>
      <main>
        <article>
          <h1 className="mainTitle">The Person Finder</h1>
          <p className="description">
            If you just can’t find someone and need to know what they look like,
            you’ve come to the right place! Just type the name of the person you
            are looking for below into the search box!
          </p>
          <FilterComponent />
        </article>
      </main>
    </div>
  );
}

export default App;
