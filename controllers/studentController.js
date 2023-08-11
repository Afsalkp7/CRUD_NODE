const Student = require ("../models/studentModel")
const { getPostData}= require ('../utils')
// GET ALL STUDENTS GET/api/students
async function getStudents(req, res) {
    try {
        const students = await Student.findAll()

        res.writeHead(200,{"content-Type":"application/json "})
        res.end(JSON.stringify(students ))
    }
    catch(error) {
        console.log(error);
    }
}

// GET SINGLE STUDENT GET/api/student/:id
async function getStudent(req, res , id) {
    try {
        const student = await Student.findById(id)

        if(!student){
            res.writeHead(404,{"content-Type":"application/json "})
            res.end(JSON.stringify({ message :'student not found'} ))
        }else {
            res.writeHead(200,{"content-Type":"application/json "})
            res.end(JSON.stringify(student))
        }

        res.writeHead(200,{"content-Type":"application/json "})
        res.end(JSON.stringify(student))
    }
    catch(error) {
        console.log(error);
    }

}
// ADD STUDENTS POST/api/students
async function addStudent(req, res) {
    try {
        const body = await getPostData(req)
        const { name,subject,mark } = JSON.parse(body)
        const student = {
            name,
            subject,
            mark
        }
        const newStudent = await Student.create (student)
        res.writeHead(201,{ "content-Type" : "application/json"})
        return res.end(JSON.stringify(newStudent))
        
        
    }
    catch(error) {
        console.log(error);
    }
}

// UPDATE DETAILS OF STUDENTS PUT/api/students/:id
async function updateStudent(req, res , id) {
    try {

        const student = await Student.findById(id)
        if(!student){
            res.writeHead(404,{"content-Type":"application/json "})
            res.end(JSON.stringify({ message :'student not found'} ))
        }else{
            const body = await getPostData(req)
            const { name,subject,mark } = JSON.parse(body)
            const studentData = {
                name:name || student.name,
                subject:subject || student.subject,
                mark:mark || student.mark
            }
            const updStudent = await Student.update(id, studentData)
            res.writeHead(200,{ "content-Type" : "application/json"})
            return res.end(JSON.stringify(updStudent))
        }        
        
    }
    catch(error) {
        console.log(error);
    }
}

// DELETE DETAILS OF STUDENTS DELETE/api/students/:id
async function deleteStudent(req, res , id) {
    try {

        const student = await Student.findById(id)
        if(!student){
            res.writeHead(404,{"content-Type":"application/json "})
            res.end(JSON.stringify({ message :'student not found'} ))
        }else{
            await Student.remove(id)
            res.writeHead(200,{ "content-Type" : "application/json"})
            return res.end(JSON.stringify({ message:`Student ${id} removed` }))
        }        
        
    }
    catch(error) {
        console.log(error);
    }
}




module.exports = {
    getStudents,
    getStudent,
    addStudent,
    updateStudent,
    deleteStudent
}