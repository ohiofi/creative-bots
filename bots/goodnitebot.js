const helpers = require(__dirname + '/../helpers/helpers.js'),
      cronSchedules = require( __dirname + '/../helpers/cron-schedules.js' ),
      TwitterClient = require(__dirname + '/../helpers/twitter.js'),
      animals = require( __dirname + '/../data/animals.js' ),
      mastodonClient = require(__dirname + '/../helpers/mastodon.js'),
      tumblrClient = require(__dirname + '/../helpers/tumblr.js');

const twitter = new TwitterClient( {
  consumer_key: process.env.GOODNITEBOT_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.GOODNITEBOT_TWITTER_CONSUMER_SECRET,
  access_token: process.env.GOODNITEBOT_TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.GOODNITEBOT_TWITTER_ACCESS_TOKEN_SECRET
},"GoodniteBot" );

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
  name: 'GoodniteBot',
  description: 'Just a very basic bot!',
  /*
    The `interval` can be either one of the values inside helpers/cron-schedules.js, or you can also use custom cron schedules.
    See https://www.npmjs.com/package/cron#available-cron-patterns for more details.
  */
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

  let airRhymes = new Array("bear","millionaire","chocolate éclair","black bear","multimillionaire","cinnamon bear","grizzly bear","teddy bear","polar bear","arctic hare","air","hair","mare","pear","pair","chair","square","hare","fair","county fair","flair","flare","heir","lair","snare","questionaire","Voltaire","Pierre");
  const rhymes = new Array(
    new Array("mail","whale","jail","sail","kale","ale","hail","nail","pail","rail","tail","tale","veil","Yale"),
    new Array("brain","Spain","chain","crane","cane","stain","pane","plane","drain","strain","rain","terrain","Great Dane","mane"),
    new Array("cake","lake","stake","brake","snake","rake"),
    new Array("ball","mall","hall","phone call","cannonball","fireball","goofball","nightfall","pitfall","racquetball","waterfall"),
    new Array("clam","cam","dam","ram","lamb","graham","sham","tram","exam","madame","program","jam","telegram","yam"),
    new Array("can","clan","fan","man","Iran","scan","Japan","plan","Sudan","LAN","pan"),
    new Array("bank","blank","prank","tank"),
    new Array("cap","lap","map","rap","trap"),
    new Array("cash","hash","lash","mash","ash"),
    new Array("bat","cat","rat","hat","animal fat"),
    new Array("Beyoncé","bay","hay","clay","play","sleigh","spray","stray","tray","display","essay","fillet","highway","résumé","stairway","bouquet","padre","valet","Will Forte","USA","ballet","buffet","fiancé","subway","Norway"),
    new Array("jaw","claw","straw","slaw","saw","paw","gaping maw","Utah","flaw","law","shaw","outlaw"),
    new Array("bed","bread","head","shed","spread","thread","thoroughbred","bed","head","sled","thoroughbred","bread","shed"),
    new Array("flee","knee","tree","key","ski","pea","bee","algae","army","sea","debris","tv","referee","Tennessee", "bourgeoisie","CD","DVD"),
    new Array("bell","Adele","hotel","smell","cell","well","shell","gel"),
    new Array("jet","net","pet","vet","brunette","coronet","moist towelette","cigarette","cadet"),
    new Array("chest","nest","vest","guest","test","pest"),
    new Array("eye","fly","fry","guy","pie","spy","tie"),
    new Array("kite","night","knight","fight","sprite","fright","height","bite"),
    new Array("vine","spine","nine","fine","mine","resign","line","pine","spine","wine"),
    new Array("log","fog","frog","hog","bog","cog","dog","grog","blog"),
    new Array("dot","knot","pot","Scott","snot","yacht"),
    new Array("fawn","John","lawn","pawn","swan"),
    new Array("crew","glue","screw","shoe","stew","Sue","goo","dude","food","canoe","Peru","zoo"),
    new Array("crow","dough","hoe","snow","show","toe"),
    new Array("mom","bomb","palm","Guam","prom"),
    new Array("dad","Chad","lad","pad","plaid"),
    new Array("Shrek","check","deck","neck","tech","wreck"),
    new Array("tweet","beet","feet","heat","meat","seat","street","treat","wheat")
  );

  const adj = new Array("abandoned","aggressive","altruistic","annoying","anxious","athletic","attractive","awesome","beautiful","big","big headed","big nosed","bite-sized","black","bland","blue","booger eater","booger eating","bouncy","bright","calm","chubby","chunky","clear-cut","clumsy","colossal","confused","cool","courageous","cowardly","crazy","creepy","crippled","cute","dangerous","dark","deformed","dense","depressed","dinosaur-armed","dirty","disgusting","dishonest","dizzy","do do dunderhead","dull","dumb","elliptical","embarrassed","enormous","evil","excited","faceless","fast","fat","fearful","flat","fluffy","friendly","fun","funky","funny","furious","fuzzy","geek","ghetto","giant","gigantic","gnarly","gray","green","gross","grouchy","gucci","hairy","happy","heartbroken","hideous","hillbilly","huge","humongous","idiot","imaginative","immature","inappropriate","indigo","intelligent","interested","invisible","kind","lame","lime green","lonely","loser","lowkey","lovely","magenta","mature","mean","mentally unstable","microscopic","multi-headed","mysterious","mystical","nerd","nerdy","nervous","nonfunctional","obedient","obese","oblivious","observant","obsessed","on fleek","one eyed","orange","outgoing","oversized","overweight","pale","paranoid","peaceful","pitiful","pleasant","poor","popular","possessed","predictable","pretty","proud","pudgy","puking","purple","quiet","random","ratchet","rebellious","red","redneck","rested","robotic","round","rusty","sad","salty","savage","scared","scrawny","sharp","short","shy","skinny","sly","small","smart","smelly","sneaky","soft","speechless","squishy","stinky","strong","stupid","sunny","sweet","tall","tame","tan","thin","thug","tiny","touchy","turquoise","twitchy","tyrannical","ugly","unappealing","unattractive","vexed","vulgar","weird","weirdo","white","wide","yellow","young");

  const synonymsForFun = new Array("sport","weird flex","fun","play","a joke","joy","cheer","a game","mirth","a romp","a sight","nonsense","a treat","absurdity","enjoyment","a pastime","a blast","buffoonery","clowning","festivity","tomfoolery","foolery","horseplay","playfulness","highjinks","joking","drivel","baloney","babble","diddle","folly","foolishness","gibberish","madness","rubbish","silliness","stupidity","balderdash","bananas","craziness","giddiness","hogwash","hooey","jest","poppycock","tripe","a goof","goofiness","applesauce","a farce","idiocy","daftness","illogicalness","insanity","madness","lunacy","horse feathers","mish mash","malarky","monkey business","antics","clowning around","absurdness","a prank","mischief","monkeyshine","piffle","a delight","regalement","hilarity","hoopla","comedy","a schtick","satire","humor","slapstick","a scene","a display","a spectacle","a show");

  const synonymsForLaughed = new Array("laughed","chuckled","giggled","grinned","LOL'd","ROFL'd","howled","snickered","snorted","chortled","cracked up","smirked","cackled","guffawed","smiled","was amused","was delighted","was happy","was pleased","beamed","died laughing","was entertained","was tickled","said 'haha'");

  const roomNoun = new Array("room","hall","bathroom","man cave","apartment","cabin","cave","garage","chamber","cubicle","office","den","basement","kitchen","condo","crib","chalet","place","cabin","outback","house","skyscraper","roadhouse","saloon","shack","diner","hut","warehouse","tent","palace","pizzeria","castle","kingdom","lounge","village","shop","factory","cafe","bar","cottage","den","cave","fort","bungalow","asylum","building","cage","coliseum","dungeon","jail","prison cell","stadium","pit","gymnasium","school","classroom","chatroom","attic","cafeteria","coatroom","computer lab","study hall","library","fallout shelter","shed","workshop","control room","war room","laundry room","barn","greenhouse","gas station","hotel","mall","supermarket","museum","theater","courthouse","post office","church","airport","lighthouse","bakery","beauty salon","fast-food restaurant","hospital","funeral home","igloo","tree house","mobile home","trailer park","living room","dining room");

  const color = new Array("black","white","green","purple","orange","red","pink","blue","yellow","brown","gray","gold","mauve","peach","tan","slate","teal","taupe","bronze","rose","plum","mint","grape","jade","pearl","lime");

  function generateText(){
    shuffle(rhymes);
    let rhymeSet1=rhymes[0];
    let rhymeSet2=rhymes[1];
    let rhymeSet3=rhymes[2];
    let rhymeSet4=rhymes[3];
    let rhymeSet5=rhymes[4];
    let rhymeSet6=rhymes[5];
    shuffle(rhymeSet1);
    shuffle(rhymeSet2);
    shuffle(rhymeSet3);
    shuffle(rhymeSet4);
    shuffle(rhymeSet5);
    shuffle(rhymeSet6);
    shuffle(adj);
    shuffle(roomNoun);
    shuffle(color);
    shuffle(animals);
    shuffle(airRhymes);
    shuffle(synonymsForFun);
    shuffle(synonymsForLaughed);

    return new Array(
      "In the "+adj[0]+" "+color[0]+" "+roomNoun[0]+
      ", there was a telephone. And a "+color[1]+" "+rhymeSet1[0]+
      ", and a picture of the "+animals[0]+" jumping over the "+rhymeSet1[1]+
      ". And there were three "+adj[1]+" "+rhymeSet2[0]+"s sitting on "+rhymeSet2[1]+
      "s. And two "+adj[2]+" "+rhymeSet3[0]+"s, and a pair of "+rhymeSet3[1]+"s.",

      "And a "+adj[3]+" toy "+rhymeSet4[0]+", and a "+adj[4]+" "+rhymeSet4[1]+
      ". And a "+animals[1]+" and a "+rhymeSet5[0]+", and a bowl full of "+rhymeSet5[1]+
      "s. And a "+adj[5]+" "+adj[6]+" lady who was whispering '"+rhymeSet5[2]+"'.",

      "Goodnight "+roomNoun[0]+", goodnight "+rhymeSet1[1]+". Goodnight "+animals[0]+
      " jumping over the "+rhymeSet1[1]+". Goodnight light and the "+color[1]+" "+
      rhymeSet1[0]+". Goodnight "+rhymeSet2[0]+"s, goodnight "+rhymeSet2[1]+
      "s. Goodnight "+rhymeSet3[0]+"s, and goodnight "+rhymeSet3[1]+"s. Goodnight "+
      adj[3]+" "+rhymeSet4[0]+", and goodnight "+rhymeSet4[1]+".",

      "Goodnight "+animals[1]+", and goodnight "+rhymeSet5[0]+
      ". Goodnight nobody, goodnight "+rhymeSet5[1]+"s. And goodnight to the "+
      adj[6]+" lady whispering '"+rhymeSet5[2]+"'. Goodnight "+rhymeSet6[0]+
      "s, goodnight "+airRhymes[0]+", goodnight "+rhymeSet6[1]+"s everywhere."
    );
  }

  const { TwitThread } = require("twit-thread");
// or import { TwitThread } from "twit-thread" in Typescript
  const config = {
    consumer_key: process.env.GOODNITEBOT_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.GOODNITEBOT_TWITTER_CONSUMER_SECRET,
    access_token: process.env.GOODNITEBOT_TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.GOODNITEBOT_TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  };
  async function tweetThread() {
     const t = new TwitThread(config);
     const arr = generateText();
     await t.tweetThread([{text: arr[0]}, {text: arr[1]}, {text: arr[2]}, {text: arr[3]}]);
  }
  tweetThread();

    //twitter.tweet( text );
    //mastodon.toot( text );
    //tumblr.post( title, text );
  }
};
