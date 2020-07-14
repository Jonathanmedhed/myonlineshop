import React, { Fragment, useState } from "react";
import { Steps } from "primereact/steps";

const StepsComp = ({ steps, step }) => {

  let createSteps = (steps) => {
    let list = [];
    let count = 0;
    steps.forEach((step) => {
      list.push({
        label: step.label,
      });
      count = count + 1;
    });
    return list;
  };

  return (
    <Fragment>
      <div>
        <div>
          <Steps model={steps} activeIndex={step} />
        </div>
      </div>
    </Fragment>
  );
};
export default StepsComp;
