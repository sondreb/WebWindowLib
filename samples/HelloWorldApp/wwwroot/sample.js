function getNativeApiResults() {

    try {
        webWindowLib.log('getNativeApiResults was called in browser.');

        webWindowLib.getIpAddress((data) => {
            document.getElementById('ipaddress').innerText = data;
        }, (error) => {
            console.error(error);
        });

        webWindowLib.getEnvironmentVariables((data) => {
            document.getElementById('environmentvariables').innerText = JSON.stringify(data);
        });

        webWindowLib.getMachineName((data) => {
            document.getElementById('machinename').innerText = JSON.stringify(data);
        });

        webWindowLib.getOSVersion((data) => {
            document.getElementById('osversion').innerText = JSON.stringify(data);
        });

        webWindowLib.getNotSupported((data) => {
            
        }, (error) => {
            console.error(error);
        });

        console.info('Infoing...');
        console.error('Erroring...');
        console.log('Logging...');
        console.warn('Warning...');
    }
    catch (error) {
        debugger;
        webWindowLib.log('ERROR: ' + error);
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
    webWindowLib.log('Running API results on startup...');
    getNativeApiResults();
});

//(function () {
    
//})();
