require("dotenv").config()
const cors = require('cors')
const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.get('/note', async (req, res) => {
    const allData = await prisma.note.findFirst({
        where:{
            name: 'andra'
        }, select:{
            name: true,
            notebody: true
        }
    })
    // console.log(allData)
    res.json(allData)
})

app.patch('/note', async (req, res) => {
    const {notebody, code} = req.body
    const checkCode = await prisma.note.findFirst({
        where: {
            code: code
        }
    })

    if (checkCode !== null) {
        const changedNote = await prisma.note.update({
            where:{
                name: 'andra'
            }, 
            data:{ 
                notebody: notebody
            }
        })
        res.status(200).send("updated sucessfully")
    }  
    else{
        res.status(404).send("wrong code")
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