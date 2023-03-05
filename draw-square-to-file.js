
const fs = require('fs');

drawSquateToFile();

function drawSquateToFile() {
    const str = getSquare(randomIntFromInterval(3, 20))
    drawToFile(str)
        .then(() => {
            setTimeout(() => {
                drawSquateToFile();
            }, 250);

        })


}

function drawToFile(str) {
    return new Promise((resolove, rejects) => {
        fs.writeFile('./files/pic.txt', str, (err) => {
            if (err) {
                return rejects(err);
            } else {
                return resolove();
            }
        })
    })

}


function getSquare(size) {
    let str = '';
    for (let i = 0; i < size; ++i) {
        for (let j = 0; j < size; ++j) {
            str += '*';
        }
        str += '\n';
    }

    return str;
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}