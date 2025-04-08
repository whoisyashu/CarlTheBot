const { Highrise, Events, Emotes} = require('highrise.sdk.dev');
const { Facing } = require("highrise.sdk.dev");
const { Reactions } = require("highrise.sdk.dev");
const token = "c010205f756d275ab41af6e5b3c49458e2363484d23927c472fa762ee41df0f7";
const room = "678ecbb25e69f016e2f22377";
const bot = new Highrise({
    Events: [
        Events.Messages,
        Events.Joins,
        Events.Emotes,
        Events.Leaves,
        Events.Movements,
        Events.Reactions,
        Events.DirectMessages,
     ],
});

bot.on('ready', (session) => {
    console.log("[READY] Bot is ready!".green + ` Session: ${session}`);
      bot.outfit.change("default").catch(e => console.error(e));
    bot.player.teleport(bot.info.user.id, 19.5, 0, 13.5, Facing.FrontLeft)
      .catch(e => console.error("[ERROR] Failed to teleport:", e));
});
bot.on('playerJoin', async(user, position)=>{
    bot.message.send(`Welcome to the Social Hangout Spot, ${user.username}! 🎉 Enjoy your stay!`);
});
bot.on('chatCreate',async(user,message)=>{
    const args = message.toLowerCase().split(" ");
    if(user.id === bot.info.user.id) return;
    else{
        if(args[0]==="!rps"){
            const playerChoice = args[1];
            const botChoice = getRandomChoice();
            const result = getResult(user.username,playerChoice, botChoice);
            bot.message.send(result);
        }
    }
})
function getRandomChoice(){
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}
function getResult(username,playerChoice, botChoice){
    if(playerChoice === botChoice) return "It's a tie!";
    if(
        (playerChoice === "rock" && botChoice === "scissors") ||
        (playerChoice === "paper" && botChoice === "rock") ||
        (playerChoice === "scissors" && botChoice === "paper")
    ){
        return "You win! I choose " + botChoice + ".";
    }else{
        return username+", I win! I choose " + botChoice + ".";
    }
}
const activeLoops = new Map(); // Stores looping emotes per user

  const emotes = {
    kiss: { id: "emote-kiss", duration: 3 },
    laugh: { id: "emote-laughing", duration: 3 },
    sit: { id: "idle-loop-sitfloor", duration: 10 },
    lust: { id: "emote-lust", duration: 5 },
    curse: { id: "emoji-cursing", duration: 2.5 },
    greedy: { id: "emote-greedy", duration: 4.8 },
    flex: { id: "emoji-flex", duration: 3 },
    gag: { id: "emoji-gagging", duration: 6 },
    celebrate: { id: "emoji-celebrate", duration: 4 },
    macarena: { id: "dance-macarena", duration: 12.5 },
    tiktok8: { id: "dance-tiktok8", duration: 11 },
    blackpink: { id: "dance-blackpink", duration: 7 },
    model: { id: "emote-model", duration: 6.3 },
    tiktok2: { id: "dance-tiktok2", duration: 11 },
    pennywise: { id: "dance-pennywise", duration: 1.5 },
    bow: { id: "emote-bow", duration: 3.3 },
    russian: { id: "dance-russian", duration: 10.3 },
    curtsy: { id: "emote-curtsy", duration: 2.8 },
    snowball: { id: "emote-snowball", duration: 6 },
    hot: { id: "emote-hot", duration: 4.8 },
    snowangel: { id: "emote-snowangel", duration: 6.8 },
    charge: { id: "emote-charging", duration: 8.5 },
    cartdance: { id: "dance-shoppingcart", duration: 8 },
    confused: { id: "emote-confused", duration: 9.3 },
    hype: { id: "idle-enthusiastic", duration: 16.5 },
    psychic: { id: "emote-telekinesis", duration: 11 },
    float: { id: "emote-float", duration: 9.3 },
    teleport: { id: "emote-teleporting", duration: 12.5 },
    swordfight: { id: "emote-swordfight", duration: 6 },
    maniac: { id: "emote-maniac", duration: 5.5 },
    energyball: { id: "emote-energyball", duration: 8.3 },
    snake: { id: "emote-snake", duration: 6 },
    sing: { id: "idle_singing", duration: 11 },
    frog: { id: "emote-frog", duration: 15 },
    pose: { id: "emote-superpose", duration: 4.6 },
    cute: { id: "emote-cute", duration: 7.3 },
    tiktok9: { id: "dance-tiktok9", duration: 13 },
    weird: { id: "dance-weird", duration: 22 },
    tiktok10: { id: "dance-tiktok10", duration: 9 },
    pose7: { id: "emote-pose7", duration: 5.3 },
    pose8: { id: "emote-pose8", duration: 4.6 },
    casualdance: { id: "idle-dance-casual", duration: 9.7 },
    pose1: { id: "emote-pose1", duration: 3 },
    pose3: { id: "emote-pose3", duration: 4.7 },
    pose5: { id: "emote-pose5", duration: 5 },
    cutey: { id: "emote-cutey", duration: 3.5 },
    punkguitar: { id: "emote-punkguitar", duration: 10 },
    zombierun: { id: "emote-zombierun", duration: 10 },
    fashionista: { id: "emote-fashionista", duration: 6 },
    gravity: {id: "emote-gravity", duration: 9.8},
    icecream: { id: "dance-icecream", duration: 15 },
    wrongdance: { id: "dance-wrong", duration: 13 },
    uwu: { id: "idle-uwu", duration: 25 },
    tiktok4: { id: "idle-dance-tiktok4", duration: 16 },
    shy: { id: "emote-shy2", duration: 5 },
    anime: { id: "dance-anime", duration: 7.8 },
  };
  function performRandomEmote(userId) {
    // Get all emote names
    const emoteNames = Object.keys(emotes);
  
    // Select a random emote
    const randomIndex = Math.floor(Math.random() * emoteNames.length);
    const emoteName = emoteNames[randomIndex];
    const emote = emotes[emoteName];
  
    // Execute the emote
    bot.player.emote(userId, emote.id)
      .then(() => {
        // Wait for the emote duration before choosing the next one
        setTimeout(() => {
          performRandomEmote(userId); // Recursively call itself
        }, (emote.duration+2) * 1000);
      })
      .catch((error) => {
        console.error(`[ERROR] Emote execution failed: ${emoteName}`, error);
        
        // Retry with a new emote after a short delay (1 sec)
        setTimeout(() => {
          performRandomEmote(userId);
        }, 1000);
      });
  }
  
  // Start performing random emotes when the bot is ready
  bot.on("ready", async () => {
    performRandomEmote();
  });
  const emotePages = Math.ceil(Object.keys(emotes).length / 7);
  
  bot.on("chatCreate", async (user, message) => {
    const args = message.toLowerCase().split(" "); // Convert input to lowercase
    const command = args[0];
    const emoteName = args.slice(1).join(" ");
    if (command === "!assistemote") {
      const assistMessage = `
        List of Commands for User Fun:
        1.!emote <emote_name>
        2.!loop <emote_name>
        3.!stop
        4.!emotelist <page_number>
        Use these commands to have fun with emotes! 🎉
      `;
  
      bot.message.send(assistMessage).catch(e => console.error(e));
    }
    else if (command === "!emotelist") {
      const page = args[1] ? parseInt(args[1]) : 1;
      
      if (isNaN(page) || page < 1 || page > emotePages) {
        bot.message.send(`Usage: !emotelist <page_number>. Valid page numbers are from 1 to ${emotePages}.`);
        return;
      }
  
      const emoteKeys = Object.keys(emotes);
      const emotesForPage = emoteKeys.slice((page - 1) * 7, page * 7);
      
      let emoteListMessage = `Emote list (Page ${page}/${emotePages}):\n`;
      emotesForPage.forEach(emote => {
        emoteListMessage += `\`${emote}\` - ${emotes[emote].id}\n`;
      });
  
      bot.message.send(emoteListMessage).catch(e => console.error(e));
    }
    else if (command === "!emote") {
      if (!emotes[emoteName]) {
        bot.message.send(`Invalid emote name: ${emoteName}`);
        return;
      }
  
      bot.player.emote(user.id, emotes[emoteName].id)
        .catch(e => console.error(`[ERROR] Failed to perform emote:`, e));
  
    } else if (command === "!loop") {
      if (!emotes[emoteName]) {
        bot.message.send(`Invalid emote name: ${emoteName}`);
        return;
      }
  
      // Stop previous loop if already active for the user
      if (activeLoops.has(user.id)) {
        clearInterval(activeLoops.get(user.id));
      }
  
      // Start looping the emote
      const loopInterval = setInterval(() => {
        bot.player.emote(user.id, emotes[emoteName].id)
          .catch(e => console.error(`[ERROR] Failed to perform emote:`, e));
      }, emotes[emoteName].duration * 1000);
  
      activeLoops.set(user.id, loopInterval);
      bot.message.send(`Looping ${emoteName} for ${user.username}.`);
  
    } else if (command === "!stop") {
      if (activeLoops.has(user.id)) {
        clearInterval(activeLoops.get(user.id));
        activeLoops.delete(user.id);
        bot.message.send(`Stopped looping emotes for ${user.username}.`);
      } else {
        bot.message.send(`No active emote loop to stop.`);
      }
    }
  });

  bot.on("chatCreate", async (user, message) => {
    const args = message.split(" ");
  
    if (args[0] === "!summon" && args[1].startsWith("@")) {
      const targetUsername = args[1].substring(1); // Remove '@' from username
  
      try {
        // Get target user ID
        const targetId = await bot.room.players.id(targetUsername);
        if(targetId === bot.info.user.id) return;
        if (!targetId) {
          return bot.whisper.send(user.id, "User not found.");
        }
  
        // Get the position of the command user
        const userPosition = await bot.room.players.position(user.id);
        if (!userPosition) {
          return bot.whisper.send(user.id, "Could not retrieve your position.");
        }
  
        // Teleport the target user to the command user's location
        await bot.player.teleport(targetId, userPosition.x, userPosition.y, userPosition.z, userPosition.facing);
        bot.whisper.send(user.id, `Successfully summoned ${targetUsername}.`);
        bot.whisper.send(targetId, `You have been summoned by ${user.username}.`);
      } catch (e) {
        console.error(e);
        bot.whisper.send(user.id, "An error occurred while summoning.");
      }
    }
  });
  bot.on('chatCreate', async(user,message)=>{
    if(user.id === bot.info.user.id) return;
    if(message.startsWith("~")){
        const command = message.replace("~", "");
        const response = await getAIResponse(command);
        bot.message.send(response)
          .catch(e => console.error("[ERROR] Failed to send message:", e));
    }
});
  async function getAIResponse(userMessage) {
    const apiKey = "AIzaSyDnsSdx0TF0ba7TPHSq0kCe8U0uL9JhrbY";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `Reply in 1-2 lines only and try to be friend of user and talk like a human: ${userMessage}` }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 60
        }
      })
    });
  
    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "No response from Gemini.";
  }
  
  // Example usage:
  getAIResponse("What is the use of JavaScript?")
    .then(reply => console.log("AI Reply:", reply))
    .catch(err => console.error("Error:", err));


bot.on("error",(message)=>{
    console.log(message);
  });

 bot.login(token, room);