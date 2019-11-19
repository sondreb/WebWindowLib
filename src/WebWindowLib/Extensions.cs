using System;
using System.Text.Json;
using WebWindowLib;
using WebWindows;

namespace WebWindows
{
    public static class Extensions
    {
        /// <summary>
        /// Call this method to enable the WebWindowLib framework on your instance of <see cref="WebWindow"/>.
        /// </summary>
        /// <param name="webWindow"></param>
        public static void EnableNativeApi(this WebWindow webWindow)
        {
            WebWindowLibManager manager = new WebWindowLibManager(webWindow);
        }
    }
}
