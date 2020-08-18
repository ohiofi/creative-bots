const helpers = require(__dirname + '/../helpers/helpers.js'),
      cronSchedules = require( __dirname + '/../helpers/cron-schedules.js' ),
      TwitterClient = require(__dirname + '/../helpers/twitter.js'),
      mastodonClient = require(__dirname + '/../helpers/mastodon.js'),
      tumblrClient = require(__dirname + '/../helpers/tumblr.js');

const twitter = new TwitterClient( {
  consumer_key: process.env.MUSCLEMANBOT_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.MUSCLEMANBOT_TWITTER_CONSUMER_SECRET,
  access_token: process.env.MUSCLEMANBOT_TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.MUSCLEMANBOT_TWITTER_ACCESS_TOKEN_SECRET
},"MuscleManBot" );


// const mastodon = new mastodonClient( {
//    access_token: process.env.BOT_1_MASTODON_ACCESS_TOKEN,
//    api_url: process.env.BOT_1_MASTODON_API
// } );
//
// const tumblr = new tumblrClient( {
//   tumblr_name: process.env.BOT_1_TUMBLR_BLOG_NAME,
//   consumer_key: process.env.BOT_1_TUMBLR_CONSUMER_KEY,
//   consumer_secret: process.env.BOT_1_TUMBLR_CONSUMER_SECRET,
//   token: process.env.BOT_1_TUMBLR_CONSUMER_TOKEN,
//   token_secret: process.env.BOT_1_TUMBLR_CONSUMER_TOKEN_SECRET
// } );

module.exports = {
  /*
    Basic information about your bot.
  */
  active: true, // All bots inside the "bots" folder are loaded automatically. Change "active" to false to prevent loading your bot.
  name: 'MuscleManBot',
  description: 'Just a very basic bot!',
  /*
    The `interval` can be either one of the values inside helpers/cron-schedules.js, or you can also use custom cron schedules.
    See https://www.npmjs.com/package/cron#available-cron-patterns for more details.
  */
  //interval: cronSchedules.EVERY_THIRTY_MINUTES,
  interval: cronSchedules.EVERY_TWO_HOURS,
  script: function(){
  /*
    This is your bot's main code. Check out botwiki.org/resources for tutorials and botwiki.org/bots for some inspiration.
  */





    function findGoodCandidateIndex(arr){
      for(let i=0;i<arr.length;i++){
        let txt = arr[i].text;
        if (txt.length > 115){
          console.log("- Too Long - "+arr[i].text);
          continue
        }
        if (!passedBanlist(txt)){
          console.log("- Failed Banlist - "+arr[i].text);
          continue
        }
        if (!containsKeyword(txt)){
          console.log("- No Keyword Found - "+arr[i].text);
          continue
        }
        return i
      }
      return -1
    }

    function passedBanlist(str){
      str = str.toLowerCase();
      let banlist = process.env.BANLIST.toLowerCase().split(",");
      for (let i = 0; i < banlist.length; ++i) {
        if (str.indexOf(banlist[i]) > -1) {
          return false; // String is present
        }
      }
      return true; // No banlisted strings are present
    }

    const keywords = [
      " is ",
      " isn't ",
      " will ",
      " won't ",
      " wants ",
      " wanted ",
      " can ",
      " can't ",
      " made ",
      " got ",
      " hasn't ",
      " had ",
      " went ",
      " does ",
      " doesn't ",
      " gets to ",
      " takes ",
      " tries ",
      " tried ",
      " failed ",
      " it's "
    ]

    function containsKeyword(str){
      str = str.replace("’", "'");
      let lowerStr = str.toLowerCase();
      for (let i = 0; i < keywords.length; ++i) {
        if(lowerStr.indexOf(keywords[i]) > -1){
          return true
        }
      }
      return false
    }

    function keywordCut(str){
      str = str.replace("’", "'");
      let lowerStr = str.toLowerCase();
      for (let i = 0; i < keywords.length; ++i) {
        if(lowerStr.indexOf(keywords[i]) > -1){
          if(keywords[i] == " it's "){
            return " is "+str.slice(lowerStr.indexOf(keywords[i])+6,str.length)
          }
          return str.slice(lowerStr.indexOf(keywords[i]),str.length)
        }
      }
      return "oops"
    }

    // yr code here
    function punctuationCut(str)
    {
      str = str.replace("’", "'");
      if(str.indexOf("U.S. ") != -1 )// Convert " U.S. " to " US "
      	str = str.replace("U.S. ","US ");
      if(str.indexOf("?") != -1 )// Cut at "?"
        str = str.slice(0,str.indexOf("?"));
      if(str.indexOf(".") != -1 )// Cut at "."
        str = str.slice(0,str.indexOf("."));
      if(str.indexOf("!") != -1 )// Cut at "!"
        str = str.slice(0,str.indexOf("!"));
      if(str.indexOf("|") != -1 )// Cut at "|"
        str = str.slice(0,str.indexOf("|"));
      if(str.indexOf("http") != -1 )// Cut at "!"
        str = str.slice(0,str.indexOf("http"));
      if(str.indexOf("www") != -1 )// Cut at "!"
        str = str.slice(0,str.indexOf("www"));
      if(str.indexOf(":") != -1 )// Cut at ":"
        str = str.slice(0,str.indexOf(":"));
      if(str.indexOf(" himself ") != -1 )// Convert " his " to " her "
        str = str.replace(" himself "," herself ");
      if(str.indexOf(" his ") != -1 )// Convert " his " to " her "
      	str = str.replace(" his "," her ");
      if(str.indexOf(" he ") != -1 )// Convert " he " to " she "
        str = str.replace(" he "," she ");
      if(str.indexOf(" he's ") != -1 )// Convert " he " to " she "
        str = str.replace(" he's "," she's ");
      if(str.indexOf(" man ") != -1 )// Convert " he " to " she "
        str = str.replace(" man "," woman ");
      str = str.trim();
      return str;
    }

    function tweet_crafter(myArray){
      let index = findGoodCandidateIndex(myArray);
      if(index == -1){
        return
      }
      console.log("🥇Good Candidate == "+myArray[index].text)
      let tweetText = "You know who else"+keywordCut(myArray[index].text)
      tweetText = punctuationCut(tweetText);
      tweetText+="? https://twitter.com/"+myArray[index].user.screen_name+"/status/"+myArray[index].id_str;// Append the URL of the @ mention";
      console.log(tweetText);

      let text = tweetText;
      let in_reply_to_status_id = myArray[index].id;
      twitter.replyToTweet(text, in_reply_to_status_id);

    }

    setTimeout(
      function(){twitter.getTimeline(50,tweet_crafter)},
      1000 * 60 * Math.floor(1 + Math.random() * 59) //ms*s*m*h
    );
    //mastodon.toot( text );
    //tumblr.post( title, text );
  }
};
