const { loadImage, createCanvas } = require('canvas');
const moment = require('moment');
class LeaderboardDonatur {
    constructor() {
        this.donaturs = [];
        this.month = null;
        this.template = null;
    }

    /**
     * Set month
     * @param {Number} month Number of month
     * @returns {void}
     * @example
     * leaderboardDonatur.setMonth(1); // January
    */
    setMonth(month) {
        if (month < 1 || month > 12) throw new Error('Month must be between 1 and 12');

        this.month = moment().month(month - 1).format('MMMM');
    }

    /**
     * Set donatur to leaderboard
     * @param {Object} data  Donatur data
     * @returns {void} 
     */
    setDonatur(data) {
        if (this.donaturs.length >= 3) throw new Error('Donatur maximum is 3');
        // validate data
        if (!data.username) throw new Error('Username is required');
        if (!data.avatar) throw new Error('Avatar is required');
        if (!data.donation) throw new Error('Donation is required');

        this.donaturs.push(data);
    }

    /**
     * Generate image
     * @returns {Promise<Buffer>}
     * @example
     * const buffer = await leaderboardDonatur.generate();
     * fs.writeFileSync('test.png', buffer);
     * @example
     * const buffer = await leaderboardDonatur.generate();
     * const attachment = new Discord.AttachmentBuilder(buffer, 'test.png');
     * message.channel.send({ files: [attachment] });
     * 
    */
    async generate() { }
}

module.exports = LeaderboardDonatur;