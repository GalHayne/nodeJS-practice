const fs = require('fs');

const url = "./files/num.txt"

sumFromFile(url)
    .then((sum) => {
        console.log('The sum of number:', sum);
    })
    .catch((err) => {
        console.log('Cant calc sum:', err);
    })


function sumFromFile(filePath) {
    return new Promise((resolve, rejects) => {
        fs.readFile(filePath, 'utf8', (err, file) => {
            if (err) {
                return rejects(err);
            } else {
                const arrStr = file.split("\n");
                const sum = arrStr.reduce((acc, element) => {
                    return acc + +element;
                }, 0)
                return resolve(sum);
            }
        })
    })

}