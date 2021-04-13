import React, { useRef, useEffect } from 'react';
import './globalStyles/main.css';
import { FilterComponent } from './components/FilterComponent';
import { ReactComponent as Logo } from './svgs/logo.svg';
import styled from 'styled-components';

const BackToTopButton = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  margin: 0;
  padding: 0;
  text-align: initial;
  line-height: 1.3125rem;
  font-size: var(--fs-400);
  color: var(--clr-neutral-600);

  &:hover {
    text-decoration: underline;
  }
`;

const BackToTopButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: sticky;
  left: 0;
  bottom: 0;
  background-color: var(--clr-neutral-100);
  width: 100%;
  padding: 1rem 0;
  opacity: 1;
  visibility: visible;
  transition: all 0.2s ease;

  &.hidden {
    opacity: 0;
    visibility: hidden;
  }
`;

const BackToTopObserverTarget = styled.div`
  position: absolute;
  height: 120vh;
`;

function App() {
  const backToTopObserverTargetRef = useRef<HTMLDivElement>(null);
  const backToTopButtonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          backToTopButtonContainerRef.current?.classList.toggle(
            'hidden',
            entry.isIntersecting
          );
        });
      },
      {
        root: null,
        threshold: 0
      }
    );

    backToTopObserverTargetRef.current &&
      observer.observe(backToTopObserverTargetRef.current);
  }, []);

  return (
    <div className="App container">
      <BackToTopObserverTarget
        className="backToTopTarget"
        ref={backToTopObserverTargetRef}
      />
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
      <BackToTopButtonContainer ref={backToTopButtonContainerRef}>
        <BackToTopButton
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
        >
          Back to Top
        </BackToTopButton>
      </BackToTopButtonContainer>
    </div>
  );
}

export default App;
