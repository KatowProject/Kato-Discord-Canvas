const DiscordCanvas = require('../index');
const leaderboard = new DiscordCanvas().loadLeaderboardDonatur();
const fs = require('fs');

try {
    leaderboard.setMonth(7);

    const donatur = [
        {
            username: 'Rizky',
            avatar: 'https://cdn.discordapp.com/avatars/458342161474387999/22926c692b8669497cee8836d8ba530d.png?size=4096',
            donation: 'Rp1.000.000'
        },
        {
            username: 'Atmaja',
            avatar: 'https://cdn.discordapp.com/avatars/458342161474387999/22926c692b8669497cee8836d8ba530d.png?size=4096',
            donation: 'Rp500.000'
        },
        {
            username: 'Rizky Atmaja',
            avatar: 'https://cdn.discordapp.com/avatars/458342161474387999/22926c692b8669497cee8836d8ba530d.png?size=4096',
            donation: 'Rp250.000'
        }
    ]

    leaderboard.setDonatur(donatur);

    const buffer = leaderboard.generate().then(buffer => {
        fs.writeFileSync('test-leaderboard.png', buffer);
    });
} catch (err) {
    console.log(err);
    console.log(err.message);
}