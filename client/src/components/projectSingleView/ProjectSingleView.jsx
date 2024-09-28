//import React from 'react'
import { useParams } from "react-router-dom";

const ProjectSingleView = () => {
  const { id } = useParams();
  console.log(id); // Output: "some-id"

  return <div>ProjectSingleView</div>;
};

export default ProjectSingleView;
