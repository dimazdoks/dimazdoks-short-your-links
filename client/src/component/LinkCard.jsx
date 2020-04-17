import React from "react";

export const LinkCard = ({link}) => {
    return (
        <div>
            <h2>Url:</h2>
            <p>Your URL: <a href={link.to} rel="noopener noreferrer">{link.to}</a></p>
            <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Count of redirects: <strong>{link.clicks}</strong></p>
            <p>Date of create: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    )
}