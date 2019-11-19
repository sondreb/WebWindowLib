using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace WebWindowLib
{
    public interface IWebWindowFeature
    {
        WebWindowMessage Execute(JsonElement message);

        string Name { get; }
    }
}
