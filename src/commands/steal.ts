import { ArgumentConstructor, Command, StringArgument } from "@guildedts/framework/dist";
import { Embed, Message } from "guilded.ts/dist";
import { checkVoted, chunks, getEmojis, isServerExists } from "../utils";
export default class extends Command {
    name: string = "steal"
    description: string = "Steals a server's emojis and sends it as a pack!"
    arguments: ArgumentConstructor[] = [
        class extends StringArgument {
            name: string = "serverID"
        }
    ]
    async execute(message: Message, args: Record<string, unknown>): Promise<unknown> {
        const serverID = args.serverID as string
        const isVoted = await checkVoted(message.client, message.createdBy)
        if (!isVoted) return message.reply({
            isPrivate: true,
            content: "You need to vote on https://guilded.best to use this command!"
        })
        if (!serverID) return message.reply({
            isPrivate: true,
            content: "Server ID is required!"
        })

        const serverExists = await isServerExists(serverID)
        if (!serverExists)  return message.reply({
            isPrivate: true,
            content: "This server doesn't exist or it's private!"
        })
        const emojis = await getEmojis(serverID)
        if (emojis.length === 0) return message.reply({
            isPrivate: true,
            content: "This server doesn't have any emojis!"
        })
        const embed = new Embed()
            .setTitle("Emoji Packs")
            .setDescription("Here are all the emojis from the server!")
            .setColor("Gilded")
            .setFooter("Made with ❤️ by @wai")
        const array =[...chunks(emojis, 50)]
        const chunkchunks = [...chunks(array, 10)]
        chunkchunks.forEach((chunk, index) => {
            let str = ""
            chunk.forEach((chunk, index) => {
                str += `**${index + 1}** - [Click Here](https://packs.guilded.best/api/inport/${serverID}/${message.createdBy}/${index + 1})\n`
            })
            embed.addField(`Page ${index + 1}`, str, true)
        })
        return message.reply({
            isPrivate: true,
            embeds: [embed]
        })
    }
}