import * as express from 'express';
import { client } from '.';
import { checkVoted, chunks, getEmojis, isServerExists } from './utils';

const app = express();

app.get('/api/inport/:serverID/:userID/:page', async (req, res) => {
    const { serverID, userID, page } = req.params;
    if (!serverID) return res.status(400).json({ error: 'Server ID is required!' });
    if (!userID) return res.status(400).json({ error: 'User ID is required!' });
    if (!page) return res.status(400).json({ error: 'Page is required!' });
    const isVoted = await checkVoted(client, userID);
    if (!isVoted) return res.status(400).json({ error: 'You need to vote on https://guilded.best to use this command!' });
    const serverExists = await isServerExists(serverID);
    if (!serverExists) return res.status(400).json({ error: 'This server doesn\'t exist or it\'s private!' });
    if (isNaN(parseInt(page))) return res.status(400).json({ error: 'Page must be a number!' });
    const emojis = await getEmojis(serverID);
    if (emojis.length === 0) return res.status(400).json({ error: 'This server doesn\'t have any emojis!' });
    const array = [...chunks(emojis, 50)];
    if (!array[parseInt(page) - 1]) return res.status(400).json({ error: 'This page doesn\'t exist!' });
    res.json({
        name:`${serverID} - ${page}`,
        "author": "Emoji Stealer",
        "emotes": array[parseInt(page) - 1].map(e => {
            return {
                "name": e.name,
                "url": e.apng
            }
        })
        })
    return;
    })
app.listen(25841, () => console.log('Server is up and running!'));