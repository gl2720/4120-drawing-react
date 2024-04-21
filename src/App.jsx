import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  useEffect(() => {
    const canvas = document.getElementById("canvasElement");
    canvasRef.current = canvas;
    const context = canvas.getContext("2d");
    setCtx(context);
  }, []);

  const [drawing, setDrawing] = useState(false)
  const [erase, setErase] = useState(false)
  const [strokeColor, setColor] = useState('#000000')
  const [lineWidth, setWidth] = useState(3)

  const handleDrawDown = (e) => {
    setDrawing(true)
    if (erase) {
    ctx.strokeStyle = 'white'; // bg color
    } else {
    ctx.strokeStyle = strokeColor;
    }
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  }
  const handleDrawMove = (e) => {
    if (drawing) {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    }
  }
  const handleDrawUp = () => {
    setDrawing(false)
  }

  const handleClear = () => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  return (
    <>
      <header>
          <title>Paint</title>
          <p>Go Wild</p>
      </header>
      <div id="container">
      <div id="tools">
          <input type="color" id="colorPicker" value={strokeColor} onChange={(e) => setColor(e.target.value)}/>
          <input type="range" id="sizePicker"  orient="vertical" min="1" max="10" value={lineWidth} onChange={(e) => setWidth(e.target.value)}/>
          <button id="eraseButton" onClick={() => setErase(!erase)} className={erase ? 'clicked' : ''}>Erase</button>
          <button id="clearButton" onClick={handleClear}>Clear All</button>
      </div>
      <canvas id="canvasElement" width="800" height="600" style= {{border: "1px solid black" }}
      onMouseDown={(e) => handleDrawDown(e)} onMouseMove={(e) => handleDrawMove(e)} onMouseUp={handleDrawUp}>hello?</canvas>
      </div>
    </>
  )
}

export default App
