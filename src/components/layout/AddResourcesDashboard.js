import React, { Fragment } from "react";
import ResourceForm from "../forms/ResourceForm";
import Resources from "../resources/Resources";

export default function Dashboard() {
  return (
    <Fragment>
      <ResourceForm />
      <Resources />
    </Fragment>
  );
}
