const axios = require('axios');
const fs = require('fs');
const request = require('request');

downloadCountryFlags()
    .then((data) => {
        return new Promise((resolve, reject) => {
            fs.writeFile('./files/country.json', data, (err) => {
                if (err) {
                    return reject(err)
                } else {
                    resolve();

                }
            })

        })
    })
    .then(() => {
        writeFromFile('./files/country.json')
            .then((data) => {
                let topFiveCountry = getCountries(data);
                downloadFlags(topFiveCountry);
            })

    })


function downloadCountryFlags() {
    return getJSONfromUrl('https://restcountries.com/v2/all')
}

function getCountries(countries) {
    let sortedCountry = countries.sort((p1, p2) => (p1.population < p2.population) ? 1 : (p1.population > p2.population) ? -1 : 0);
    let topFiveCountry = [];
    topFiveCountry = sortedCountry.slice(0, 5);
    return topFiveCountry;
}

function downloadFlags(countries) {
    let prms = countries.map((country) => {
        return download(country.flags.png, `files/flags/${country.name}.png`)
    })

    Promise.all(prms)
        .then(() => {
            console.log('All Files Downloaded');
        })



}

function download(url, fileName) {
    return new Promise((resolve, reject) => {
        request(url)
            .pipe(fs.createWriteStream(fileName))
            .on('close', resolve)
            .on('error', reject)
    });
}



function getJSONfromUrl(url) {
    return axios.get(url)
        .then((res) => {
            return JSON.stringify(res.data)
        });
}



function writeFromFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, file) => {
            if (err) {
                return reject(err);
            } else {
                const str = file;
                const countryJSON = JSON.parse(str);
                return resolve(countryJSON)
            }
        })

    })

}