var path = require('path');
let fs = require('fs')

if (process.argv.length !== 3 || !['dev', 'prod'].includes(process.argv[2])) {
    console.error('argument "dev" or "prod" required');
    process.exit(1);
}

console.log(`env=${process.argv[2]}`);

var processDir = path.dirname(process.argv[1]);
var templatePath = path.resolve(processDir + '/pattern.js');
if (process.argv[2] === 'prod') {
    var labraryPath = path.resolve(processDir + '/../dist/random-event-library.min.js');
    var distPath = path.resolve(processDir + '/../dist/random-event.min.js');
} else {
    var labraryPath = path.resolve(processDir + '/../dist/random-event-library.js');
    var distPath = path.resolve(processDir + '/../dist/random-event.js');
}
console.log(`templatePath=${templatePath}`);
console.log(`labraryPath=${labraryPath}`);
console.log(`distPath=${distPath}`);

var pattern = fs.readFileSync(templatePath).toString();
var libraryContent = fs.readFileSync(labraryPath).toString();
var result = pattern.replace(/\/\*<<RandomEventAppLibraryPlaceholder>>\*\//gm, libraryContent);

fs.writeFileSync(distPath, result);
console.log("Ok!");
