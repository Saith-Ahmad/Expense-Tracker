import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/layout/style.css"
import {baseURL} from "../pages/url"

export const Login = () => {
    // const baseURL =  "http://localhost:8000/api/v1"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await axios.post(`${baseURL}/users/login`, {
                email,
                password,
            });
            const { data } = response;
            localStorage.setItem('user',JSON.stringify({...data.user, password:''}))
            toast.success("Login successful!");
            navigate("/");
            setEmail("")
            setPassword("")
        } catch (error) {
            console.log(error)
            toast.error("Login failed. Please check your credentials.");
        }finally{
            setLoading(false)
        }
    };
    useEffect(()=> {
        if(localStorage.getItem('user')){
            navigate("/")
        }
    }, [navigate])

    return (
        <Layout>
            <div className="flex items-center justify-center min-h-[60vh] p-2 md:p-3">
                <div className="flex flex-col items-center bg-gray-900 row_class p-2 md:p-5 mt-10 min-w-[50%] rounded-md py-10 overflow-hidden">
                    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
                        <div className="mb-5 w-full">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 md:w-80   p-2.5 block mx-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="example@email.com"
                                required
                            />
                        </div>
                        <div className="mb-5 w-full">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                            >
                                Your password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 md:w-80  p-2.5 block mx-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <button
                                type="submit"
                                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${loading && 'bg-blue-400 hover:bg-blue-400'}`}
                            >
                                {!loading ? "Submit" : "Requesting..."}
                            </button>
                            <p className="text-gray-300 mt-4 text-center">
                                Not signed in yet?{" "}
                                <Link to="/register" className="text-blue-500 hover:underline">
                                    Make an account
                                </Link>
                            </p>
                        </div>
                    </form>
                   
                </div>
            </div>
        </Layout>
    );
};
