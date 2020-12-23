import React from'react';
import './ImgPlaceholder.scss';

interface ContainerProps {
  size: string | null;
  radius: string | null;
}

const LsImgPlaceholder: React.FC<ContainerProps> = ({size, radius}) => {
  return (
    <div className={`img-placeholder img-placeholder__size-${size} img-placeholder__radius-${radius}`}></div>
  );
}

export default LsImgPlaceholder;
