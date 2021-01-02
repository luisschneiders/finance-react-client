import React, { useEffect } from 'react';

interface ContainerProps {
  func: Function,
  data: any,
  id: string
}

const LsMainCharts: React.FC<ContainerProps> = ({func, data, id}) => {
  useEffect(() => {
    if (data && data.length) {
      func(data);
    }
  });
  return (
    <>
      <canvas id={id}></canvas>
    </>
  );
};

export default LsMainCharts;
