# WebWindowLib

JavaScript library for cross-platform native API calls to be used with WebWindow.

## Purpose

This library gives you access to native APIs from your web apps hosted on the WebWindow.

It is a .NET Core library built in C# with a JavaScript library that handles messages between the webview and .NET code.

## How to use

Add a reference to "WebWindowLib", not available on NuGet yet, copy the code into your own project.

Call the method to enable the library:

```cs
window.EnableNativeApi();
```

Add a reference to webwindowlib.js:

```html
<script src="webwindowlib.js"></script>
```

Call any of the available functions on the webWindowLib (available globally):

```js
    webWindowLib.getMachineName((data) => {
        document.getElementById('machinename').innerText = data;
    }, (error) => {
        console.error(error);
    });
```

## Supported Features

- Machine Name
- OS Version
- Environment Variables
- IP Address (static localhost IP)

## Planned Features

- TCP communication
- Native IO
- Screen resolution
- +++

Support for native Promise instead of callbacks.

## License

[MIT](LICENSE)
