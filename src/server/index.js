const express = require('express');
const fetch = require('node-fetch');
const { registerFont } = require('canvas');
const { Canvas, resolveImage } = require('canvas-constructor');
const formatNumbers = require('../functions/formatNumbers');
const path = require("path");
const app = express();

app.use(function (req, res, next) {
  res.set('x-powered-by', 'Infinity Development')

  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

app.use(express.static('public'))



app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the IBL Widget API',
    error: false,
  })
});

const themes = {
	"violet": "#8b5cec",
	"blue": "#3b82f6",
	"rose": "#ef4444",
	"amber": "#f59e0b",
	"emerald": "#10b981",
	"summer": "#e35335",
	"default": "#472782"
}

const bgs = {
	"dark": "#000000",
	"light": "#16151d",
	"default": "#271B41"
}

app.get('/bot/:botID', async (req, res) => {
  let theme = themes[req.query.accent] || themes["default"];
  let bg = bgs[req.query.theme] || bgs["default"];

  let spider = await fetch(`https://spider.infinitybots.gg/bots/${req.params.botID}`, {
    method: 'GET'
  });
  
  if(!spider.ok) {
    let json = await spider.json()
    res.status(spider.status).json(json)
    return
  }

  let bot = await spider.json();

  try {
    function fontFile(dir, name) {
      return path.join(__dirname, dir, name)
    }

    registerFont(fontFile('../../public/fonts/montserrat/static/', 'Montserrat-Bold.ttf'), { 
      family: 'montserrat', 
      weight: 'bold'
    })

    let bot_avatar = decodeURIComponent(bot.user.avatar)
    .replace('.png', '.png?size=512')
    .replace('.webp', '.png?size=512');
    
    let avatar = await resolveImage(bot_avatar);
    
    let icon = await resolveImage('https://cdn.infinitybots.xyz/images/core/InfinityNewTrans.png');
    
    let image;

    if (req.query.size == 'large') {
      image = new Canvas(400, 240)
        .setColor(bg)
        .printRoundedRectangle(0, 0, 400, 240, 10)
        .setTextAlign('left')
        .setTextFont('28px montserrat')
        .setColor(theme)
        .printRoundedRectangle(0, 215, 400, 25, 5)
        .printRoundedRectangle(0, 0, 400, 40, 10)
        .printRoundedRectangle(10, 180, 185, 25, 10)
        .printRoundedRectangle(207, 180, 185, 25, 10)
        .printRoundedRectangle(10, 150, 185, 25, 10)
        .printRoundedRectangle(207, 150, 185, 25, 10)
        .printRoundedRectangle(10, 120, 185, 25, 10)
        .printRoundedRectangle(207, 120, 185, 25, 10)
        .setColor('#fff')
        .setTextSize(12)
        .printText('Infinity Bot List', 30, 230)
        .printText('infinitybots.gg', 300, 230)
        .setTextSize(15)
        .printText(
          `${bot.servers === 0 ? 'N/A' : formatNumbers(bot.servers)} SERVERS`,
          20,
          197,
        )
        .printText(
          `${bot.shards === 0 ? 'N/A' : formatNumbers(bot.shards)} SHARDS`,
          217,
          197,
        )
        .printText(`${bot.user.status.toUpperCase()}`, 20, 167)
        .printText(
          `${bot.votes === 0 ? 0 : formatNumbers(bot.votes)} VOTES`,
          217,
          167,
        )
        .printText(`${bot.owner.username.length > 12 ? bot.owner.username.slice(0, 12) + '...' : bot.owner.username}#${bot.owner.discriminator}`,20,137,)
        .printText(`${bot.library}`, 217, 137)
        .setTextSize(17)
        .printWrappedText(bot.short.length > 75 ? bot.short.slice(0, 75) + '...' : bot.short, 20, 60, 350, 15)
        .setTextSize(20)
        .printText(bot.user.username.length > 25 ? bot.user.username.slice(0, 25) + '...' : bot.user.username,40,25,)
        .printCircularImage(avatar, 20, 20, 15, 10, 5, true)
        .printCircularImage(icon, 20, 227, 10, 10, 5, true)
        .setTextFont('10px montserrat').printText(bot.type.toUpperCase() + " BOT", 310, 20);

    } else if (req.query.size == 'small') {
      image = new Canvas(400, 140)
        .setColor(bg)
        .printRoundedRectangle(0, 0, 400, 150, 10)
        .setTextAlign('left')
        .setTextFont('28px montserrat')
        .setColor(theme)
        .printRoundedRectangle(0, 115, 400, 25, 5)
        .printRoundedRectangle(0, 0, 400, 40, 10)
        .printRoundedRectangle(10, 50, 185, 25, 10)
        .printRoundedRectangle(207, 50, 185, 25, 10)
        .printRoundedRectangle(10, 80, 185, 25, 10)
        .printRoundedRectangle(207, 80, 185, 25, 10)
        .setColor('#fff')
        .setTextSize(12)
        .printText('Infinity Bot List', 30, 130)
        .printText('infinitybots.gg', 300, 130)
        .setTextSize(15)
        .printText(
          `${bot.servers === 0 ? 'N/A' : formatNumbers(bot.servers)} SERVERS`,
          20,
          67,
        )
        .printText(
          `${bot.shards === 0 ? 'N/A' : formatNumbers(bot.shards)} SHARDS`,
          217,
          67,
        )
        .printText(`${bot.user.status.toUpperCase()}`, 20, 97)
        .printText(
          `${bot.votes === 0 ? 0 : formatNumbers(bot.votes)} VOTES`,
          217,
          97,
        )
        .setTextSize(20)
        .printText(bot.user.username.length > 25 ? bot.user.username.slice(0, 25) + '...' : bot.user.username,40,25,)
        .printCircularImage(avatar, 20, 20, 15, 10, 5, true)
        .printCircularImage(icon, 20, 127, 10, 10, 5, true)
        .setTextFont('10px montserrat').printText(bot.type.toUpperCase() + " BOT", 310, 20);

    } else {
      image = new Canvas(400, 180)
        .setColor(bg)
        .printRoundedRectangle(0, 0, 400, 180, 10)
        .setTextAlign('left')
        .setTextFont('28px montserrat')
        .setColor(theme)
        .printRoundedRectangle(0, 155, 400, 25, 5)
        .printRoundedRectangle(0, 0, 400, 40, 10)
        .printRoundedRectangle(10, 120, 185, 25, 10)
        .printRoundedRectangle(207, 120, 185, 25, 10)
        .printRoundedRectangle(10, 90, 185, 25, 10)
        .printRoundedRectangle(207, 90, 185, 25, 10)
        .setColor('#fff')
        .setTextSize(12)
        .printText('Infinity Bot List', 30, 170)
        .printText('infinitybots.gg', 300, 170)
        .setTextSize(15)
        .printText(
          `${bot.servers === 0 ? 'N/A' : formatNumbers(bot.servers)} SERVERS`,
          20,
          137,
        )
        .printText(
          `${bot.shards === 0 ? 'N/A' : formatNumbers(bot.shards)} SHARDS`,
          217,
          137,
        )
        .printText(`${bot.user.status.toUpperCase()}`, 20, 107)
        .printText(
          `${bot.votes === 0 ? 0 : formatNumbers(bot.votes)} VOTES`,
          217,
          107,
        )
        .setTextSize(17)
        .printWrappedText(
          bot.short.length > 42 ? bot.short.slice(0, 42) + '...' : bot.short,
          20,
          60,
          350,
          15,
        )
        .setTextSize(20)
        .printText(bot.user.username.length > 25 ? bot.user.username.slice(0, 25) + '...' : bot.user.username,40,25,)
        .printCircularImage(avatar, 20, 20, 15, 10, 5, true)
        .printCircularImage(icon, 20, 167, 10, 10, 5, true)
        .setTextFont('10px montserrat').printText(bot.type.toUpperCase() + " BOT", 310, 20);
    }
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(await image.toBuffer(), 'binary');

  } catch (err) {
    return res.status(500).json({
      message: 'Hang on chief! Something done broke',
      error_msg: `${err.message}`,
      error: true,
      fatal: false,
      status: 500
    })
  }
})

app.use((req, res, next) => {
  res.status(404).json({
    message: 'You seem lost, you may need to reference our widget docs here: https://docs.botlist.site/resources/widgets',
    error: true,
    fatal: false,
    status: 404
  })
});


module.exports = app
