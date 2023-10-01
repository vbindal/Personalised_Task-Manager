const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path');
const tasks = require('./routes/task')
const users = require('./routes/user')
const connectdB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const port = process.env.PORT || 3000
const corsOptions = {
  origin:['http://localhost:3001','http://localhost:3000',
  'https://personalised-task-manager-oyby.vercel.app'], 
  methods : ["POST","GET"],
  credentials: true, 
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));


//routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'front-end','src','index.js'));
// });

// Optionally, if you want to serve the Register.js file separately:
app.get('/', (req, res) => {
  res.json({message:'welcome to the server'})
});




app.use('/api/v1/users',users)
app.use('/api/v1/tasks',tasks)
// app.use(notFound)
// app.use(errorHandlerMiddleware)

/**
 * app.get('/api/v1/tasks') -get all the tasks
 * app.post('/api/v1/tasks') -create a new task
 * app.get('/api/v1/tasks/:id') -get single task
 * app.patch('/api/v1/tasks/:id') -update task
 * app.delete('/api/v1/tasks/:id') -delete task
 */

const start = async()=>{
  try{
    await connectdB(`${process.env.MONGO_URI}`)
    app.listen(port, () => {
      console.log(`server listening at port number ${port}`)
    });
  }catch(err){
    console.log(err)
  }
}
start()
