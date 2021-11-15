const express = require('express');
const app = express();
const path = require('path')
const ytdl = require('ytdl-core')

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.use('/static', express.static(path.join(__dirname, '')))

app.post('/download', (req, res) => {
    const url = req.body.url
    ytdl.getBasicInfo(url)
    .then((info) => {
        const title = info.videoDetails.title;
        res.header('Content-disposition', `attachement; filename=${title}.mp4`)

        ytdl(url, {
            quality: 'highest',
            format: 'mp4'
        }).pipe(res)
    })
})

app.listen(3000, () => console.log("App launched on port 3000"))