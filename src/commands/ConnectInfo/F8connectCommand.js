const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class F8connectCommand extends BaseCommand {
  constructor() {
    super('f8connect', 'ConnectInfo', []);
  }

  run(client, message, args) {
    message.channel.send('connect cfx.re/join/kp5og7');
  }
}