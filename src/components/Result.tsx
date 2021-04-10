import React from 'react';
import styled from 'styled-components';

const ResultWrapper = styled.section`
  display: flex;
  gap: 1.5rem;
  min-height: 6rem;
  max-width: 35.9375rem;
`;
const Avatar = styled.img`
  flex: 1 1 5.989375rem;
  min-height: 6rem;
  background: #c4c4c4;
`;

const ResultInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  flex: 1 1 28.450625rem;
`;

const ResultTitle = styled.header`
  font-weight: 700;
`;

const ResultDescription = styled.p`
  color: #666;
`;

interface ResultProps {
  name: string;
  avatar: string;
  description: string;
}

export function Result({ name, avatar, description }: ResultProps) {
  return (
    <ResultWrapper>
      <Avatar alt="Avatar" src={avatar} />
      <ResultInfo>
        <ResultTitle>{name}</ResultTitle>
        <ResultDescription>{description}</ResultDescription>
      </ResultInfo>
    </ResultWrapper>
  );
}
