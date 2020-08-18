const helpers = require(__dirname + '/../helpers/helpers.js'),
      cronSchedules = require( __dirname + '/../helpers/cron-schedules.js' ),
      TwitterClient = require(__dirname + '/../helpers/twitter.js'),
      animals = require( __dirname + '/../data/animals.js' ),
      mastodonClient = require(__dirname + '/../helpers/mastodon.js'),
      tumblrClient = require(__dirname + '/../helpers/tumblr.js');

const twitter = new TwitterClient( {
  consumer_key: process.env.BROWNBEARBOT_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.BROWNBEARBOT_TWITTER_CONSUMER_SECRET,
  access_token: process.env.BROWNBEARBOT_TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.BROWNBEARBOT_TWITTER_ACCESS_TOKEN_SECRET
} );

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
  name: 'BrownBearBot',
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
    const randomColor = new Array("Red","Orange","Yellow","Green","Blue","Purple","Red","Orange","Yellow","Green","Blue","Indigo","Violet","Purple","Magenta","Cyan","Pink","Brown","White","Gray","Black","Tan","Aqua","Sea Green","Wild Strawberry","Mango","Pear","Polka Dot","Tutti Fruiti","Neon Green","Neon Pink","Grey","Beige","Chartreuse","Khaki","Salmon","Fuchsia","Maroon","Plum","Burnt Sienna","Turquoise","Peach","Periwinkle","Silver","Gold","Copper","Mauve","Mustard","Scarlet","Dark Blue","Dark Green","Dark Purple","Light Green","Light Blue","Light Brown","Light Purple","Colorless","Opaque","Cerulean","Lavendar","Olive","Lime","Ecru","Eggshell","Offwhite","Aquamarine","Ochre","Sage","Sepia","Teal","Taupe","Ruby","Lilac","Chocolate","Cream","Crimson","Rose","Azure","Lemon","Pale");

    function choice(arr){
      return arr[Math.floor(Math.random()*arr.length)]
    }

    function toTitleCase(str){
      //toLowerCase() method returns the calling string value converted to lowercase
      //split() method splits a String object into an array of strings by separating the string into substrings.
      let arr = str.toLowerCase().split(" ");
      //charAt() method returns the specified character from a string.
      //slice() method extracts a section of a string and returns a new string.
      for(let i=0;i<arr.length;i++){
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
      //join() method joins all elements of an array into a string.
      return arr.join(" ")
    }

    function tweet_crafter(arr){
      let newTweet = "";
      let newColor = "Red";
      let animalPos = 0;
      let lastColorAnimal = arr[0].text;
      console.log(lastColorAnimal);
      if(lastColorAnimal.indexOf("I see a ") != -1 ){// if contains I SEE A
      	animalPos = lastColorAnimal.indexOf("I see a ")+8;
      }else{
      	animalPos = lastColorAnimal.indexOf("I see an ")+9;
      }
      lastColorAnimal = lastColorAnimal.substring(animalPos,lastColorAnimal.indexOf(" looking at me."));
      console.log(lastColorAnimal);

      newColor = choice(randomColor);
      while(lastColorAnimal.indexOf(newColor) != -1){ // while last animal has the new color
        newColor = choice(randomColor);
      }

      newAnimal = toTitleCase(choice(animals));
      //
      while(lastColorAnimal.indexOf(newAnimal) != -1){ // while last animal has the new animal
        newAnimal = choice(animals);
      }

      let hashtag = newColor+newAnimal;
      hashtag = hashtag.split(" ").join("");
      const vowelRegex = '^[aieouAIEOU].*';
      if(newColor.match(vowelRegex)){ // starts with vowel
        newTweet = lastColorAnimal+", "+lastColorAnimal+", What do you see? I see an "+newColor+" "+newAnimal+" looking at me. #"+hashtag;

      }else{ // does NOT start with vowel
        newTweet = lastColorAnimal+", "+lastColorAnimal+", What do you see? I see a "+newColor+" "+newAnimal+" looking at me. #"+hashtag;
      }
      console.log(newTweet)
      twitter.replyToTweet(newTweet, arr[0].id);
    }

    twitter.getUserTweets( 'brownbearbot', 1, tweet_crafter );
    //mastodon.toot( text );
    //tumblr.post( title, text );
  }
};
