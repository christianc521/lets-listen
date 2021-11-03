const express = require('express')
const spotifyWebApi = require('spotify-web-api-node')
const cors = require("cors")
const bodyParser = require('body-parser')

const app = express();
app.use(cors())
app.use(bodyParser.json())


app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'eab57081c0654ebfb1c55a4e599089d6',
        clientSecret: 'dce25173f174441a91ba7d3356b27aba'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({ 
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }) 
    .catch(() => {
        res.sendStatus(400)
    })
})

app.listen(3001)