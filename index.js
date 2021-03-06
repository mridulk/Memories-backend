import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();
//every route inside of postRoute will start from /posts

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.get('/',(req,res)=>{
  res.send('Hello to Memories API')
})
//Database Connection
// const CONNECTION_URL =
//   'mongodb+srv://admin:1234@cluster0.g118i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server Running on port ${5000} ,mongoose connection set up`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
