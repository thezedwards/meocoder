const NumberLog = (ref, number) => {
    ref[0] = number + 1;
}
const stepLog = [1];

const ojectLog = {
    1: (log) => {
        if (log.indexOf('* CPU') !== -1) {
            NumberLog(stepLog, stepLog[0]);
            console.log(`-- ${log.split('* CPU          ')[1].split('@ ')[1]}`);
        }
    },
    2: (log) => {
        if (log.indexOf('NUMA') !== -1) {
            NumberLog(stepLog, stepLog[0]);
            const core = log.split('C/');
            console.log(`-- ${core[0].split('MB ')[core[0].split('MB ').length - 1]} - ${core[1].split('T NUMA:')[0]} - ${core[1].split('T NUMA:')[1]}`);
        }
    },
    3: (log) => {
        if (log.indexOf('* MEMORY') !== -1) {
            NumberLog(stepLog, stepLog[0]);
            console.log(`-- ${log.split('* MEMORY       ')[1].split(' ')[0]}`);
            console.log(`-------------------------`);
        }
    },
    4: (log) => {
        const trimlog = log.split(']  ')[1] || null;
        if (trimlog) {
            switch (trimlog.split(' ')[0].trim()) {
                case 'benchmk':
                    if (log.indexOf('Starting test') !== -1) {
                        console.log('-- run test');
                    }
                    break;
                case 'msr':
                    if (log.indexOf('FAILED TO APPLY MSR MOD, HASHRATE WILL BE LOW') !== -1) {
                        console.log('-- server low ###');
                    }
                    break;
                case 'net':
                    if (log.indexOf('new job') !== -1) {
                        console.log('---- new task add to queue ----');
                    }
                    else if (log.indexOf('no active pools')) {
                        console.log('-- ### server no active ###');
                    }
                    else if (log.indexOf('use pool') !== -1) {
                        console.log('-- server is running :))');
                    } else {
                        console.log(`-- other net info: ${log}`);
                    }
                    break;
                case 'randomx':
                    if (log.indexOf('init dataset') !== -1) {
                        console.log('-- create data');
                    }
                    else if (log.indexOf('dataset ready') !== -1) {
                        console.log('-- create data done!');
                    }
                    break;
                case 'cpu':
                    if (log.indexOf('accepted') !== -1) {
                        const cpuLog = log.split('accepted')[1];
                        console.log(`-- ping server ${cpuLog.split(' diff')[0].replace('/', '-')} - ${cpuLog.split(' (')[2].split(' ms)')[0]}`);
                    }
                    else if (log.indexOf('huge pages 100%') !== -1) {
                        console.log('-- server good ^^^');
                    }
                    break;
                case 'miner':
                    if (log.indexOf('speed') !== -1) {
                        console.log(`-- ${Math.random().toString(36).substring(2)}: ${log.split('15m ')[1].trim().replace(/H\/s| max /g, '')}`);
                    }
                    break;
                default:
                    break;
            }
        }
    },
}

const printLog = (rawLog) => {
    rawLog.split(/\r?\n/).forEach((log) => {
        ojectLog[stepLog[0]](log);
    })
}

module.exports = {
    printLog
}
