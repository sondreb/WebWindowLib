using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace WebWindowLib.Features
{
    public class IPAddressFeature : WebWindowFeature
    {
        public IPAddressFeature() : base("ipaddress")
        { }

        public override WebWindowMessage Execute(JsonElement message)
        {
            return this.Create("127.0.0.1");
        }
    }
}
