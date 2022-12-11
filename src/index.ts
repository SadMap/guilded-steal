import {Client} from "@guildedts/framework";
import {readFileSync} from "fs"
import("./server.js")
export const client = new Client();
export let commands = client.commands
client.login(JSON.parse(readFileSync("./gtsconfig.json").toString()).token)