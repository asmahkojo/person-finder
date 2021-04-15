import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

const ResultWrapper = styled.article`
  display: flex;
  min-height: 6rem;
  max-width: 35.9375rem;
`;
const Avatar = styled.div`
  flex: 0 1 3rem;
  min-height: 6rem;
  margin-right: 1.5rem;

  @media (min-width: 31.25rem) {
    & {
      flex: 0 1 5.989375rem;
    }
  }
`;

const ResultInfo = styled.div`
  flex: 1 1 0;
`;

const ResultTitle = styled.header`
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const ResultDescription = styled.p`
  line-height: 1.3125rem;
  font-size: var(--fs-400);
  color: var(--clr-neutral-600);
`;

interface ResultProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  avatar: string;
  description: string;
}

export function Result({
  name,
  avatar,
  description,
  ...otherProps
}: ResultProps) {
  return (
    <ResultWrapper {...otherProps}>
      <Avatar>
        <img alt={`${name}'s avatar`} src={avatar} />
      </Avatar>
      <ResultInfo>
        <ResultTitle>{name}</ResultTitle>
        <ResultDescription>{description}</ResultDescription>
      </ResultInfo>
    </ResultWrapper>
  );
}
