const app = require("express")()
const { resolve, join, dirname } = require('path')

const uploadPath = dirname(__dirname) + "/tmp"

// const ytssubs = require('ytssubs')
 
// ytssubs.getSubs('tt5463162', (err, results) => { // also works without 'tt'
//   console.log(results)
// })

const useragent = require('express-useragent');
// console.log(useragent)


const OS = require('opensubtitles-api');
const OpenSubtitles = new OS({
    useragent: 'TemporaryUserAgent',
    username: 'hsfkiller',
    password: 'Hsfhsf@2',
    ssl: true
});


let lang = 'en'
// in the first conditiion we need to parse language from front
if ('fre' === 'fre')
    lang = 'fre'


const m = __dirname+'/movies/Deadpool 2 (2018) [BluRay] [720p] [YTS.AM]/Deadpool.2.2018.720p.BluRay.x264-[YTS.AM].mp4'
const pathFile = m.split('/').slice(-1).pop()
console.log(pathFile)
const list = []

const functionSubtitle = async () => {
    await OpenSubtitles.hash(m)
        .then(infos => {
            list[0] = infos.moviehash
            list[1] = infos.moviebytesize
        });
    console.log(list)
    
}

functionSubtitle()


const second_fetch = async () => {
    await OpenSubtitles.search({
        hash: `${list[0]}`,
        filesize: `${list[1]}`,
        path: `${m}`,
        filename: `${pathFile}`,
        sublanguageid: `${lang}`,
        imdbid: 'tt5463162',
    }).then(subtitles => {
        if (subtitles.fr.url)
            console.log(subtitles.fr.url)
        else if (subtitles.fr.en)
            console.log(subtitles.en)
        else
            console.log("test")
    });
}



// second_fetch()




// const OpenSubtitles = require('opensubtitles-universal-api')

// const api = new OpenSubtitles(useragent);
 
// const episodeQuery = {
//   imdbid: 'tt0411008', // Dealpool
// };
 
// api.search(episodeQuery)
//   .then(result => {
//       console.log(result)
//     Object.keys(result) //=> ['en', 'ru', ...]
//     Object.keys(result.en[0]) //=> ['url', 'lang', 'downloads', 'score', 'subFilename', 'releaseFilename', 'date', 'encoding'];
//   });

app.listen(5000)