// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    const role = member.guild.roles.cache.get('799710938668204091');
    await member.roles.add(role.id).catch(err => console.log(err));

    const welcomeChannel = member.guild.cache.get('799717202315313223');
    const deptChannel = member.guild.cache.get('837474593252966410');
    welcomeChannel.send(`<@${member.user.id}>, Welcome to ${member.guild.name} thank you for joing and we all hope that you have a really fun time at Fort Worth RP, Departments are always open! ${deptChannel}`);
  }
}