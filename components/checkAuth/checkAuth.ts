
import { redirect } from "next/navigation";

const TurnToAdminPage = (isAdmin: boolean) => {
  if (!isAdmin) {
    redirect("/admin/login");
  }

  return (isAdmin);
}

export default TurnToAdminPage;