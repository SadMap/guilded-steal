import { Command } from "@guildedts/framework/dist";
import { Embed, Message } from "guilded.ts/dist";
import { commands } from "..";

export default class extends Command {
    name: string = "help"
    description: string = "Shows all the commands you can use!"
    execute(message: Message, args: Record<string, unknown>): unknown {
        const embed = new Embed()
            .setTitle("Help")
            .setDescription("Here are all the commands you can use!")
            .setColor("Gilded")
            .setFooter("Made with ❤️ by @wai")
        commands.forEach(command => {
            embed.addField(command.name, command.description, true)
        })
        return message.reply({
            isPrivate: true,
            embeds: [embed]
        })
    }
}