'use client';

import { adminLogOut } from "@/controllers/admin";

const AdminLogOutBtn = () => {
    const handleLogOut = () => {
        adminLogOut();
    }

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="beige-neumor-btn bg-slate-600 text-slate-200 rounded-full px-10 py-4" onClick={handleLogOut}>
                Sign out
            </div>
        </div>
    )
}

export default AdminLogOutBtn;