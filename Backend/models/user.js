const mongoose  = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    email:{
        type:String,
        required:[true,'email must pe provided']
    },
    password: {
        type: String,
        required: [true,'password must be provided'] 
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
})


const User = mongoose.model('Users',userSchema)

module.exports = User