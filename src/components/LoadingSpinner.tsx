import styled from 'styled-components';

export const LoadingSpinner = styled.div`
  pointer-events: none;
  width: 2.5rem;
  height: 2.5rem;
  border: 0.4rem solid transparent;
  border-color: var(--clr-neutral-200);
  border-top-color: var(--clr-primary-700);
  border-radius: 50%;
  animation: loadingspin 1s linear infinite;

  @keyframes loadingspin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
