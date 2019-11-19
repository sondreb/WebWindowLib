using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Text.Json;

namespace WebWindowLib.Features
{
    public class OpenDirectoryFeature : WebWindowFeature
    {
        public OpenDirectoryFeature() : base("opendirectory")
        { }

        public override WebWindowMessage Execute(JsonElement message)
        {
            // Just a proof-of-concept, need to allow supplied path and cross-platform support.
            Process.Start("explorer.exe", Environment.CurrentDirectory);
            return this.Create("OK");
        }
    }
}
