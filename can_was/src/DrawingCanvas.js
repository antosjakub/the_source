import React, { useRef, useEffect, useState } from 'react';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const handleMouseDown = (event) => {
      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      setLastPoint({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    const handleMouseMove = (event) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const currentPoint = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      context.beginPath();
      context.moveTo(lastPoint.x, lastPoint.y);
      context.lineTo(currentPoint.x, currentPoint.y);
      context.stroke();
      setLastPoint(currentPoint);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    const handleMouseOut = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseout', handleMouseOut);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isDrawing, lastPoint]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    context.clearRect(0,0, rect.width, rect.height);
  }

  return (
    <div>
    <button onClick={clearCanvas}>Wipe canvas</button>
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: '1px solid #000' }}
    />
    </div>
  );
};

export default DrawingCanvas;
