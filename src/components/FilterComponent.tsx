import React from 'react';
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

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export function FilterComponent() {
  console.log(mockdata);
  const peopleData: PersonData[] = mockdata;

  return (
    <>
      <PersistentSearchBarContainer>
        <PersistentSearchBar />
      </PersistentSearchBarContainer>
      <ResultsContainer>
        {peopleData.slice(0, 9).map((data) => (
          <Result
            key={data.id}
            name={data.name}
            avatar={data.avatar}
            description={data.description}
          />
        ))}
      </ResultsContainer>
    </>
  );
}
