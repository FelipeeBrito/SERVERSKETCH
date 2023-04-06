
import Fastify from 'Fastify';
import cors from '@Fastify/cors';
import { main } from './controllers/userController';

const app = Fastify()
app.register(cors)
app.register(main)


app.listen({
    port:3333,
    host:"0.0.0.0",
}).then(() =>{
    console.log("server running at http://localhost:3333")
} )

app.get('/', () =>{
    return{
        status: "ok",
        code:200,
    }
} )