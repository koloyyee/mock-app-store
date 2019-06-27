const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express()
app.use(cors())


app.get('/top-free/:num', async (req, res)=>{
    const num = parseInt(req.params.num)
    res.json(await getApps("top-free", num))
})

app.get('/top-grossing/:num', async(req, res)=>{
    const num = parseInt(req.params.num)
    res.json(await getApps("top-grossing",num))

})


const getApps = async(section, num) => {
    const serverRes = await axios.get(`https://rss.itunes.apple.com/api/v1/hk/ios-apps/${section}/all/${num}/explicit.json`,
    {mode: 'no-cors'}
    )
    const ids = serverRes.data.feed.results.reduce((idList, { id })=> idList.concat(id), [])

    const infos = ids.map(async (id) => {
        const app = await axios.get(`https://itunes.apple.com/hk/lookup?id=${id}`)
        const appInfo = app.data.results[0];
        const { trackName, genres, averageUserRating, userRatingCount, artworkUrl100 } = appInfo
        return { trackName, genres:genres[0], averageUserRating, userRatingCount, artworkUrl100 }
    })

    console.log(await Promise.all(infos))
    return await Promise.all(infos);
}


const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{console.log( `localhost:${8000}`)})