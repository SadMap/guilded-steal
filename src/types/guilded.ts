export interface Emoji {
    id:              number;
    name:            string;
    png:             string;
    webp:            string;
    apng:            string;
    aliases:         string[];
    createdAt:       Date;
    createdBy:       string;
    teamId:          string;
    isDeleted:       boolean;
    discordEmojiId:  string|null;
    discordSyncedAt: Date;
}