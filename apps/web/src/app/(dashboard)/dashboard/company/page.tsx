import React from "react";

import { DataTableCompany } from "./components/data-table";

const page = () => {
  return (
    <div className="container p-5">
      <h1 className="mb-6 text-3xl font-bold">Manage Your Company</h1>
      <DataTableCompany />
    </div>
  );
};

export default page;
