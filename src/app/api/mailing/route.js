import React from 'react'
export default function handler(req, res) {
    if (req.method === "GET") {
        const mailers = [
            { id: "1", name: "Welcome Mail" },
            { id: "2", name: "NewsLetter" }
        ];

        res.status(200).json(mailers);
    }
}