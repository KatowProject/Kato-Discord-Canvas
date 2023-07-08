const DiscordCanvas = require('./index');
const leaderboard = new DiscordCanvas().loadLeaderboardDonatur();
const moment = require('moment');

(async () => {
    leaderboard.setMonth(moment().month() + 1);

    leaderboard.setDonatur({
        username: 'Rizky',
        avatar: 'https://cdn.discordapp.com/avatars/458342161474387999/22926c692b8669497cee8836d8ba530d.png?size=4096',
        donation: 'Donation'
    });

    leaderboard.generate();
})()