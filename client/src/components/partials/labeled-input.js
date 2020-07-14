import React, { Fragment } from "react";

const LabeledInput = ({ icon, setValue, value, name, placeholder }) => {
  return (
    <Fragment>
      <div className="p-inputgroup">
        <span
          className={
            icon && icon.includes("facebook")
              ? "p-inputgroup-addon bg-facebook border-facebook"
              : icon.includes("instagram")
              ? "p-inputgroup-addon bg-instagram border-instagram"
              : icon.includes("linkedin")
              ? "p-inputgroup-addon bg-linkedin border-linkedin"
              : icon.includes("twitter")
              ? "p-inputgroup-addon bg-twitter border-twitter"
              : icon.includes("youtube") &&
                "p-inputgroup-addon bg-youtube border-youtube"
          }
        >
          <i className={icon}></i>
        </span>
        <input
          className={
            icon && icon.includes("facebook")
              ? "border-facebook"
              : icon.includes("instagram")
              ? "border-instagram"
              : icon.includes("linkedin")
              ? "border-linkedin"
              : icon.includes("twitter")
              ? "border-twitter"
              : icon.includes("youtube") && "border-youtube"
          }
          type="text"
          name={name}
          placeholder={placeholder && placeholder}
          value={value}
          onChange={(e) => setValue(e)}
        />
      </div>
    </Fragment>
  );
};
export default LabeledInput;
