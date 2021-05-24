const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'Moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You are not allowed to use that command.");
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (reason) reason = 'No reason was givin!';
    const kickEmbed = new Discord.MessageEmbed()
      .setTitle(`You were kicked from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#b00b13")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL)

      // .kick @user (reasons)
      if (!args[0]) return message.reply("You need to state a proper user name to kick someone! \'.kick @user reason\'");
      if (!mentionedMember) return message.reply("No user was found.");
      if (!mentionedMember.kickable) return message.reply('I can not kick him! He may have a higher role than me?');
      try {
        await mentionedMember.send(kickEmbed);
      } catch (err) {
        console.log(`I was unable to message member.`);
      }

      try {
       await mentionedMember.kick(reason)
      } catch (err){
        console.log(err);
        return message.reply("I was unable to kick the user.");
      }
  }
}