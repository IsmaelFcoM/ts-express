import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose'
import Controller from 'interfaces/controller.interface';
import 'dotenv/config';

class App{
    public app: express.Application;

    constructor(controllers: Controller[]){
        this.app = express();

        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares(){
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers){
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        });
    }

    private connectToTheDatabase(){
        mongoose
        .connect(process.env.DB,{useNewUrlParser: true})
        .then(x => {
            console.log(x);
            console.log(`Connected to Mongo! Database name: ${x.connections[0][0]}`);
            
          })
          .catch(err => {
            console.error('Error connecting to mongo', err)
          });
    }

    public listen(){
        this.app.listen(5000,()=>{
            console.log(`App listening on the port ${5000}`);
        });
    }
}

export default App;