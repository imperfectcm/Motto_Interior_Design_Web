
import { redirect } from "next/navigation";

const CheckAuth = (isAdmin: boolean) => {

    if (isAdmin) {
        redirect("/admin");
      }

    return (isAdmin);
    
}

export default CheckAuth;