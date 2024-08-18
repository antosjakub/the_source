import React, { forwardRef, useRef, useEffect, useState } from 'react';
import './index.css';

const Canvas = forwardRef((props, ref) => {
  return (
    <canvas
      ref={ref}
      width={props.width}
      height={props.height}
    />
  )
});

export default Canvas;
