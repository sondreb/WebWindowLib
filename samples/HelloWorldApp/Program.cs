using System;
using WebWindows;

namespace HelloWorldApp
{
    class Program
    {
        static void Main(string[] args)
        {
            var window = new WebWindow("WebWindowLib Hello World");

            // Enable support for the WebWindowLib native API library.
            window.EnableNativeApi();

            window.NavigateToLocalFile("wwwroot/index.html");

            window.WaitForExit();
        }
    }
}
