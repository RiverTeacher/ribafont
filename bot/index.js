const Discord = require('discord.js');
const { createCanvas, registerFont } = require('canvas');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '-';

client.once('ready', () => {
  console.log('Ready!');
});


client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
  
    if (command === 'img') {
        const fontPath = 'Riverfont.ttf';
        const text = args.join(' ');
      
        // 送信前に「生成中...」のメッセージを送信
        const loadingMessage = await message.channel.send('生成しています...。');
      
        // 画像の生成処理
        const image = await generateImage(text, fontPath);
      
        // 生成が完了したら、元のメッセージに画像を添付して送信
        const attachment = new Discord.MessageAttachment(image, 'image.png');
        await message.channel.send({ files: [attachment] });
      
        // 「生成中...」のメッセージを削除
        await loadingMessage.delete();
      }
      
  });
  
  async function generateImage(text, fontPath) {
    const width = 400;
    const height = 200;
  
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
  
    registerFont(fontPath, { family: 'Riverfont' });
    context.font = `50px Riverfont`;
    context.fillStyle = '#FF0000';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
  
    context.fillText(text, width / 2, height / 2);
  
    return canvas.toBuffer();
  }
  

async function generateImage(text, fontPath) {
    if (!text) {
      throw new Error('テキストが指定されていません');
    }
    
    const width = 400;
    const height = 200;
  
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
  
    registerFont(fontPath, { family: 'Riverfont' });
    context.font = `50px Riverfont`;
    context.fillStyle = '#FF0000';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
  
    context.fillText(text, width / 2, height / 2);
  
    return canvas.toBuffer();
  }
  

client.login('YOUR_TOKEN_HERE');
