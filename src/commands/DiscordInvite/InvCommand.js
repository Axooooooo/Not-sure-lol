const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class InvCommand extends BaseCommand {
  constructor() {
    super('inv', 'DiscordInvite', []);
  }

  run(client, message, args) {
    message.reply('https://discord.gg/DCuYDYw7%27');
  }
}