require("dotenv").config()
const cors = require('cors')
const express = require('express')
const app = express()
const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient()

app.use(express.json())
app.use(
    cors({
        origin: "*"
    })
)

// all about schema
app.get('/schema', async (req, res)=>{
    try{
        const allScheme = await prisma.schema.findMany()
        res.json(allScheme) 
    }
    catch(error){
        res.send(error.message)
    } 
})

app.post('/schema', async (req, res) => {
    const { schemeData }= req.body
    try{
        const allData = await prisma.schema.create({
            data:{
                scheme: schemeData
            }
        })
        console.log(allData)
        res.json(allData)
    }catch(error){
        res.send(error.message)
    }
})

app.delete('/schema', async (req,res) =>{
    const {schemeId} = req.body
    // console.log(schemeId)
    try{
        const deleteData = await prisma.schema.delete({
            where:{
                id: schemeId
            }
        })
        console.log(deleteData)
        res.status(200).send("deleted")
    }
    catch(error){
        res.status(500).send(error.message)
    }
})



//all about the thing

//get all thing on one scheme
app.get('/thing/:id', async (req,res)=>{
    // const {schemeId} = req.body
    const schemeId = req.params.id
    console.log(typeof(Number(schemeId)))
    // console.log(scheme.id)
    try{
        const allThing = await prisma.schema.findFirst({
            where:{
                id:Number(schemeId)
            },
            include:{
                thing: true,
            }
        })
        res.json(allThing)
    }catch(error){
        res.status(500).send(error)
    }
})

//creating thing
app.post('/thing', async(req,res)=>{
    const {schemeId, timestamps} = req.body
    // console.log(schema.id, timestamps)
    try{
        const addPost = await prisma.thing.create({
            data:{
                timestamps: timestamps,
                time: {
                    connect: {
                        id: schemeId
                    }
                } 
            }
        })
        res.json(addPost)
    }
    catch(error){
        res.status(500).send(error.message)
    }

})
//updating thing
app.patch('/thing', async (req,res)=> {
    const {thingId, timestamps} = req.body
    // console.log(schema.id, timestamps)
    try{
        const addPost = await prisma.thing.update({
            where:{
                id: thingId
            },data:{
                timestamps: timestamps,
            }
        })
        res.status(200).send("Successfuly updated")
    }
    catch(error){
        res.status(500).send(error.message)
    }
})
//deleting thing
app.delete('/thing', async (req, res)=>{
    const {thingId} = req.body
    console.log(thingId)
    try{
        const deleteData = await prisma.thing.delete({
            where:{
                id: thingId
            }
        })
        console.log(deleteData)
        res.status(200).send("deleted")
    }
    catch(error){
        res.status(500).send(error.message)
    }
})


app.listen(3000, ()=> console.log("🚀 Server ready at: http://localhost:3000"))
