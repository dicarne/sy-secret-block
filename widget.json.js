const pkg = require("./package.json");

const json = {
    "name": pkg.name,
    "author": pkg.author,
    "url": pkg.repository.url,
    "version": pkg.version
};

const fs = require("fs");

fs.writeFile("./dist/widget.json", JSON.stringify(json, null, 4), (err) => {
    if (err) {
        console.log("widget.json 创建失败", err);
    }
});
fs.copyFile('./preview.png', './dist/preview.png', (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
});
fs.copyFile('./README.md', './dist/README.md', (err) => {
    if (err) throw err;
});