const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require ('discord.js')
module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'Moderation', []);
  }

  async run(client, message, args) {
     //perm check
     if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You are not allowed to use that command.");
     if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("My role does not have perms to ban people.");

     // Varibles
     let reason = args.slice(1).join(" ");
     let userID = args[0]

     // input
     if (!reason) reason = 'No reason was givin.';
     if (!args[0]) return message.reply('Must state someone to unban `\`.unban ID (reasoning)\`');
     if (isNaN(args[0])) return message.reply('Ivalid ID \`.unban ID (reasoning)\`')

     // Executing
     message.guild.fetchBans().then(async bans => {
       if (bans.size == 0) return message.reply('No one is banned');
       let buser = bans.find(b => b.user.id == userID);
       if (!bUser) return message.reply('The user ID is not banned. Did you put the corrct one?');
       await message.guild.members.unban(bUser.user, reason).catch(err =>{
         console.log(err);
         return message.reply('Something went wrong? Try unbanning again?');
       }).then(() => {
         message.reply(`I have unbanned ${arg[0]}`);
       });
     });
  }
}