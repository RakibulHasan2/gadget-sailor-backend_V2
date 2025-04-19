import dotenv from 'dotenv';
import path from 'path';


dotenv.config({path: path.join(process.cwd(),'.env')});

export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    default_USER_pass: process.env.DEFAULT_USER_PASS,
    default_status: process.env.DEFAULT_STATUS,
    access_token: process.env.ACCESS_TOKEN
}