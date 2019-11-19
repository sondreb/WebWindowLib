using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace WebWindowLib.Features
{
    public class OSVersionFeature : WebWindowFeature
    {
        public OSVersionFeature() : base("osversion")
        { }

        public override WebWindowMessage Execute(JsonElement message)
        {
            return this.Create(Environment.OSVersion);
        }
    }
}
