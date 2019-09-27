import * as express from 'express';
import Post from './posts.interface';
import Controller from '../interfaces/controller.interface'
import postModel from './posts.model'

class PostController implements Controller {
    public path = '/posts';
    public router = express.Router();
    private post = postModel;

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(this.path, this.getAllPosts);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router.put(`${this.path}/:id`, this.modifyPost);
        this.router.delete(`${this.path}/:id`, this.deletePost);
        this.router.post(this.path,this.createAPost);
    }

    private getAllPosts = (request: express.Request, response: express.Response) => {
        this.post.find()
        .then(posts =>{
            response.send(posts);
        });
    }

    private getPostById = (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        this.post.findById(id)
        .then(post => {
            res.send(post);
        });
    }

    private modifyPost = (req: express .Request, res: express.Response) => {
        const id = req.params.id;
        const postData = req.body;
        this.post.findByIdAndUpdate(id,postData,{new: true})
        .then(post => {
            res.send(post);
        });
    }

    private deletePost = (req: express.Request,res: express.Response ) => {
        const id = req.params.id
        this.post.findByIdAndDelete(id)
        .then(successResponse => {
            if(successResponse) {
                res.send(200);
            } else{
                res.send(404);
            }
        });
    }

    createAPost = (req: express.Request, res: express.Response) => {
        const postData: Post = req.body;
        const createdPost = new this.post(postData);
        createdPost.save()
        .then(savedPost=>{
            res.send(savedPost);
        })
        .catch(err => console.log(err));
    }
}

export default PostController;