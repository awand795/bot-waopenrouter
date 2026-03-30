require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Create .wwebjs_auth directory if it doesn't exist
const authDir = path.join(__dirname, '.wwebjs_auth');
if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
}

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('QR Code received, please scan:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
});

client.on('authenticated', () => {
    console.log('Authenticated successfully!');
});

client.on('auth_failure', msg => {
    console.error('Authentication failure:', msg);
});

async function getOpenRouterResponse(message) {
    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: process.env.OPENROUTER_MODEL,
            messages: [
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 1000,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://github.com',
                'X-Title': 'WhatsApp Bot'
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling OpenRouter API:', error.response?.data || error.message);
        throw error;
    }
}

client.on('message', async (message) => {
    try {
        if (message.from === 'status@broadcast') return;
        if (message.hasMedia) return;

        const userMessage = message.body;
        console.log(`Received message from ${message.from}: ${userMessage}`);

        try {
            await message.react('⏳');
        } catch (reactionError) {
            console.log('Could not send reaction (normal for groups):', reactionError.message);
        }

        const botResponse = await getOpenRouterResponse(userMessage);
        
        await message.reply(botResponse);
        
        console.log(`Sent response to ${message.from}: ${botResponse.substring(0, 100)}...`);
        
    } catch (error) {
        console.error('Error processing message:', error);
        await message.reply('Maaf, terjadi kesalahan. Silakan coba lagi nanti.');
    }
});

client.on('message_create', async (message) => {
    if (message.fromMe) return;
    
    try {
        const userMessage = message.body;
        console.log(`Processing message from ${message.from}: ${userMessage}`);
    } catch (error) {
        console.error('Error in message_create:', error);
    }
});

client.initialize().catch(err => {
    console.error('Failed to initialize WhatsApp client:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Start keep alive server
require('./keep_alive');
