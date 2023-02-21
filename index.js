const app = require('./src/server/index');

const port = process.env.PORT || 3000

app.listen(port, () => {
  
  console.log(`Webhook server live!`);
})
