import React, { useEffect, useState } from 'react';
import { IoIosInformationCircle } from "react-icons/io";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const ErrorIcon = ({ ...props }) => {
  // const [show,setShow]=useState(props.errorMessage);
  // useEffect(()=>{
  //   if(props.errorMessage && props.errorMessage.trim() !== ""){
  //     setShow(true)
  //   }
  // },[props.errorMessage])
  return (
    <>
      {/* <OverlayTrigger className={` ${props.overlayTriggerClass}`} show={show} overlay={<Tooltip className={`ErrorTooltip ${props.tooltipClass}`}>{props.errorMessage}</Tooltip>}>
        <span className="d-inline-block">
          <IoIosInformationCircle className={`font-18 ${props.iconCLass}`}/>
        </span>
      </OverlayTrigger> */}
    </>
  );
};
export default ErrorIcon;