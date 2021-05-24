
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client();

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
})();
 

client.on('guildMemberAdd', member => {
  const welcomeChannel = member.guild.channels.find(ch => ch.name.inculdes('『👋』-welcome'))
  const welcomeText = `Welcome @${member.username} to ${member.guild.name} enjoy playing on Fort Worth Role Play!`
  if (!welcomeChannel) {
      console.log('Could not find a welcome channel. So Im making one! Or maybe not im not sure. Or just tell them to make it lazy fuckers.');
      member.guild.createChannel('Welcome', {
          type: 'test',
          position: 8,
          topic: 'this is a welcome channel! for new users',
          permissionOverwrites: [{
              id: member.guild.id,
              allow: ['READ_MESSAGE_HISTORY', 'READ_MESSAGES'],
              deny: ['SEND_MESSAGES']
          }]
      }).then(console.log('welcome channel created')).catch(console.error);
  }
  
  Promise.resolve(welcomeText).then(function (welcomeText) {
      welcomeChannel.send(welcomeText);
  })
})