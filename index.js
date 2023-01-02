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
        res.status(400).send(error.message)
    }
})

app.listen(3000, ()=> console.log("🚀 Server ready at: http://localhost:3000"))


// async function main(){
//     const allData = await prisma.note.findFirst({
//         where: {
//             name: 'andra',
//         },
//     })
//     console.log(allData)
// }

// main().catch(e => {
//     console.log(e.message)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })