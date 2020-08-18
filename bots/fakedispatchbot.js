const helpers = require(__dirname + '/../helpers/helpers.js'),
      cronSchedules = require( __dirname + '/../helpers/cron-schedules.js' ),
      TwitterClient = require(__dirname + '/../helpers/twitter.js'),
      mastodonClient = require(__dirname + '/../helpers/mastodon.js'),
      tumblrClient = require(__dirname + '/../helpers/tumblr.js');

const twitter = new TwitterClient( {
  consumer_key: process.env.FAKEDISPATCHBOT_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.FAKEDISPATCHBOT_TWITTER_CONSUMER_SECRET,
  access_token: process.env.FAKEDISPATCHBOT_TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.FAKEDISPATCHBOT_TWITTER_ACCESS_TOKEN_SECRET
},"FakeDispatchBot" );


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
  name: 'FakeDispatchBot',
  description: 'Just a very basic bot!',
  /*
    The `interval` can be either one of the values inside helpers/cron-schedules.js, or you can also use custom cron schedules.
    See https://www.npmjs.com/package/cron#available-cron-patterns for more details.
  */
  //interval: cronSchedules.EVERY_THIRTY_MINUTES,
  interval: cronSchedules.EVERY_FOUR_HOURS,
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

    // Random replies
    let commonVerbs = new Array(" says "," announces "," reports "," reveals "," decides "," claims "," press release states "," declares "," discloses "," divulges "," proclaims "," makes public "," communicates "," tells "," broadcasts "," issues apology "," issues statement "," releases statement on "," announces plan "," is "," has "," wins "," has found "," wins "," holds "," is working on "," is gonna "," says "," says "," says that "," announces "," reports "," reveals "," decides "," claims "," press release states "," declares "," discloses "," divulges "," proclaims "," makes public "," communicates "," tells "," broadcasts "," issues apology for "," issues statement on "," releases statement on "," announces plan to "," promises to "," agrees to "," commits to "," guarantees to "," pledges to "," vows to "," swears to "," has probably "," will likely "," will most likely "," will probably "," will possibly "," may have "," might have "," has almost "," is probably "," was probably "," has most likely "," will prolly "," finds that "," realizes that "," discovers that "," loses "," believes that "," does not believe that "," has discovered "," has found "," is trying to "," denies that "," does not want "," refuses to admit "," will probably never "," is trying not to "," has decided to "," has decided not to "," can't find "," can't figure out "," doesn't understand ");
    let onionAdjs = new Array("Local","Local","Local","Area","Area","Area","Local","Local","Local","Area","Area","Area","Local","Local","Local","Area","Area","Area","Local","Local","Local","Area","Area","Area","Local","Local","Local","Area","Area","Area","Columbus","Campus","Central Ohio","Suburban","Licking County","Fairfield County","Pickaway County","Madison County","Union County","Delaware County","Franklin County","Bexley","Upper Arlington","New Albany","Canal Winchester","Italian Village","Old Towne East","Pickerington","Pataskala","Blacklick","Hilliard","Grove City","Hilltop","Franklinton","Short North","Dublin","Westerville","Antifa","Concerned");
    let onionNouns = new Array("man","man","man","father","woman","mother","mom","mom","mom","hipster","idiot","household","girlfriend","boyfriend","wife","husband","Boy Scout troop","Girl Scout troop","church","school","geezer","band","punk","yuppie","hippie","bigot","mailman","chef","boy","girl","child","dad","vegan","vegetarian","artist","DJ","musician","malitia","biker","drunk","jock","nerd","geek","alcoholic","bodybuilder","bro","brony","cosplayer","freak","gamer","hacker","juggalo","psychic","Trekkie","goth","jazz musician","bully","criminal","ruffian","youngster","brat","delinquent","teen","teenager","sinner","lottery winner","lotto winner","lottery loser","hero","politician","wimp","loser","dork","boomer","business","store","club","entrepreneur","priest","preacher","church","satanist","nudist","cult","secret society","mafia","crime boss","conspiracy theorist","grandfather","grandmother","con artist","football coach","chef","thief","super hero","criminal mastermind","supervillian","wizard","billionaire","fortuneteller","necromancer","sorcerer","lawyer","miscreant","lowlife","clown","mime","vampire","lizard person");
    let properNouns = new Array("Mike DeWine","Gov. DeWine","Jim Jordan","John Kasich","Kasich","Obama","Trump","Ted Strickland","Sherrod Brown","Rob Portman","John Glenn","Jim Tressel","Urban Meyer","Michael Coleman","Andrew Ginther","Les Wexner","John F Wolfe","Campus Partners","Port Columbus","Easton","Columbus Zoo","Columbus Museum of Art","Columbus PD","Franklin County Sheriff Dallas Baldwin","Cameron Mitchell","Kevin Kurgis","John Boehner","Urban Meyer","LeBron James","Jack Nicklaus","Jack Hanna","Pete Rose","Drew Carey","EW Scripps","George Gund Jr","Jay Schottenstein","The Limited","Victoria's Secret","American Eagle Outfitters","DSW Shoes","Great Lakes Cheese","Great Lakes Brewery","Lake Erie","Scioto River","Ohio River","Wayne National Forest","Cintas Corporation","Jeni's Splendid Ice Cream"," Macy's","Pampers","Procter & Gamble","Kroger","Sherwin-Williams","Progressive Insurance","Nationwide Insurance","Cardinal Health","Goodyear Tire","Fifth Third Bank","KeyBank","Big Lots","Aladdin's Eatery","The Andersons","Arby's","Cedar Point","Diebold","Jo-ann Fabrics","LensCrafters","The Longaberger Company","Melt Bar and Grilled","Scotts Miracle-Gro","Bob Evans","Damon's Grill","East of Chicago Pizza","Hot Head Burritos","Max & Erma's","Piada Italian Street Food","Rax Roast Beef","Wendy's","White Castle","The Ohio State University","Miami University","Ohio University","University of Cincinnati","Oberlin College","Kent State University","Bowling Green State University","Wright State University","University of Toledo","University of Akron","Cincinnati Reds","Cleveland Indians","Cincinnati Bengals","Cleveland Browns","Cleveland Cavaliers","Columbus Blue Jackets","Columbus Crew","Pro Football Hall of Fame","Rock and Roll Hall of Fame","Columbus Clippers","COSI","Franklin Park Conservatory","Columbus Metro Parks","North Market","Comfest","Ohio State Fair","CCAD","CSCC","OSU","Columbus City Schools","CCS","Zack Scott","Ohio Theater","CAPA","CMOA","CSO","Columbus Symphony Orchestra","TBDBITL","Ballet Met","Jobs Ohio","Old Man's Cave","Hocking Hills","Buckeye Lake","Olentangy Indian Caverns","OHSAA","Golden Voice Ted Williams","The Wilds","Put-In-Bay","WPAFB","King's Island","Yellow Springs hippie","German Village","Schmidt's Sausage Haus","Ohio Statehouse","Thurber House","LeVeque Tower","Alum Creek","Serpent Mound","JPMorgan Chase","OhioHealth","Honda","AEP","Abbott Labs","Nationwide Children's Hospital","South-Western City Schools","Battelle Institute","Dublin City Schools","Cardinal Health","Huntington Bank","ODOT","Columbus school official","Columbus driver","Columbus mom","Local man","Area teen","Hilltop resident","Clintonville hipster","Local band","Local brewery","Franklin County administrator","Delaware County administrator","Grove-tucky man","Suburban snob","Muirfield caddy","Roman Atwood","I-70","I-270","I-71","High Street","Broad Street","Bexley","Upper Arlington","New Albany","Canal Winchester","Italian Village","Old Towne East","Pickerington","Pataskala","Blacklick","Hilliard","Grove City","Hilltop","Franklinton","Short North","Gallery Hop","Dublin","Westerville","CML","Arena District","Discovery District","Park Street District","Victorian Village","Merion Village","Westgate","Beechwold","Washington Beach","Lincoln Village","Mill Run","San Margherita","Harrison West","Chicken Corner","Glen Echo","Iuka Ravine","Peach District","SoHud","Tuttle Park","Weinland Park","Linden","Berwick","Westland","Hollywood Casino","Wonderland","Downtown","CML","Columbus Library Main Branch","Greater Columbus Convention Center","Goodale Park","CD102.5","DSCC","Lincoln Theatre","Dirty Frank's Hot Dog Palace","Columbus Food League","Northstar Cafe","Hot Chicken Takeover","Hounddog's Pizza","Whetstone Park of Roses","Schiller Park","Mirror Lake","Dublin Irish Festival","Field of Corn Sculpture","16-Bit Barcade","Brothers Drake","Studio 35","Skully's","The Newport","Shadowbox","Used Kids","Thurman Cafe","The Dube","Wolf’s Ridge Brewing","Seventh Son Brewing","North High Brewing","Land-Grant Brewing","Four String Brewing","Homestead Beer","Ohio Lotto","Flavortown resident","Mothman","Mothman","Mothman","Loveland Frogman","Grassman","Big Ten Conference");

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

    function containsKeyword(str){
      str = str.replace("’", "'");
      let lowerStr = str.toLowerCase();
      for (let i = 0; i < commonVerbs.length; ++i) {
        if(lowerStr.indexOf(commonVerbs[i]) > -1){
          // keyword must not be at end of tweet
          let testCut = punctuationCut(keywordCut(lowerStr));
          if(testCut.indexOf(commonVerbs[i]) < testCut.length-commonVerbs[i].length){
            return true
          }
        }
      }
      return false
    }

    function keywordCut(str){
      str = str.replace("’", "'");
      let lowerStr = str.toLowerCase();
      for (let i = 0; i < commonVerbs.length; ++i) {
        if(lowerStr.indexOf(commonVerbs[i]) > -1){
          return str.slice(lowerStr.indexOf(commonVerbs[i]),str.length)
        }
      }
      return "oops"
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

    function findGoodCandidateIndex(arr){
      for(let i=0;i<arr.length;i++){
        let txt = arr[i].text;
        if (txt.indexOf('@') > -1){
          console.log(i+"- Contains @ - "+arr[i].text);
          continue
        }
        if (txt.length > 115){
          console.log(i+"- Too Long - "+arr[i].text);
          continue
        }
        if (!passedBanlist(txt)){
          console.log(i+"- Failed Banlist - "+arr[i].text);
          continue
        }
        if (!containsKeyword(txt)){
          console.log(i+"- No Keyword Found - "+arr[i].text);
          continue
        }
        return i
      }
      return -1
    }

    function getProperNoun(){
      if(Math.floor(Math.random()*2)==1){
        return choice(properNouns);
      }
      return choice(onionAdjs)+" "+choice(onionNouns);
    }

    function tweet_crafter(myArray){
      let index = findGoodCandidateIndex(myArray);
      if(index == -1){
        return
      }
      console.log("🥇Good Candidate == "+myArray[index].text)
      let tweetText = keywordCut(myArray[index].text)
      tweetText = punctuationCut(tweetText);
      let status = getProperNoun() +" "+ tweetText;
      console.log(status)
      twitter.tweet(status)
    }

    twitter.search(choice(commonVerbs),100,tweet_crafter);

  }
};
