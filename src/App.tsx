import React from 'react';
import './globalStyles/main.css';
import { FilterComponent } from './components/FilterComponent';
import { ReactComponent as Logo } from './svgs/logo.svg';

function App() {
  return (
    <div className="App container">
      <header className="header">
        <Logo className="logo" />
      </header>
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
