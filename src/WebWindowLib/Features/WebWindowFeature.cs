using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace WebWindowLib.Features
{
    public abstract class WebWindowFeature : IWebWindowFeature
    {
        public string Name { get; private set; }

        public WebWindowFeature(string name)
        {
            Name = name;
        }

        public abstract WebWindowMessage Execute(JsonElement message);

        internal WebWindowMessage Create(object argument)
        {
            return new WebWindowMessage() { Command = Name, Argument = argument };
        }
    }
}
