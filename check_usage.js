require('dotenv').config();
const axios = require('axios');

async function checkUsage() {
    try {
        const response = await axios.get('https://openrouter.ai/api/v1/key', {
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
            }
        });
        
        const data = response.data.data;
        console.log('=== OpenRouter API Usage ===');
        console.log(`Label: ${data.label}`);
        console.log(`Is Free Tier: ${data.is_free_tier}`);
        console.log(`Usage (all time): ${data.usage} credits`);
        console.log(`Usage Today: ${data.usage_daily} credits`);
        console.log(`Usage This Week: ${data.usage_weekly} credits`);
        console.log(`Usage This Month: ${data.usage_monthly} credits`);
        
        if (data.limit !== null) {
            console.log(`Credit Limit: ${data.limit} credits`);
            console.log(`Remaining: ${data.limit_remaining} credits`);
        } else {
            console.log('Credit Limit: Unlimited');
        }
        
        if (data.limit_reset) {
            console.log(`Limit Reset: ${data.limit_reset}`);
        }
        
    } catch (error) {
        console.error('Error checking usage:', error.response?.data || error.message);
    }
}

checkUsage();
