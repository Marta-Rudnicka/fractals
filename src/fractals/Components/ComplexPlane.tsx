import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { canvasInputs, DrawFuncArgs, Point } from "../../types";
import { Complex, add, complex, round } from "mathjs";
import { getSize } from "../utils";
import { SliderControlProps } from "./Controls/SliderControl";
import { FractalDisplay } from "./FractalDisplay";

type ComplexPlaneProps = {
  title: string,
  description: ReactNode,
  draw: (args: DrawFuncArgs) => void,
  nextLink: string,
  prevLink: string,
  createImageData: (size: number, startValue: Complex, range: number ) => ImageData;
  startValue: Complex,
  range: number,
  sliders: SliderControlProps[],
}

export function ComplexPlaneFractalDisplay(props: ComplexPlaneProps) {
  const [fullScreen, setFullScreen] = useState(false);
  const [trackingMouse, setTrackingMouse] = useState(false);
  const [cursorPosition, setCursorPosition] = useState([0, 0] as Point);
  const [startValue, setStartValue] = useState(props.startValue)
  const startDragPosition = useRef([0, 0] as Point);
  const offset = useRef([0, 0] as Point);
  const [range, setRange] = useState(props.range);
  const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));
  const [pixelOffset, setPixelOffset] = useState([0, 0] as Point)
  const imageData = useMemo(() => props.createImageData(canvasSize, startValue, range), [canvasSize, startValue, range, props]);

  useEffect(() => {
    const func = () => {
      const newSize = getSize(fullScreen);
      setCanvasSize(newSize);
    };
    window.addEventListener("resize", func);
    return () => window.removeEventListener("resize", func);
  }, [fullScreen, canvasSize]);

  function handleMouseDown() {
    setTrackingMouse(true)
    const start = cursorPosition;
    startDragPosition.current = start;
  }

  function moveImage() {
    const currentPosition = cursorPosition;
    if (startDragPosition.current) {
      offset.current = [
        currentPosition[0] - startDragPosition.current[0],
        currentPosition[1] - startDragPosition.current[1],
      ]
    }
    setPixelOffset(offset.current);
  }

  function recalculateImage() {
    const pixelIncrement = range / canvasSize;
    if (offset.current[0] !== 0 || offset.current[1] !== 0) {
      const newStartValue = complex(
        startValue.re - offset.current[0] * pixelIncrement,
        startValue.im - offset.current[1] * pixelIncrement
      );
      setPixelOffset([0, 0]);
      setStartValue(newStartValue);
      offset.current = [0, 0];
    }
  }

  function handleMouseMove(val: Point): void {
    setCursorPosition(val)

    if(trackingMouse ) {
      moveImage()
    }
  }

  function handleMouseUp() {
    setTrackingMouse(false);
    startDragPosition.current = [0, 0];
    recalculateImage();
  }

  function updateStartValue(increment: number) {
    const startValueShift = complex(increment, increment)
    const newValue = round(add(startValue, startValueShift), 4);
    setStartValue(newValue);
  }

  function zoomIn() {
    const increment = round(0.1 * range, 4)
    updateStartValue(increment);
    setRange(round(0.80 * range, 4));
    console.log(startValue.re, startValue.im, range)
  }

  function zoomOut() {
    const increment = round(-0.125 * range, 4)
    updateStartValue(increment)
    setRange(round(1.25 * range, 4));
    console.log(startValue.re, startValue.im, range)
  }

  const buttonPairs = [{
      label1: 'zoom in',
      label2: 'zoom out',
      handleClick1: zoomIn,
      handleClick2: zoomOut,
      info: "zoom in or out"
  }];

  const canvasInputs: canvasInputs = {
    onMouseDown: {
      value: cursorPosition,
      toggle: () => handleMouseDown(),
    },
    onMouseUp: {
      value: cursorPosition,
      toggle: () => handleMouseUp(),
    },
    onMouseMove: {
      value: cursorPosition,
      setValue: handleMouseMove,
    }
  };

  return (<FractalDisplay
    canvasInputs={canvasInputs}
    canvasSize={canvasSize}
    description={props.description}
    draw={props.draw}
    drawParameters={{
      imageData,
      pixelOffset: pixelOffset,
    }}
    fullScreen={fullScreen}
    nextLink={props.nextLink}
    prevCanvasSize={100}
    prevLink={props.prevLink}
    setFullScreen={setFullScreen}
    sliders={props.sliders}
    buttonPairs={buttonPairs}
    title={props.title}
  />
  );
}
