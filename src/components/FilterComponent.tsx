import React, { useState } from 'react';
import { PersistentSearchBar } from './PersistentSearchBar/PersistentSearchBar';
import { Result } from './Result';
import styled from 'styled-components';
import mockdata from '../mockdata.json';

interface PersonData {
  id: number;
  name: string;
  email: string;
  avatar: string;
  description: string;
}

const PersistentSearchBarContainer = styled.div`
  margin-bottom: 2.6875rem;
`;

const ResultsContainer = styled.section`
  & article + article {
    margin-top: 1.5rem;
  }
`;

const NoResults = styled.p`
  display: flex;
  justify-content: center;
  line-height: 1.3125rem;
  font-size: var(--fs-400);
  color: var(--clr-neutral-600);
`;

export function FilterComponent() {
  const [displayedData, setDisplayedData] = useState<PersonData[]>(mockdata);
  const [, setIsSearching] = useState(false);

  const onExecuteSearch = (searchValue: string) => {
    setIsSearching(true);
    setDisplayedData(getDisplayedData(searchValue));
    setIsSearching(false);
  };

  const getDisplayedData = (searchValue: string) => {
    return searchValue === ''
      ? mockdata
      : mockdata.filter((data) =>
          data.name.toLowerCase().includes(searchValue.toLowerCase())
        );
  };

  return (
    <>
      <PersistentSearchBarContainer>
        <PersistentSearchBar onExecuteSearch={onExecuteSearch} />
      </PersistentSearchBarContainer>
      <ResultsContainer aria-label="Search Results">
        {displayedData.length ? (
          displayedData.map((data) => (
            <Result
              key={data.id}
              name={data.name}
              avatar={data.avatar}
              description={data.description}
            />
          ))
        ) : (
          // eslint-disable-next-line react/no-unescaped-entities
          <NoResults>Sorry! Couldn't find anyone with that name.</NoResults>
        )}
      </ResultsContainer>
    </>
  );
}
