import React, {useContext, useEffect, useState} from "react";
import s from "./AuthPage.module.css"
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/context";

export const AuthPage = () => {
    const auth = useContext(AuthContext)

    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form}, {})
            console.log('Data: ', data)
        } catch (e) {
            console.log(e.message)
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form}, {})
            auth.login(data.token, data.userId)
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="center-align">Short url</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>

                        <div className="input-field">
                            <input id="email"
                                   placeholder="Write email"
                                   type="email"
                                   name="email"
                                   className="yellow-input"
                                   value={form.email}
                                   onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input id="password"
                                   placeholder="password"
                                   type="password"
                                   name="password"
                                   className="yellow-input"
                                   value={form.password}
                                   onChange={changeHandler}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                    </div>
                    <div className="card-action">
                        <button
                            className={"btn yellow darken-4 " + s.signIn}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Sign In
                        </button>
                        <button
                            className={"btn grey lighten-1 black-text " + s.signIn}
                            disabled={loading}
                            onClick={registerHandler}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}