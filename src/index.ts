import {Client} from "@guildedts/framework";
export const client = new Client();
export let commands = client.commands
client.on("ready", () => {
    import("./server.js")
})
client.login("gapi_LgdqTJG8Of7AurXqLw50JRBHiQbGc4FbS3V7/XWkZfSZkep2CGstJIhggY6++EmXSS1H3Wq/VwzHqEEx4prO4g==")