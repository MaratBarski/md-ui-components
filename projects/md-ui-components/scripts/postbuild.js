const path = require('path')
const fs = require('fs-extra')
const MAIN_DIR = 'md-ui';

let source = 'projects/md-ui-components/src/lib/styles'
let destination = 'dist/md-ui-components/styles'
let dir = path.dirname(__dirname).toLowerCase();
console.log(dir)
let dirs = dir.split(path.sep);
while (dirs[dirs.length - 1] !== MAIN_DIR) {
    dirs.splice(dirs.length - 1, 1);
}
dir = dirs.join('/');
source = path.resolve(dir, source);
destination = path.resolve(dir, destination);

console.log(`Source: ${source}\r\nDestination:${destination}`);

function updateMain() {
    const maincss = path.resolve(destination, "scss/main.scss");
    fs.readFile(maincss, 'utf8', function (err, contents) {
        contents = contents.replace("/node_modules", "");
        fs.writeFile(maincss, contents, (err) => {
            if (err) {
                console.log('Error save file')
            }
        });
    });
}
fs.copy(source, destination)
    .then(() => {
        console.log('Copy completed!');
        updateMain();
    })
    .catch(err => {
        console.log('An error occured while copying the folder.')
        return console.error(err)
    })

//npm login --scope=@md-ui-components --auth-type=legacy --registry=https://npm.pkg.github.com