const fs = require('fs');
const path = require('path');
const directory = 'uploads';

const deleteImages = async function () {
    fs.readdir(directory, (err, files) => {
        if (files.length === 0) {
            return;
        }
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(directory, file), (err) => {
                if (err) throw err;
            });
        }
    });
};

module.exports = {
    deleteImages,
};