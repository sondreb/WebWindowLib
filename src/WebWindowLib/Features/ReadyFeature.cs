using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace WebWindowLib.Features
{
    public class ReadyFeature : WebWindowFeature
    {
        public ReadyFeature() : base("ready")
        { }

        public override WebWindowMessage Execute(JsonElement message)
        {
            return this.Create("OK");
        }
    }
}
