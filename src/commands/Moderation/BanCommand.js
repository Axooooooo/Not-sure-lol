const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'Moderation', []);
  }

  async run(client, message, args) {
     //perm check
     if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You are not allowed to use that command.");
     if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("My role does not have perms to ban people.");

     // Varibles
     let reason = args.slice(1).join(" ");
     const mentionedMember = message.mentions.members.first();

     // input
     if (!reason) reason = 'No reason was givin.';
     if (!args[0]) return message.reply('Must state someone to ban `\`.ban @user (reasoning)\`');
     if (!mentionedMember) return message.reply('Invalid User!')
     if (!mentionedMember.bannable) return message.reply('I can not ban him! He may have a higher role than me?');

     // Embeds
     const banEmbed = new Discord.MessageEmbed()
     .setTitle(`You were banned from ${message.guild.name}`)
     .setDescription(`Reason: ${reason}`)
     .setColor("#b00b13")
     .setTimestamp()
     .setFooter(client.user.tag, client.user.displayAvatarURL)

     await mentionedMember.send(banEmbed).catch(err => console.log (err));
     await mentionedMember.ban({
       days: 7,
       reason: reason
     }).catch(err => console.log(err)).then(() => message.reply("I have banned him! I wonder what he did? Not my buisness though." + mentionedMember.user.tag));
  }
}