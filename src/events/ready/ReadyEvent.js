const { Presence } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    client.user.setPresence({
      activity:{
        name: "Fort Worth Role Play",
        type:"PLAYING",
      },
      status:"dnd"
    })
    console.log(client.user.tag + ' has logged in.');
  }
}