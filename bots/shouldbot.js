const helpers = require(__dirname + '/../helpers/helpers.js'),
      cronSchedules = require( __dirname + '/../helpers/cron-schedules.js' ),
      TwitterClient = require(__dirname + '/../helpers/twitter.js'),
      mastodonClient = require(__dirname + '/../helpers/mastodon.js'),
      tumblrClient = require(__dirname + '/../helpers/tumblr.js');

const twitter = new TwitterClient( {
  consumer_key: process.env.SHOULDBOT_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.SHOULDBOT_TWITTER_CONSUMER_SECRET,
  access_token: process.env.SHOULDBOT_TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.SHOULDBOT_TWITTER_ACCESS_TOKEN_SECRET
},"ShouldBot" );


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
  name: 'ShouldBot',
  description: 'Just a very basic bot!',
  /*
    The `interval` can be either one of the values inside helpers/cron-schedules.js, or you can also use custom cron schedules.
    See https://www.npmjs.com/package/cron#available-cron-patterns for more details.
  */
  //interval: cronSchedules.EVERY_THIRTY_MINUTES,
  interval: cronSchedules.EVERY_THIRTY_SECONDS,
  script: function(){
  /*
    This is your bot's main code. Check out botwiki.org/resources for tutorials and botwiki.org/bots for some inspiration.
  */

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    }

    function choice(arr){
      return arr[Math.floor(Math.random()*arr.length)]
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

    function punctuationCut(str)
    {
      str = str.replace("’", "'");
      if(str.indexOf("U.S. ") != -1 )// Convert " U.S. " to " US "
      	str = str.replace("U.S. ","US ");
      if(str.indexOf("?") != -1 )// Cut at "?"
        str = str.slice(0,str.indexOf("?")+1);
      if(str.indexOf(".") != -1 )// Cut at "."
        str = str.slice(0,str.indexOf(".")+1);
      if(str.indexOf("!") != -1 )// Cut at "!"
        str = str.slice(0,str.indexOf("!")+1);
      if(str.indexOf("|") != -1 )// Cut at "|"
        str = str.slice(0,str.indexOf("|"));
      if(str.indexOf("http") != -1 )// Cut at "http"
        str = str.slice(0,str.indexOf("http"));
      if(str.indexOf("www") != -1 )// Cut at "www"
        str = str.slice(0,str.indexOf("www"));
      if(str.indexOf(":") != -1 )// Cut at ":"
        str = str.slice(0,str.indexOf(":"));
      if( str.indexOf("#") != -1 ){// Convert "#" to ""
    		str = str.replace("#","");
      }
      if( str.indexOf(" me ") != -1 ){// Convert " me " to " Dispatch "
    		str = str.replace(" me "," the Dispatch ");
      }
    	if( str.indexOf("&amp;") !== -1 ){// Convert "&amp;" to "&"
    		str = str.replace("&amp;","&");
      }
      str = str.trim();
      return str;
    }



    function get_ats_since_last(arr){
      // Check for @ mentions since ShouldBot's last tweet
    	twitter.getMentions( 50, arr[0].id, tweet_crafter );// Get new @mentions since the user's last tweet

    }

    function replaceAllWith(str,search,replaceWith){
      return str.split(search).join(replaceWith)
    }

    function presplitReplacements(str){
      str = replaceAllWith(str, ", or ", " or "); // Remove Oxford commas. Convert ", or " to " or "
      str = replaceAllWith(str, ", ", " or "); // Convert ", " to " or "
      str = replaceAllWith(str, "@shouldbot", ""); // Convert "@shouldbot" to ""
      str = replaceAllWith(str, "?", ""); // Convert "?" to ""
      str = replaceAllWith(str, ".", ""); // Convert "." to ""
      str = replaceAllWith(str, "!", "");// Convert "!" to ""
      return str
    }

    function postsplitReplacements(str){
      if(str.indexOf(" my") > -1){ // Replace " my" with " your"
        str = replaceAllWith(str, " my", " your");
      }else if (str.indexOf(" your") > -1) { // If there is no " my", replace "your" with "my"
        str = replaceAllWith(str, " your", " my");
      }

      if(str.indexOf(" me ") > -1){ // Replace " me " with " you "
        str = replaceAllWith(str, " me "," you ");
      }else if (str.indexOf(" you ") > -1) { // If there is no " me ", replace " you " with " me "
        str = replaceAllWith(str, " you ", " me ");
      }

      str = replaceAllWith(str, " u ", " me ");// Replace " u " with " me "

      str = replaceAllWith(str, "should i ","you should ");// Replace "should i " with "you should ".

      str = replaceAllWith(str, "i should ","you should ");// Replace "i should " with "you should ".

      str = replaceAllWith(str, "will i ","you will ");// Replace "will i " with "you will "

      str = replaceAllWith(str, " i "," you ");// Replace " i " with " you "

      str = replaceAllWith(str, "is it","it is");// Replace "is it" with "it is"

      str = replaceAllWith(str, "is that","that is");// Replace "is that" with "that is"

      str = replaceAllWith(str, "should we ","you should ");// Replace "should we " with "you should "

      str = replaceAllWith(str, "would that","that would");// Replace "would that" with "that would"

      str = replaceAllWith(str, " here "," there ");// Replace " here " with " there "

      str = replaceAllWith(str, " this "," that ");// Replace " this " with " that "

      return str
    }

    function tweet_crafter(arr){
      for(let i=0;i<arr.length;i++){ // for each mention tweet
        let txt = arr[i].text;
        txt = txt.toLowerCase();// make it lowercase
        if (!passedBanlist(txt)){
          console.log(i+"- Failed Banlist - "+arr[i].text);
          continue
        }
        if (txt.indexOf(" or ") == -1){
          console.log(i+"- Missing Keyword 'or' - "+arr[i].text);
          continue
        }
        console.log("🥇Good Candidate == "+txt);
        txt = presplitReplacements(txt);
        let randomReplyArr = txt.split(" or ")// Convert to array, splitting at " or "
        shuffle(randomReplyArr);
        for(let j=0;j<randomReplyArr.length;j++){
          if(randomReplyArr[j].trim().length < 1){
            continue
          }
          let mytext = postsplitReplacements(randomReplyArr[j]);
          mytext = mytext.trim();
          mytext = ".@" + arr[i].user.screen_name + " " + mytext;// pre-pend the @ mention-er's username
          console.log("sending tweet: "+mytext);
          twitter.replyToTweet( mytext, arr[i].id_str );//tweet
          break
        }
      }
    }

    //twitter.search(choice(commonVerbs),100,tweet_crafter);
    twitter.getUserTweets( 'shouldbot', 1, get_ats_since_last );
  }
};
