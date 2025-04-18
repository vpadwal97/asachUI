import { useDispatch } from "react-redux";
import { setDeliveryLocation, setZipCode } from "../../reduxStore/appSlice";

export const updateZipCode = (obj, dispatch) => {
  const addressComponent = obj.address_components;

  // Extract city, state, and country
  const cityComponent = addressComponent.find((component) =>
    component.types.includes("locality")
  );
  const stateComponent = addressComponent.find((component) =>
    component.types.includes("administrative_area_level_1")
  );
  const countryComponent = addressComponent.find((component) =>
    component.types.includes("country")
  );

  const postalCodeComponents = addressComponent.find((component) =>
    component.types.includes("postal_code")
  );

  const ccity = cityComponent ? cityComponent.long_name : "";
  const state = stateComponent ? stateComponent.long_name : "";
  const country = countryComponent ? countryComponent.long_name : "";
  const postalCode = postalCodeComponents ? postalCodeComponents.long_name : "";

  let city;
  let subDis;
  let pinCode;
  let formatted_address = "";

  obj?.address_components?.map((obj, key) => {
    obj.types.map((obj2, key) => {
      if (
        obj2 == "political" ||
        (obj2 == "sublocality" && obj2 == "sublocality_level_1")
      ) {
        city = obj.long_name;
        return;
      }
      if (obj2 == "locality") {
        subDis = obj.long_name;
        return;
      }
      if (obj2 == "postal_code") {
        pinCode = obj.long_name;
        return;
      }
    });
  });
  try {
    formatted_address = obj.formatted_address;
  } catch {}
  dispatch(setDeliveryLocation(`${subDis} , ${city}`));
  dispatch(setZipCode(pinCode));

  return {
    city: city,
    subDis: subDis,
    pinCode: pinCode,
    formatted_address: formatted_address,

    ccity: ccity,
    state: state,
    country: country,
    postalCode: postalCode,
  };
};
