const editJsonFile = require("edit-json-file");
const Discord = require('discord.js');
var mysql      = require('mysql');

let JsonData = require("./Tokens.json");

console.log(JsonData.Dtoken);

var MySqlU = JsonData.MySqlU;
var MySqlP = JsonData.MySqlP;
var MySqlIP = JsonData.MySqlIP;
var Dtoken = JsonData.Dtoken;

var SQLconnection = mysql.createConnection({
  host     : MySqlIP,
  user     : MySqlU,
  password : MySqlP,
  database : 'DiscordLevel'
});
const client = new Discord.Client();


client.login(JsonData.Dtoken);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    var Count;
    for(Count in client.users.array()){
        var User = client.users.array()[Count];
        DataBaseTest(User.username, User.id, SQLconnection);
        //console.log(User.username);
        process.exit();
     } 
});

client.on('guildMemberAdd', member => {
  console.log(member.username)
});

function DataBaseTest(Username, userid, connection) {
  connection.query(`SELECT * from Data where DiscordID = ${userid}`, function (error, results, fields) {
    if (error) throw error;
    if (!results.length) {
      var UsernameS = String(Username);
      var useridS = String(userid);
      console.log("added User:")
      console.log(useridS);
      console.log(UsernameS);
      console.log();
      var sql = 'INSERT INTO Data (DiscordID, DiscordName, Level, Points) VALUES (' + connection.escape(useridS)+ ", " + connection.escape(UsernameS) + ', 0, 0)';
      connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        
      });

    };
  });
}

