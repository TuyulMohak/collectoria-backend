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
        res.json(allframes) 
    }
    catch(error){
        res.send(error.message)
    } 
})

app.get('/frame/:id', async (req,res) =>{
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
                    select:{
                        id:true,
                        times: {
                            select:{
                                id:true,
                                framePhaseId: true,
                                timestamp:true
                            }
                        },
                        inputs: {
                            select:{
                                id: true,
                                frameInputId: true,
                                text: true
                            }
                        }
                    }
                }
            }
        })
        // console.log(deleteData)
        if(calledData){
            res.json(calledData)
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
        res.json(inputData)
    }catch(error){
        res.send(error.message)
    }
})

app.delete('/frame/:id', async (req,res) =>{
    const id = req.params.id
    try {
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
                },
                inputs:{
                    createMany:{
                        data: data.frameInputs
                    }
                },
                times:{
                    createMany:{
                        data:data.framePhases
                    }
                }
            },include:{
                inputs:true,
                times:true
            }
        })
        res.json(inputData)
    }
    catch(error){
        res.status(500).send(error.message)
    }

})

// manythings currently unavailable, due to confusion hehehe
app.post('/manythings', async (req,res)=>{
    const {data} = req.body
    const arrThings = []
    for (let i=0;i<data.count;i++){
        arrThings.push(data.thing)
    }
    try{
        const resThings = []
        
        for(const ting of arrThings){
            const createdItem = await prisma.thing.create({
                data:{
                    frame: {
                        connect: {
                            id: Number(ting.frameId)
                        }
                    },
                    inputs:{
                        createMany:{
                            data: ting.frameInputs
                        }
                    },
                    times:{
                        createMany:{
                            data:ting.framePhases
                        }
                    }
                },include:{
                    inputs:true,
                    times:true
                }
            })
            resThings.push(createdItem)          
        }
        
        res.json(resThings)
    }
    catch(error){
        res.status(500).send(error.message)
    }

})

//deleting thing
app.delete('/thing/:id', async (req, res)=>{
    const id = req.params.id
    try{
        const deleteData = await prisma.thing.delete({
            where:{
                id: Number(id)
            }
        })
        // console.log(deleteData)
        res.status(200).json(deleteData)
    }
    catch(error){
        res.status(500).send(error.message)
    }
})

app.patch('/times', async (req,res)=>{
    const { data} = req.body
    try{
        const result = await prisma.times.update({
            where:{
                id: Number(data.id)
            },
            data:{
                timestamp: data.timestamp
            }
        })
        res.json(result)
    }
    catch(error){
        res.status(500).send(error.message)
    }

})

app.patch('/inputs', async (req,res)=>{
    const { data } = req.body

    try{
        const result = await prisma.inputs.update({
            where:{
                id: Number(data.id)
            },
            data:{
                text: data.text
            }
        })
        
        res.json(result)
    }
    catch(error){
        res.status(500).send(error.message)
    }

})

// app.patch('/inputs', async (req,res)=>{
//     const { data } = req.body

//     try{
//         result = []
//         for(let input of data.inputs){
//             await prisma.inputs.update({
//                 where:{
//                     id: Number(input.id)
//                 },
//                 data:{
//                     text: input.text
//                 }
//             }).then(dat => {
//                 result.push(dat)
//             })
//         }
//         res.json(result)
//     }
//     catch(error){
//         res.status(500).send(error.message)
//     }

// })

app.listen(3000, ()=> console.log("🚀 Server ready at: http://localhost:3000"))
