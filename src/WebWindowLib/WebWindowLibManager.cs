using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using WebWindowLib.Features;
using WebWindows;

namespace WebWindowLib
{
    public class WebWindowLibManager
    {
        private readonly WebWindow window;
        private readonly Dictionary<string, IWebWindowFeature> features;

        public WebWindowLibManager(WebWindow webWindow)
        {
            window = webWindow;
            window.OnWebMessageReceived += OnWebMessageReceived;
            features = new Dictionary<string, IWebWindowFeature>();
            RegisterFeatures();
        }

        private void RegisterFeatures()
        {
            // In the future, use of IoC/Dependency Injection should be considered, but for speed and simplicity,
            // all features are added manually for the time being.
            AddFeature(new ReadyFeature());
            AddFeature(new IPAddressFeature());
            AddFeature(new EnvironmentVariablesFeature());
            AddFeature(new OSVersionFeature());
            AddFeature(new MachineNameFeature());
            AddFeature(new OpenDirectoryFeature());
        }

        private void AddFeature(IWebWindowFeature feature)
        {
            features.Add(feature.Name, feature);
        }

        private void OnWebMessageReceived(object sender, string message)
        {
            var window = (WebWindow)sender;
            var parsedMessage = JsonDocument.Parse(message).RootElement;
            var cmd = parsedMessage.GetProperty("command").GetString();

            if (cmd == "log") // Since the WebWindow has no dev-tools, we have added a logging capability that sends logs from browser to .NET
            {
                var logmessage = parsedMessage.GetProperty("argument");
                Console.WriteLine(logmessage);
            }
            else
            {
                if (!features.ContainsKey(cmd))
                {
                    SendCommand(new WebWindowMessage() { Command = "error", Argument = $"The API \"{cmd}\" is not supported." });
                }
                else
                {
                    var result = features[cmd].Execute(parsedMessage);
                    SendCommand(result);
                }
            }
        }

        public void SendCommand(WebWindowMessage message)
        {
            window.SendMessage(JsonSerializer.Serialize(message));
        }
    }
}
