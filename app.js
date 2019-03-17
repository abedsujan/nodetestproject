var express = require('express');
const Students = require('./students');

const hyf_students = new Students();

const app = express();
const port = 8001;

app.get('/', (req, res) => res.send('HYF api'))

app.get('/students', (req, res) => {

    if (req.query.name) {
        const student = hyf_students.getStudentDetailByName(req.query.name);

        if (student.length > 0) {
            res.send(student);
        } else {
            res.status(404);
            res.send('Student does not exits!');
        }

    } else {
        res.send(hyf_students.getList());
    }

})


app.listen(port, () => console.log(`HYF app listening on port ${port}!`))


// const server = http.createServer((req, res) => {
//     const url = req.url;

//     if (url == '/') {
//         res.send('Welcome to HYF app !!!!')
//     } else if (url == '/getStudentsList' && req.method == 'GET') {
//         const result = hyf_students.getList();
//         if (result) {
//             res.statusCode = 200;
//             res.end(JSON.stringify(result));
//         } else {
//             res.statusCode = 404;
//             res.end("No result found!");
//         }
//     } else if (url == '/getStudentDetailsByName' && req.method == 'GET') {
//         const student = hyf_students.getStudentDetailByName('Abed');
//         if (student) {
//             res.statusCode = 200;
//             res.end(JSON.stringify(student));
//         }
//     } else if (url == '/getStudentsListByClass' && req.method === 'GET') {
//         const getStdByClassName = hyf_students.getStudentsListByClass('08');
//         if (getStdByClassName) {
//             res.statusCode = 200;
//             res.end("list of students from class" + JSON.stringify(getStdByClassName));
//         } else {
//             res.statusCode = 404;
//             res.end("not found!!");
//         }
//     } else if (url == '/addNewStudent' && req.method == 'POST') {
//         const addNewStd = hyf_students.addStudent({
//             "name": "Abed",
//             "classId": "09",
//             "email": "abed@example.com",
//             "phone": "2343243242"
//         });

//         if (addNewStd) {
//             res.statusCode = 201;
//             res.end("Student added successfully")

//         } else {
//             res.statusCode = 404;
//             res.end('Failed')
//         }
//     } else if (url == '/deleteStudent' && req.method == 'DELETE') {
//         const deleteStd = hyf_students.deleteStudent('Abed');
//         if (deleteStd) {
//             res.statusCode = 201;
//             res.end("Student deleted successfully")

//         } else {
//             res.statusCode = 404;
//             res.end('Failed')
//         }
//     }

// })

// server.listen(8001, () => {
//     console.log('HYF app is running (8001)...');
// })