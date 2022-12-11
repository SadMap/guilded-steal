import {Client} from "@guildedts/framework";
import {readFileSync} from "fs"
export const client = new Client();
export let commands = client.commands
client.on("ready", () => {
    import("./server.js")
})
client.login(JSON.parse(readFileSync("./gtsconfig.json").toString()).token)