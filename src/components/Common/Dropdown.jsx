import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";

const Dropdown = React.memo(
  ({ children, setVariable, toggleVariable, ...props }) => {
    const dropdownRef = useRef(null);

    // Handle click outside the dropdown
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          // If the click is outside, close the dropdown
          setVariable(false);
        }
      };

      // Add event listener on mount
      document.addEventListener("mousedown", handleClickOutside);

      // Clean up the event listener on unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [setVariable]);

    const divRef = useRef(null); // Step 1: Create a ref to access the element
    const [position, setPosition] = useState({
      top: 0,
      left: 0,
      width: 0,
      height: 0
    }); // Step 2: Store position in state

    // Step 3: Use useEffect to run code once the component is mounted
    useEffect(() => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect(); // Get position
        setPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        });
      }
    }, [divRef.current]);

    return (
      <Menu
        as="div"
        className={`position-relative ${props.containerClass}`}
        ref={dropdownRef}
      >
        <button
          onClick={() => setVariable((prev) => !prev)} // Toggle the dropdown visibility
          role="button"
          className={`btn outline-none ${props.buttonClass}`}
        >
          {props.buttonContent}
        </button>

        {/* <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 invisiblescale-95"
        enterTo={`transform opacity-100 visible scale-100`}
        leave="transition ease-in duration-75"
        leaveFrom={`transform opacity-100 visible scale-100`}
        leaveTo="transform opacity-0 invisiblescale-95"
      > */}
        <div
          className={`border rounded shadow d-grid gap-2 p-2 overflow-y-auto 
          ${props.childClass}
          ${props.ddposition}
            ${toggleVariable ? "opacity-100 visible" : "opacity-0 invisible"} 
          `}
          ref={divRef}
          style={{
            maxHeight: `calc(100vh - ${position.top}px - 5px)` // Dynamically adjust maxHeight
          }}
        >
          {props.afterClass && (
            <div
              className={`${props.afterClass} position-absolute h-5 w-5 rotate-45 border-t border-l bg-white-100`}
            />
          )}
          {/* <p>Top: {position.top}px</p>
        <p>Left: {position.left}px</p>
        <p>Width: {position.width}px</p>
        <p>Height: {position.height}px</p> */}
          {children}
        </div>
        {/* </Transition> */}
      </Menu>
    );
  }
);

export default Dropdown;
