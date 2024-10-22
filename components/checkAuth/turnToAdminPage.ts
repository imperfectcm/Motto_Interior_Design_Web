
import { redirect } from "next/navigation";

const turnToAdminPage = (isAdmin: boolean) => {
  if (isAdmin) redirect("/admin");
  return (isAdmin);
}

export default turnToAdminPage;