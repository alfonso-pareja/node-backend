const fs = require('fs');
const path = require('path')


const getFavorites = async(req = request, res = response) => {

    res.send('Hello World')
}

const setFavorites = (req = request, res = response) => {

    const filePath = path.resolve(__dirname, '..', 'temp', 'favorites.json');
    fs.readFile(filePath, (error, data) => {
        let dataJSON = JSON.parse(data);

        dataJSON.push({ nombre_banda: ' holi'});
        fs.writeFile(filePath, JSON.stringify(dataJSON), () => {
            res.send({ resultado: "OK" });
        });
    });
}



module.exports = { 
    getFavorites,
    setFavorites
}