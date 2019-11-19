using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace WebWindowLib.Features
{
    public class MachineNameFeature : WebWindowFeature
    {
        public MachineNameFeature() : base("machinename")
        { }

        public override WebWindowMessage Execute(JsonElement message)
        {
            return this.Create(Environment.MachineName);
        }
    }
}
