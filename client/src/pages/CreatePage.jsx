import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/context";

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const {request} = useHttp()

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
                console.log('Create page data:', data)
            } catch (e) {}
        }
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Input your Url"
                        id="link"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Input your Url</label>
                </div>
            </div>
        </div>
    )
}