"use client";

import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";



const adminLogin = () => {

    const route = useRouter();

    const onSubmit = async (loginData: loginFormData) => {

        const email = loginData.email;
        const password = loginData.password;

        try {
            
            const res = await fetch('/api/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'motto.intdesign@gmail.com',
                    password: 'Otis63730015',
                }),
            });

            if (!res.ok) return ({ message: "Failed to authenticate user." })

            const data = await res.json();

            if (data?.token) {
                route.push("/create-project")
            } else {
                return ({ message: "Failed to authenticate user." })
            }


        } catch (error) {
            console.log(error)
            throw error;
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
                onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="flex flex-col">
                    <label>Email</label>
                    <input className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
                        {...register("email", { required: true })} />
                    <ErrorMessage errors={errors} name="email" />
                    <ErrorMessage
                        errors={errors}
                        name="email"
                        message="Required"
                        render={({ message }) => <p className="text-red-600">{message}</p>}
                    />
                </div>

                <div className="flex flex-col">
                    <label>Password</label>
                    <input className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
                        {...register("password", { required: true })} />
                    <ErrorMessage errors={errors} name="password" />
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        message="Required"
                        render={({ message }) => <p className="text-red-600">{message}</p>}
                    />
                </div>

                <input type="submit" />
            </form>
        </main>
    )

}

export default adminLogin;