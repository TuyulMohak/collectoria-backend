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
app.get('/frames', async (req, res)=>{
    try{
        const allframes = await prisma.frames.findMany()
        res.json({
            message: "Success",
            data: allframes
        }) 
    }
    catch(error){
        res.send(error.message)
    } 
})

app.get('/frames/:id', async (req,res) =>{
    const id = req.params.id
    try{
        const calledData = await prisma.frames.findFirst({
            where:{
                id: Number(id)
            },
            include:{
                framePhases: {
                    select:{
                        id: true,
                        name: true
                    }
                },
                frameInputs:{
                    select:{
                        id: true,
                        name: true
                    }
                },
                thing: {
                    include:{
                        times: true
                    }
                }
            }
        })
        // console.log(deleteData)
        if(calledData){
            res.json({
                message: "Success",
                data: calledData
            })
        }
        else{
            res.status(400).send("Data with id:"+id+" not exist")        }
    }
    catch(error){
        res.status(500).send(error.message)
    }
})

app.post('/frames', async (req, res) => {
    const { data }= req.body
    try{
        const inputData = await prisma.frames.create({
            data:{
                name: data.name,
                framePhases:{
                    create: data.framePhases
                },
                frameInputs:{
                    create: data.frameInputs 
                }
            },
            include: {
                framePhases: true,
                frameInputs: true
            }
        })
        res.json({
            message: "success",
            inputData
        })
    }catch(error){
        res.send(error.message)
    }
})

app.delete('/frames/:id', async (req,res) =>{
    const id = req.params.id
    try{
        const deleteData = await prisma.frames.delete({
            where:{
                id: Number(id)
            }
        })
        // console.log(deleteData)
        res.status(200).send("deleted item with id:"+deleteData.id+", name:"+deleteData.name)
    }
    catch(error){
        res.status(500).send(error.message)
    }
})


//all about the thing
//creating thing
app.post('/thing', async (req,res)=>{
    const {data} = req.body
    try{
        const inputData = await prisma.thing.create({
            data:{
                frame: {
                    connect: {
                        id: data.frameId
                    }
                } 
            }
        })
        res.json(inputData)
    }
    catch(error){
        res.status(500).send(error.message)
    }

})

//deleting thing
app.delete('/thing', async (req, res)=>{
    const { data } = req.body
    try{
        const deleteData = await prisma.thing.delete({
            where:{
                id: data.thingId
            }
        })
        // console.log(deleteData)
        res.status(200).send("deleted")
    }
    catch(error){
        res.status(500).send(error.message)
    }
})

app.post('/times', async (req,res)=>{
    const { data } = req.body
    try{
        const isDataExist = await prisma.times.findFirst({
            where:{
                AND:[
                    {
                        thingId:{ 
                            equals:data.thingId
                        }
                    },
                    {
                        framePhaseId:{ 
                            equals:data.framePhaseId
                        }
                    }
                ]
            }
        })

        if(isDataExist){
            res.status(400).send("data already exist")
        }else{
            const inputData = await prisma.times.create({
                data:{
                    timestamp: data.timestamp,
                    thing: {
                        connect: {
                            id: data.thingId
                        }
                    },
                    framePhases: {
                        connect: {
                            id: data.framePhaseId
                        }
                    } 
                }
            })
            res.json(inputData)
        }
    }
    catch(error){
        res.status(500).send(error.message)
    }

})

app.post('/inputs', async (req,res)=>{
    const { data } = req.body

    let inputs = data.inputs.map(obj=>{
        return {
            text: obj.text,
            thingId: obj.thingId,
            frameInputId: obj.frameInputId
        }
    })

    try{
        const inputData = await prisma.inputs.createMany({
            data:inputs
        })
        res.json(inputData)
    }
    catch(error){
        res.status(500).send(error.message)
    }

})


app.listen(3000, ()=> console.log("🚀 Server ready at: http://localhost:3000"))
