import Client from "guilded.ts/dist"
import { Emoji } from "./types/guilded"

export async function isServerExists(serverID:string) {
    const resp = await fetch(`https://guilded.gg/api/teams/${serverID}/info`)
    if (!resp.ok) return false
    return true
}
export async function getEmojis(serverID:string):Promise<Emoji[]> {
    const resp = await fetch(`https://guilded.gg/api/teams/${serverID}/customReactions`)
    const json = await resp.json()
    return json.reactions
}
export async function checkVoted(client:Client, userID:string) {
    const resp = await fetch(`https://guilded.best/api/voted/${client.user.id}/${userID}`)
    const json = await resp.json()
    return json.status
}
export function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
}