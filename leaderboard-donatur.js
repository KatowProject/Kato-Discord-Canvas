const { loadImage, createCanvas } = require('canvas');
const moment = require('moment');
const fs = require('fs');

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

        this.month = moment().month(month - 1).format('MMMM').toUpperCase();
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
    async generate() { 
        if (!this.month) throw new Error('Month is required');
        if (!this.donaturs.length) throw new Error('Donatur is required');

        const template = await loadImage('./templates/POS_Top_Donations.png');
        const canvas = createCanvas(template.width, template.height);

        const ctx = canvas.getContext('2d');
        ctx.drawImage(template, 0, 0);

        // draw month semi bold
        ctx.font = '28pt Montserrat SemiBold';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.fillText(this.month + ' 2023', template.width / 2, 190);

        // draw donatur
        const donatur = this.donaturs[0];
        const avatar = await loadImage(donatur.avatar);

        ctx.font = '24pt Montserrat SemiBold';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.fillText(donatur.username, template.width / 2, 300);

        // to buffer
        const buffer = canvas.toBuffer('image/png');

        fs.writeFileSync('test.png', buffer);
        
    } 
}

module.exports = LeaderboardDonatur;