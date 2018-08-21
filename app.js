const editJsonFile = require("edit-json-file");
const Discord = require('discord.js');
var mysql      = require('mysql');

let file = editJsonFile(`${__dirname}/Con.json`);
var SQLconnection = mysql.createConnection({
  host     : file.get("MySqlIP"),
  user     : file.get("MySqlU"),
  password : file.get("MySqlP"),
  database : 'DiscordLevel'
});
const client = new Discord.Client();


client.login(file.get("Dtoken"));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    var Count;
    for(Count in client.users.array()){
        var User = client.users.array()[Count];
        DataBaseTest(User.username, User.id, SQLconnection);
        //console.log(User.username);
     } 
});

function DataBaseTest(Username, userid, connection) {
  connection.query(`SELECT * from DiscordLevel where DiscordID = ${userid}`, function (error, results, fields) {
    if (error) throw error;
    if (!results.length) {
      connection.query(`INSERT INTO DiscordLevel (DiscordID, DiscordLevelPoints, DiscordLevelLevel, DiscordLevelName) VALUES (${userid}, 0, 0, ${Username})`, function (error, results, fields) {
        if (error) throw error;
        
      });

    };
  });
}

//console.log(file.get("Dtoken"));
//console.log(file.get("MySqlU"));
//console.log(file.get("MySqlP"));

