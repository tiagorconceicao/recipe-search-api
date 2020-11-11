import 'dotenv/config';
import app from './app';

const serverPort = parseInt(process.env.SERVER_PORT || '3333', 10);

app.listen(serverPort, () => {
  console.log('✅️ Server started');
});
