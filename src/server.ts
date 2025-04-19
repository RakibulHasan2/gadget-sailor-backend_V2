import mongoose from 'mongoose';
import config from './config';
import app from './app';

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("database is connected");
        app.listen(parseInt(`${config.port}`), () => {
            console.log(`gadget sailor listening on port ${config.port}`);
          })

    } catch (err) {
        console.log("fail to connect",err);
    }
}
main();

export default app;