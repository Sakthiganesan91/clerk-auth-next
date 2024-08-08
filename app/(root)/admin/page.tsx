import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  if (!checkRole("admin")) {
    redirect("/home");
  }
  return <div>page</div>;
};

export default page;
