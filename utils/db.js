import mongoose from 'mongoose';

const connection={};

async function connect(){
    if(connection.isConnected){
        console.log('already connected');
        return ;
    }
    if(mongoose.connections.length>0){
        connection.isConnected=mongoose.connections[0].readyState;
        if(connection.isConnected==1){
            console.log('use previous connection');
            return;
        }
        await mongoose.disconnect();
    }
    const db=await mongoose.connect("mongodb://localhost/next-amazona",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
       
    })
    console.log('new connection');
    connection.isConnected=db.connections[0].readyState;
}
async function disconnect(){
    if(connection.isConnected){
        //means i ma in production mode not in development mode
        if(process.env.NODE_ENV==='production'){
            await mongoose.disconnect();
            connection.isConnected=false;
        }else{
            //to prevent connecting and disconnecting in development mode
            //because its gonna occupy your processor or memory
            console.log('Not Disconnected');
        }

    }
    
}

const db={connect,disconnect};
export default db;