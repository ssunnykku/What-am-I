import axios from 'axios';

const DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1150665098600390708/LGAQmWmvCPc4AZt08fuSaCEmHD7GI3Lbl_fRbqXNPb2DQuJUwiRhXKIid5j1bvEYHLZI';

export default function sendErrorToDiscord(errorMessage) {
  const payload = {
    content: `🔥 에러 발생: ${errorMessage}`,
  };

  axios
    .post(DISCORD_WEBHOOK_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.status !== 200) {
        console.error('Failed to send error to Discord');
      }
    })
    .catch((error) => {
      console.error('Failed to send error to Discord:', error);
    });
}

try {
  throw new Error('Some error occurred');
} catch (error) {
  console.error(error);
  sendErrorToDiscord(error.message);
}
