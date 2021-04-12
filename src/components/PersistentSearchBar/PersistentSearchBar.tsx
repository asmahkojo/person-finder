import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as Magnifying } from '../../svgs/magnifying.svg';
import { ReactComponent as Close } from '../../svgs/close.svg';
import debounce from 'lodash.debounce';

const PersistentSearchBarWrapper = styled.div`
  align-items: center;
  background-color: var(--clr-neutral-200);
  border-radius: 0.25rem;
  display: flex;
  height: 2.5rem;
  max-width: 55rem;
  padding-left: 1rem;
  padding-right: 0.5rem;

  &:focus-within {
    border: 0.0625rem solid var(--clr-primary-300);

    & .magnifyingIcon {
      display: none;
    }
  }
`;

const SearchInputContainer = styled.div`
  margin-right: 1rem;
  max-width: 33rem;
  flex: 1 1 auto;
`;

const SearchInput = styled.input`
  color: var(--clr-neutral-500);
  font-family: 'SF Pro Text', sans-serif;
  height: 1.3125rem;
  width: 100%;
  /* max-width: 10.1875rem; */
  background: transparent;
  border: none;
  font-size: var(--fs-400);
  outline: none;

  &::placeholder {
    color: var(--clr-neutral-500);
  }

  &:focus::placeholder {
    color: var(--clr-neutral-410);
  }
`;

const MagnifyingIcon = styled(Magnifying)`
  & path {
    stroke: var(--clr-neutral-600);
  }
  margin-right: 0.34375rem;
  margin-top: 0.125rem;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  align-content: center;
  border-left: 1px solid var(--clr-neutral-400);
  padding-left: 0.5rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  margin: 0;
  padding: 0;
  text-align: initial;
  width: 1rem;
  height: 1rem;
`;

const CloseIcon = styled(Close)`
  & path {
    stroke: var(--clr-neutral-600);
  }
`;

interface PersistentSearchBarProps {
  onExecuteSearch: (searchValue: string) => void;
}

export function PersistentSearchBar({
  onExecuteSearch
}: PersistentSearchBarProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedExecuteSearch = useRef<(searchValue: string) => void>(
    debounce(onExecuteSearch, 300)
  );

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    debouncedExecuteSearch.current(event.target.value);
  };

  return (
    <PersistentSearchBarWrapper>
      {!searchValue && <MagnifyingIcon className="magnifyingIcon" />}
      <SearchInputContainer>
        <SearchInput
          type="text"
          value={searchValue}
          onChange={handleOnChange}
          placeholder="Search in Air HQ"
        />
      </SearchInputContainer>
      {searchValue && (
        <CloseButtonContainer>
          <CloseButton
            aria-label="Clear Search Text"
            onClick={() => {
              setSearchValue('');
              debouncedExecuteSearch.current('');
            }}
          >
            <CloseIcon />
          </CloseButton>
        </CloseButtonContainer>
      )}
    </PersistentSearchBarWrapper>
  );
}
