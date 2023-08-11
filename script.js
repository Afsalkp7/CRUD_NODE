const http = require("http");
const {
    getStudents ,
    getStudent ,
    addStudent ,
    updateStudent ,
    deleteStudent } = require ("./controllers/studentController")

const server =http.createServer((req,res)=>{
    if (req.url === "/api/students" && req.method === "GET") {
        getStudents(req,res)
        
    }else if(req.url.match(/\/api\/students\/([0-9]+)/ ) && req.method === "GET"){
        const id = req.url.split("/")[3]
        getStudent(req,res,id)
    }else if(req.url === "/api/students" && req.method === "POST"){
        addStudent(req,res)
    }else if (req.url.match(/\/api\/students\/([0-9]+)/ ) && req.method === "PUT"){
        const id = req.url.split('/')[3]
        updateStudent(req,res,id)
    }else if (req.url.match(/\/api\/students\/([0-9]+)/ ) && req.method === "DELETE"){
        const id = req.url.split('/')[3]
        deleteStudent(req,res,id)
    }
     else {
        res.writeHead(404,{"content-Type":"application/JSON"})
        res.end(JSON.stringify({Message : "Router Not Found"}))
    }

})

const PORT = process.env.PORT || 5000

server.listen(PORT , ()=>console.log(`server is running on ${PORT}`));