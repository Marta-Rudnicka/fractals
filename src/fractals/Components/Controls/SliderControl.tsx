import { Collapse, Slider } from "@blueprintjs/core";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Info } from "../../../components/icons/Info";

export type SliderControlProps = {
  label: string;
  minValue: number;
  maxValue: number;
  value: number;
  info: string | ReactNode;
  setValue: Dispatch<SetStateAction<number>>
  labelStepSize? : number
  labelPrecision?: number;
  stepSize?: number
}

export function roundInput(i: number, stepSize: number) {
  let fixedVal = 0;
  const log = Math.log10(stepSize);
  if (log < 0) {
    fixedVal = Math.abs(log -1);
  }
  return parseFloat(i.toFixed(fixedVal));
}

export function SliderControl(props: SliderControlProps){
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen(){
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <div className="slider-container">
      <label>{props.label} <span onClick={toggleIsOpen}><Info/></span></label>
      <Collapse isOpen={isOpen}>{props.info}</Collapse>
        <Slider
          showTrackFill
          min={props.minValue}
          max={props.maxValue}
          value={props.value}
          labelStepSize={props.labelStepSize || props.maxValue - props.minValue}
          onChange={e => props.setValue(roundInput(e, props.stepSize || 1))}
          labelPrecision={props.labelPrecision || 1}
          stepSize={props.stepSize || 1}
        >
          Example text
        </Slider>
    </div>
  );
}
