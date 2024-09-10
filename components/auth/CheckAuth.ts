
import { redirect } from "next/navigation";

const CheckAuth = (isAdmin: boolean) => {

    if (!isAdmin) {
        redirect("/admin/login");
      }

    return (isAdmin);
    
}

export default CheckAuth;