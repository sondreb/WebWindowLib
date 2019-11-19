'use strict';

// TODO: Was unable to use the built in Promise object, can't be called externally and
// it is not optimal to share the resolve/reject methods outside of the creation scope.
// Until a better solution is found, a simple callback is used.

// Until a solution to use Promises is found, we'll rely on good o'l callbacks.

class WebWindowLib {
    promises = {};
    logcallback = null;
    errorcallback = null;

    receiveMessage = null;
    sendMessage = null;

    constructor(isNative) {
        var lib = this;

        // Make it possible to debug and test in regular browser.
        if (isNative) {
            lib.receiveMessage = window.external.receiveMessage;
            lib.sendMessage = window.external.sendMessage;
        }
        else {
            lib.receiveMessage = function (callback) {
                //dev/null
                console.log(callback);
            };

            lib.sendMessage = function (callback) {
                //dev/null
                console.log(callback);
            };
        }

        lib.receiveMessage(function (messageJson) {
            var message = JSON.parse(messageJson);

            // Log message received from .NET, show in 
            if (message.command === 'log') {
                console.log(message.argument);

                if (lib.logcallback) {
                    lib.logcallback(message.argument);
                }

                return;
            }

            if (message.command === 'error') {
                console.error(message.argument);

                if (lib.errorcallback) {
                    lib.errorcallback(message.argument);
                }

                return;
            }

            var promise = lib.promises[message.command];

            if (!promise) {
                lib.log('Received command with no listener.');
                return;
            }

            try {
                promise.resolve(message.argument);
            }
            catch (error) {
                lib.log('ERROR: ' + error);

                if (promise.reject) {
                    promise.reject(error);
                }
            }

            delete lib.promises[message.command];
        });

        lib.send({ command: 'ready' });
    }

    registerLogHandler(logcallback) {
        this.logcallback = logcallback;
    }

    registerErrorHandler(errorcallback) {
        this.errorcallback = errorcallback;
    }

    getNotSupported(resolve, reject) {
        return this.create('notsupported', resolve, reject);
    }

    getIpAddress(resolve, reject) {
        return this.create('ipaddress', resolve, reject);
    }

    getEnvironmentVariables(resolve, reject) {
        return this.create('environmentvariables', resolve, reject);
    }

    getOSVersion(resolve, reject) {
        return this.create('osversion', resolve, reject);
    }

    getMachineName(resolve, reject) {
        return this.create('machinename', resolve, reject);
    }

    create(cmd, resolve, reject) {
        try {
            // TODO: Add unique identifier for all messages instead of command, 
            //       to support multiple unique calls for each feature.
            this.promises[cmd] = { command: cmd, resolve: resolve, reject: reject };
            this.send({ command: cmd });
        }
        catch (error) {
            this.log('ERROR: ' + error);
        }
    }

    log(message) {
        console.log(message);
        this.send({ command: 'log', argument: message });
    }

    send(message) {
        this.sendMessage(JSON.stringify(message));
    }
}

// To ensure we hook up to the listener, we must initialize the WebWindowLib on 
// the window during load, we can't do it when user new up the WebWindowLib.
window.webWindowLib = new WebWindowLib(true);