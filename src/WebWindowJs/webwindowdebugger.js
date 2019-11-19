// Since WebWindow does not have any native debugging tools, this is a simple replacement to give a minimum set of debugging (console output).

// !! THE FOLLOWING CODE IS A QUICK FUNCTIONAL PROTOTYPE - MAJOR REFACTORING REQUIRED!!

// Putting some state in the global scope...
window.startupLogs = [];
window.webWindowDebuggerInitialize = false;
window.webWindowDebuggerExpanded = true;

// Override the console, ensure we cache the log until log view is fully loaded.
var console = (function(oldCons) {
    return {
        log: function(text) {
            oldCons.log(text);

            if (!window.webWindowDebuggerInitialize) {
                window.startupLogs.push('DBUG: ' + text);
            }
            else {
                window.writeLog('DBUG: ' + text);
            }
        },
        info: function(text) {
            oldCons.info(text);
            if (!window.webWindowDebuggerInitialize) {
                window.startupLogs.push('INFO: ' + text);
            }
            else {
                window.writeLog('INFO: ' + text);
            }
        },
        warn: function(text) {
            oldCons.warn(text);
            if (!window.webWindowDebuggerInitialize) {
                window.startupLogs.push('WARN: ' + text);
            } else {
                window.writeLog('WARN: ' + text);
            }
        },
        error: function(text) {
            oldCons.error(text);
            if (!window.webWindowDebuggerInitialize) {
                window.startupLogs.push('ERRR: ' + text);
            }
            else {
                window.writeLog('ERRR: ' + text);
            }
        },
        assert: function(text) {
            oldCons.assert(text);
            if (!window.webWindowDebuggerInitialize) {
                window.startupLogs.push('ASRT: ' + text);
            }
            else {
                window.writeLog('ASRT: ' + text);
            }
        }
    };
}(window.console));

//Then redefine the old console
window.console = console;

document.addEventListener('DOMContentLoaded', function(event) {
           var debugview = document.createElement('div');
    debugview.id = 'debugview';

    var debuglogs = document.createElement('div');
    debuglogs.id = 'debuglogs';

    var toggle = document.createElement('button');
    toggle.innerText = "▲";
    toggle.id = 'debugviewtoggle';

    toggle.onclick = function() {
        toggleDebugView();
    };

    debugview.appendChild(toggle);
    debugview.appendChild(debuglogs);

      var style = document.createElement('style');
      style.innerHTML = `
#debugview {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid gray;
    height: 260px;
    background-color: #f1f1f1;
    width: 100%;
    margin: 0;
    padding-left: 0px;
    overflow-y: scroll;
    font-family: "Lucida Console", Monaco, monospace;
}

#debugviewtoggle {
    position: fixed;
    right: 20px;
}

#debuglogs {
    padding-left: 5px;
    padding-top: 2px;
}

body {
    margin-bottom: 260px;
}

.webwindowdebugger-log {
    color: gray;
}

.webwindowdebugger-error {
    color: red;
}

.webwindowdebugger-warn {
    color: maroon;
}

.webwindowdebugger-info {
    color: black;
}
    `;
      document.head.appendChild(style);
    document.body.appendChild(debugview);

    //document.getElementsByTagName("body")[0].appendChild(debugview);

    function toggleDebugView() {

        if (window.webWindowDebuggerExpanded) {
            debugview.style.height = '22px';
            document.body.style.marginBottom = '22px';
            toggle.innerText = "▲";
            window.webWindowDebuggerExpanded = false;
        }
        else {
            debugview.style.height = '260px';
            document.body.style.marginBottom = '261px';
            toggle.innerText = "▼";
            window.webWindowDebuggerExpanded = true;
        }
    }

    function onKeyDown(e) {
        if (e.key === 'F10') {
            toggleDebugView();
        }
    }

    document.addEventListener("keydown", onKeyDown, false); 

    // We are instead hooking directly into console to get all messages. Left for perhaps more structured error logging in the future.

    //webWindowLib.registerLogHandler((message) => {
    //    var logEntry = document.createElement('div');
    //    logEntry.className = 'webwindowdebugger-log';
    //    logEntry.innerText = message;
    //    debugview.appendChild(logEntry);
    //});

    //webWindowLib.registerErrorHandler((message) => {
    //    var logEntry = document.createElement('div');
    //    logEntry.className = 'webwindowdebugger-error';
    //    logEntry.innerText = message;
    //    debugview.appendChild(logEntry);
    //});

    window.writeLog = function writeLog(message) {
        var logEntry = document.createElement('div');

        if (message.startsWith('ERRR')) {
            logEntry.className = 'webwindowdebugger-error';
        } else if (message.startsWith('INFO')) {
            logEntry.className = 'webwindowdebugger-info';
        } else if (message.startsWith('WARN')) {
            logEntry.className = 'webwindowdebugger-warn';
        } else {
            logEntry.className = 'webwindowdebugger-log';
        }

        logEntry.innerText = message;
        debuglogs.prepend(logEntry);
    };

    window.webWindowDebuggerInitialize = true;

    for (i = 0; i < window.startupLogs.length; i++) {
        var message = window.startupLogs[i];
        writeLog(message);
    }
});