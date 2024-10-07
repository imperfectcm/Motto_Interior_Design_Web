
import { redirect } from "next/navigation";

const checkAuth = (isAdmin: boolean) => {
  if (!isAdmin) { redirect("/admin/login"); }

  return (isAdmin);
}

export default checkAuth;