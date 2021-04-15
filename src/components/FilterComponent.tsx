import React, {
  useState,
  useRef,
  PropsWithChildren,
  HTMLAttributes
} from 'react';
import { PersistentSearchBar } from './PersistentSearchBar/PersistentSearchBar';
import { Result } from './Result';
import styled from 'styled-components';
import mockdata from '../mockdata.json';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { LoadingSpinner } from './LoadingSpinner';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
interface PersonData {
  id: number;
  name: string;
  email: string;
  avatar: string;
  description: string;
}

const PersistentSearchBarContainer = styled.div`
  margin-bottom: 2.6875rem;
  position: sticky;
  top: 0;
  z-index: 1;
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

const LoadingSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export function FilterComponent() {
  const [allListData, setAllListData] = useState<PersonData[]>(mockdata);
  const [loadedListData, setLoadedListData] = useState<PersonData[]>([]);

  const isLoadingNextPage = useRef(false);

  const loadNextPage = (visibleStartIndex: number, visibleEndIndex: number) => {
    const loadedData = allListData.slice(
      visibleStartIndex,
      visibleEndIndex + 1
    );
    return loadedData;
  };

  const hasNextPage = () => loadedListData.length < allListData.length;

  const itemsCount = hasNextPage()
    ? loadedListData.length + 1
    : loadedListData.length;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const loadMoreItems = isLoadingNextPage.current
    ? () => Promise.resolve()
    : (visibleStartIndex: number, visibleEndIndex: number) => {
        isLoadingNextPage.current = true;

        return new Promise((resolve, reject) => {
          try {
            const updatedLoadedListData = [
              ...loadedListData,
              ...loadNextPage(visibleStartIndex, visibleEndIndex)
            ];
            setLoadedListData(updatedLoadedListData);
            isLoadingNextPage.current = false;
            resolve(updatedLoadedListData);
          } catch (error) {
            isLoadingNextPage.current = false;
            reject(error);
          }
        });
      };

  const isItemLoaded = (index: number) =>
    !hasNextPage() || index < loadedListData.length;

  const Item = ({
    index,
    style
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const data = loadedListData[index];

    return (
      <>
        {isItemLoaded(index) ? (
          <Result
            key={data.id}
            name={data.name}
            avatar={data.avatar}
            description={data.description}
            style={style}
          />
        ) : (
          <LoadingSpinnerWrapper style={style}>
            <LoadingSpinner />
          </LoadingSpinnerWrapper>
        )}
      </>
    );
  };

  const onExecuteSearch = (searchValue: string) => {
    setAllListData(getFilteredMockData(searchValue));
    setLoadedListData([]);
  };

  function getFilteredMockData(searchValue: string) {
    return searchValue === ''
      ? mockdata
      : mockdata.filter((data) =>
          data.name.toLowerCase().includes(searchValue.toLowerCase())
        );
  }

  const CustomScrollbar = React.useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      React.forwardRef<SimpleBar>(
        (
          {
            children,
            ...props
          }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>,
          ref
        ) => {
          return (
            <SimpleBar scrollableNodeProps={{ ...props }} ref={ref} {...props}>
              {children}
            </SimpleBar>
          );
        }
      ),
    []
  );

  return (
    <>
      <PersistentSearchBarContainer>
        <PersistentSearchBar onExecuteSearch={onExecuteSearch} />
      </PersistentSearchBarContainer>
      <ResultsContainer aria-label="Search Results">
        {allListData.length ? (
          <AutoSizer style={{ height: '100vh' }}>
            {({ height, width }) => (
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                loadMoreItems={loadMoreItems}
                itemCount={allListData.length}
                minimumBatchSize={5}
                threshold={1}
              >
                {({ onItemsRendered, ref }) => (
                  <List
                    outerElementType={CustomScrollbar}
                    height={height}
                    width={width}
                    ref={ref}
                    itemCount={itemsCount}
                    itemSize={() => 120}
                    onItemsRendered={onItemsRendered}
                  >
                    {Item}
                  </List>
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        ) : (
          // eslint-disable-next-line react/no-unescaped-entities
          <NoResults>Sorry! Couldn't find anyone with that name.</NoResults>
        )}
      </ResultsContainer>
    </>
  );
}
