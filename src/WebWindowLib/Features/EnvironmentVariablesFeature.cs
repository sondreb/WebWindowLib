using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace WebWindowLib.Features
{
    public class EnvironmentVariablesFeature : WebWindowFeature
    {
        public EnvironmentVariablesFeature() : base("environmentvariables")
        { }

        public override WebWindowMessage Execute(JsonElement message)
        {
            return this.Create(Environment.GetEnvironmentVariables());
        }
    }
}
