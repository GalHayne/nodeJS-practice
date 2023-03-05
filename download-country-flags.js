const axios = require('axios');
const fs = require('fs');
const request = require('request');

const TOP_COUNTRIES_NUMBER = 10

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
        readFromFile('./files/country.json')
            .then((data) => {
                const sortCountries = getSortCountries(data);
                let getTopCountry = getTopCountries(sortCountries, TOP_COUNTRIES_NUMBER);
                downloadFlags(getTopCountry);
            })

    })

function getSortCountries(countries) {
    return countries.sort((p1, p2) => (p1.population < p2.population) ? 1 : (p1.population > p2.population) ? -1 : 0);
}


function downloadCountryFlags() {
    return getJSONfromUrl('https://restcountries.com/v2/all')
}

function getTopCountries(countries, number) {
    topCountry = countries.slice(0, number);
    return topCountry;
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



function readFromFile(fileName) {
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