import axios from "axios";
import React, { useEffect, useState } from "react";
import ComponentEntity from "./ComponentEntity";

function GroupProductEntity({ ...props }) {

  // const groupComponent = TempVariable.GroupProductEntity;
  
  const [groupComponent, setGroupcomponent] = useState([]);

  const groupBannerApi = async () => {
    try {
      const response = await axios.post(`/api/entityList/getEntity`, {
        indexName: "entity",
        componentType: "PR",
        compID: props.banner.compID
      });
      let tvar = response.data;
      setGroupcomponent(tvar);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    groupBannerApi();
  }, [])

  return (
    <>
      {groupComponent && <ComponentEntity componentData={groupComponent} />}
    </>
  );
}

export default GroupProductEntity;
