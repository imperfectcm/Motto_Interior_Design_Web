"use client";

import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { adminLogin } from "@/controllers/admin";

const LoginForm = () => {
    const router = useRouter();
    const onSubmit = async (loginData: loginFormData) => {
        const email = loginData.email;
        const password = loginData.password;
        try {
            await adminLogin(email, password, router);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    type loginFormData = {
        email: string;
        password: string;
    }
    const { register, handleSubmit, formState: { errors } } = useForm<loginFormData>();
    return (
        <main className="flex justify-center items-center h-screen">
            <form className="flex flex-col w-9/12 gap-y-5"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input id="email" className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
                        {...register("email", { required: true })}
                    />
                    <ErrorMessage errors={errors} name="email" />
                    <ErrorMessage
                        errors={errors}
                        name="email"
                        message="Email required"
                        render={({ message }) => <p className="text-red-600">{message}</p>}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input id="password" className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
                        type="password"
                        {...register("password", { required: true })}
                    />
                    <ErrorMessage errors={errors} name="password" />
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        message="Password required"
                        render={({ message }) => <p className="text-red-600">{message}</p>}
                    />
                </div>
                <div className="mt-5 flex justify-center items-center">
                    <input className="beige-neumor-btn rounded-full px-8 py-2" type="submit" value="Login" />
                </div>
            </form>
        </main>
    )
};

export default LoginForm;