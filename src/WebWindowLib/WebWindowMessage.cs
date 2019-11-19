using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace WebWindowLib
{
    public class WebWindowMessage
    {
        [JsonPropertyName("command")]
        public string Command { get; set; }

        [JsonPropertyName("argument")]
        public object Argument { get; set; }
    }
}
