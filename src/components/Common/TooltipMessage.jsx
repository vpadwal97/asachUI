import React from 'react';
import { IoIosInformationCircle } from "react-icons/io";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const TooltipMessage = ({ ...props }) => {


  return (
    <>
      <OverlayTrigger className={` ${props.overlayTriggerClass}`} overlay={<Tooltip className={` ${props.tooltipClass}`}>{props.tooltipMessage}</Tooltip>}>
        <span>
          {props.children}
        </span>
      </OverlayTrigger>
    </>
  );
};

export default TooltipMessage;
