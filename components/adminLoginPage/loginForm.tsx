"use client";

import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Flip, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginForm = () => {

    const route = useRouter();

    const loginFailedNotify = () => toast.error("🥲 Fail to authenticate user.", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
    });

    // submit login form
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
                    email: email,
                    password: password,
                }),
            });

            if (!res.ok) {
                loginFailedNotify();
                return errors;
            }

            const data = await res.json();

            if (data?.token) {
                route.push("/admin")
            } else {
                loginFailedNotify();
                return errors;
            }

        } catch (error) {
            console.log(error)
            throw error;
        }

    }


    // login form data format
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
                            {...register("email", { required: true })}
                        />
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
                            type="password"
                            {...register("password", { required: true })}
                            value="Otis63730015" />
                        <ErrorMessage errors={errors} name="password" />
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            message="Required"
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