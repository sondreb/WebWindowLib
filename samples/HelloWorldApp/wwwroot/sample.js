function getNativeApiResults() {

    try {
        webWindowLib.log('getNativeApiResults was called in browser.');

        webWindowLib.registerLogHandler((message) => {
            document.getElementById('log').innerHTML += message + '<br>';
        });

        webWindowLib.registerErrorHandler((message) => {
            document.getElementById('error').innerHTML += message + '<br>';
        });

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
    }
    catch (error) {
        webWindowLib.log('ERROR: ' + error);
    }
}

(function () {
    webWindowLib.log('Running API results on startup...');
    getNativeApiResults();
})();
