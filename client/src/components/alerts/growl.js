import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Components
import { Growl } from "primereact/growl";

const GrowlMsg = ({ growls }) => {
  let [growl, setGrowl] = useState([]);

  return (
    <Fragment>
      {growls !== null &&
        growls.length > 0 &&
        growls.map((growl) => (
          <div key={growl.id}>
            {growl.show([
              {
                severity: growl.growlType,
                summary: growl.title,
                detail: growl.msg,
              },
            ])}
            <Growl ref={(el) => (growl = el)} />
          </div>
        ))}
    </Fragment>
  );
};

GrowlMsg.propTypes = {
  growls: PropTypes.array.isRequired, //ptar + enter
};
const mapStateToProps = (state) => ({
  growls: state.growls,
});

export default connect(mapStateToProps)(GrowlMsg);
