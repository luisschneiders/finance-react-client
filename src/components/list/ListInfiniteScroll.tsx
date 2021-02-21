import React from 'react';

interface ContainerProps {
  children?: React.ReactNode;
}

const LsListInfiniteScroll: React.FC<ContainerProps> = ({children}) => {

  return (
    <>
      {children}
    </>
  );
};

export default LsListInfiniteScroll;
