const Discord = require('discord.js');
const mysql = require('mysql');
const JsonData = require("./Tokens.json");

var MySqlU = JsonData.MySqlU;
var MySqlP = JsonData.MySqlP;
var MySqlIP = JsonData.MySqlIP;
var Dtoken = JsonData.Dtoken;

var SQLconnection = mysql.createConnection({
  host: MySqlIP,
  user: MySqlU,
  password: MySqlP,
  database: 'DiscordLevel'
});
const client = new Discord.Client();


client.login(JsonData.Dtoken);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  var Count;
  for (Count in client.users.array()) {
    var User = client.users.array()[Count];
    DataBaseTest(User.username, User.id, SQLconnection);
    //console.log(User.username);
  }
});

client.on('guildMemberAdd', member => {
  console.log(member.user.username);
  DataBaseTest(member.user.username, member.id, SQLconnection);
});

function DataBaseTest(Username, userid, connection) {
  connection.query("SELECT * from Data where DiscordID = " + connection.escape(userid), function (error, results, fields) {
    if (error) throw error;
    if (!results.length) {
      var UsernameS = String(Username);
      var useridS = String(userid);
      console.log("added User:")
      console.log(useridS);
      console.log(UsernameS);
      console.log();
      var sql = 'INSERT INTO Data (DiscordID, DiscordName, Level, Points) VALUES (' + connection.escape(useridS) + ", " + connection.escape(UsernameS) + ', 0, 0)';
      connection.query(sql, function (error, results, fields) {
        if (error) throw error;

      });

    };
  });
}

var Prefix = JsonData.Prefix;

client.on('message', msg => {
  if (msg.content[0] == Prefix) {
    var args = msg.content.split(" ");
    console.log(args[0]);
    switch (args[0]) {
      case "!test":
        msg.channel.send("Test");
        break;
      case "!purge":
        msg.channel.bulkDelete(parseInt(args[1]));
        msg.channel.send(":fire: Messages Deleted :fire:");
        break;
      default:
        msg.channel.send("Error: Command Not Found");
        break;
    }
  } else if (msg.author.id != "481383926506455040") {
    var sql = 'select Points from Data Where DiscordID =' + SQLconnection.escape(msg.author.id);
    var Points = 0;
    var Level = 0;
    SQLconnection.query(sql, function (error, results, fields) {
      if (error) throw error;
      Points = parseInt(results[0].Points);
      Points++;
      Points++;
      if (Points >= 100) {
        var sql = 'select Level from Data Where DiscordID =' + SQLconnection.escape(msg.author.id);
        SQLconnection.query(sql, function (error, results, fields) {
          if (error) throw error;
          Level = parseInt(results[0].Level);
          Level += 1;
          var sql = 'UPDATE `Data` SET `Level` =' + SQLconnection.escape(Level) + ' , `Points` = ' + SQLconnection.escape(0) + ' WHERE (`DiscordID` = ' + SQLconnection.escape(msg.author.id) + ')';
          SQLconnection.query(sql, function (error, results, fields) {
            if (error) throw error;
            msg.channel.send("<@" + msg.author.id + "> Has Leveld up to " + Level + ". Level.");
          });
        });
      } else {
        var sql = 'UPDATE `Data` SET `Points` = ' + SQLconnection.escape(Points) + ' WHERE (`DiscordID` = ' + SQLconnection.escape(msg.author.id) + ')';
        SQLconnection.query(sql, function (error, results, fields) {
          if (error) throw error;
          console.log(results)
        });
      }
    });
  }
});