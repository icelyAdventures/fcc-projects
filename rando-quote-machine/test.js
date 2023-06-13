const colors = [
    "#2F4F4F",
    "#B22222",
    "#008000",
    "#E6E6FA",
    "#90EE90",
    "#87CEFA",
    "#FF4500",
    "#6A5ACD",
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'  
  ];

  const Quotes = [
    { 
      quote: "The purpose of our lives is to be happy.",
     author: "Dalai Lama"
    }, { 
      quote: "Life is what happens when you're busy making other plans.",
     author: "John Lennon"
    }, { 
      quote: "Get busy living or get busy dying.",
     author: "Stephen King"
    }, { 
      quote: "You only live once, but if you do it right, once is enough.",
     author: "Mae West"
    }, { 
      quote: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
     author: "Thomas A. Edison"
    }, { 
      quote: "If you want to live a happy life, tie it to a goal, not to people or things.",
     author: "Albert Einstein"
    }, { 
      quote: "Never let the fear of striking out keep you from playing the game.",
     author: "Babe Ruth"
    }, { 
      quote: "Money and success don't change people; they merely amplify what is already there.",
     author: "Will Smith"
    }, { 
      quote: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma - which is living the results of other people's thinking.",
     author: "Steve Jobs"
    }, { 
      quote: "Not how long, but how well you have lived is the main thing.",
     author: "Seneca"
    }, { 
      quote: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
     author: "Mother Teresa"
    }, { 
      quote: "It is during our darkest moments that we must focus to see the light.",
     author: "Aristotle"
    }
   ]
   
//    windows.onload = startUp;
//    function startUp() {
//     newQuote();
//    }

function newQuote(){
    let quoteNos = Quotes.length;
    let randomNum = Math.floor(Math.random() * quoteNos);
    let randomQuote = Quotes[randomNum];


    document.getElementById("text").innerHTML = randomQuote.quote;
    document.getElementById("author").innerHTML = randomQuote.author;

    let colorNos = colors.length;
    let randomColorNum = Math.floor(Math.random() * colorNos);
    let randomColor = colors[randomColorNum];
    // console.log(randomColor);

    document.getElementById("quote-text").style.color = randomColor;
    document.getElementsByTagName("body")[0].style.backgroundColor = randomColor;
    document.getElementById("quote-author").style.color = randomColor;
    document.getElementById("tweet-quote").style.backgroundColor = randomColor;
    document.getElementById("tumblr-quote").style.backgroundColor = randomColor;
    document.getElementById("new-quote").style.backgroundColor = randomColor;

    // document.getElementsByClassName("footer")[0].style.color = randomColor;

    let quoteInApiFormat = randomQuote.quote.replace("/ /g", "$20");
    let authorInApiFormat = randomQuote.author.replace("/ /g", "$20");

    let twitterLink = "https://twitter.com/intent/tweet?hastags=quotes&text=" + quoteInApiFormat + " - " + authorInApiFormat;

    document.getElementById("tweet-quote").href = twitterLink;

    let tumblrLink = "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=" + authorInApiFormat + "&content=" + quoteInApiFormat + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";

    document.getElementById("tumblr-quote").href = tumblrLink;
}

newQuote();


