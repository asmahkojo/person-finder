import React from 'react';
import styled from 'styled-components';

const SearchInputWrapper = styled.div`
  align-items: center;
  background-color: #efefef;
  border-radius: 0.25rem;
  display: flex;
  height: 2.5rem;
  max-width: 55rem;
  opacity: 0.6;
  padding: 0 1.0625rem;
`;

const SearchInputContainer = styled.div`
  border-right: 1px solid #c4c4c4;
  max-width: 33rem;
  flex: 1 1 auto;
`;

const SearchInput = styled.input`
  height: 1.3125rem;
  max-width: 10.1875rem;
  background: transparent;
  border: none;
  font-size: inherit;
`;

export function PersistentSearchBar() {
  return (
    <SearchInputWrapper>
      <SearchInputContainer>
        <SearchInput type="text" placeholder="Search in Air HQ" />
      </SearchInputContainer>
    </SearchInputWrapper>
  );
}
