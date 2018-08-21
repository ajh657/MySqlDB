const editJsonFile = require("edit-json-file");
const Discord = require('discord.js');
var mysql      = require('mysql');

let file = editJsonFile(`${__dirname}/Con.json`);
var SQLconnection = mysql.createConnection({
  host     : file.get("MySqlIP").ToString,
  user     : file.get("MySqlU").ToString,
  password : file.get("MySqlP").ToString,
  database : 'DiscordLevel'
});
const client = new Discord.Client();


client.login(file.get("Dtoken"));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    var Count;
    for(Count in client.users.array()){
        var User = client.users.array()[Count];
        var Test = false;
        console.log(User.username);
     } 
});

function DataBaseTest(Username) {
    
}

//console.log(file.get("Dtoken"));
//console.log(file.get("MySqlU"));
//console.log(file.get("MySqlP"));

