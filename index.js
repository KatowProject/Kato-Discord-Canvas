const { registerFont, Canvas } = require('canvas');
const path = require('path');
const fs = require('fs');

const LeaderboardDonatur = require('./leaderboard-donatur');
const DonaturNotification = require('./donatur-notification');

const files = fs.readdirSync(path.join(__dirname, 'fonts'));
for (const file of files) {
    const name = file.split('.')[0];
    const family = name.replace(/-/g, ' ');

    registerFont(path.join(__dirname, 'fonts', file), { family });
}

class CanvasManager {
    /**
     * 
     * @param {String} type 
     * @returns {DonaturNotification}
     */
    load(type) {
        switch (type) {
            case 'donatur-notification':
                return new DonaturNotification();
            case 'leaderboard-donatur':
                return new LeaderboardDonatur();
            default:
                throw new Error('Invalid canvas type');
        }
    }
}

module.exports = CanvasManager;

