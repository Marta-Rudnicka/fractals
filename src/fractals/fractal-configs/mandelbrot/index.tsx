import { draw } from "./draw";
import { Description } from "./description";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { createImageData } from "./algorithm";
import { ComplexPlaneFractalDisplay } from "../../Components/ComplexPlane/ComplexPlane";

export function MandelbrotSet() {

  const sliders: SliderControlProps[] = [];

  return (<ComplexPlaneFractalDisplay
    createImageData={createImageData}
    range={3}
    startValue={[-2, -1.5]}
    description={Description()}
    draw={draw}
    nextLink="/#/julia"
    prevLink="/#/newton"
    sliders={sliders}
    title="Mandelbrot Set - demo"
    xReal={0}
    xImaginary={0}
  />
  );
}
