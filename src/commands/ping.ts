import { Command } from "@guildedts/framework/dist";
import { Message } from "guilded.ts/dist";

export default class extends Command {
    name: string = "ping"
    description: string = "Pings the bot!"
    execute(message: Message, args: Record<string, unknown>): unknown {
        return message.reply({
            isPrivate: true,
            content: `Pong!, ${message.client.ws.ping}`
        })
    }
}
