var mongoose =require('mongoose')

mongoose.connect('mongodb+srv://saraungbabu:saraung@cluster0.rt5a0yo.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("connected to db")
})
.catch((err)=>{
    console.log(err)
})