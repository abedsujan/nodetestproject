var express = require('express');
const Students = require('./students');
const bodyParser = require('body-parser');

const port = 8001;

const hyf_students = new Students();

const app = express();
const router = express.Router();


var logger = function (req, res, next) {
    console.info(`GOT REQUEST! ${req.method} ${req.originalUrl}`)
    next(); // Passing the request to the next handler in the stack.
}

app.use(logger);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('HYF api'))

router.route('/students/:studentName')
    .get((req, res) => {

        const student = hyf_students.getStudentDetailByName(req.params.studentName);
        if (student.length > 0) {
            res.send(student);
        } else {
            res.status(404);
            res.send('Student does not exits!');
        }
    });

router.route('/students')
    .get((req, res) => {
        if (req.query.name) {
            const student = hyf_students.getStudentDetailByName(req.query.name);
            if (student.length > 0) {
                res.send(student);
            } else {
                res.status(404);
                res.send('Student does not exits!');
            }
        }
       else if (req.query.email) {
            const student = hyf_students.getStudentDetailByEmail(req.query.email);
            if (student.length > 0) {
                res.send(student);
            } else {
                res.status(404);
                res.send('Student does not exits!');
            }
        }
        else {
            res.send(hyf_students.getList());
        }
    })
    .post((req, res) => {
        hyf_students.addNewStudent(req.body, (succcessCallack, errorCallback) => {

            if (succcessCallack) {
                res.statusCode = 201;
                res.send('Successful');
            } else if (errorCallback) {
                res.statusCode = 401;
                res.send(errorCallback);
            } else {
                res.statusCode = 400;
                res.send('Invalid request');
            }
        });
    })
    .put((req, res) => {

    })
    .delete((req, res) => {

    });

router.route('/teachers')
    .get((req, res) => {
        res.send('HYF teacher list');
    })
    .post((req, res) => {
        res.send('HYF teacher list');
    })

app.use('/api', router);


app.listen(port, () => console.log(`HYF app listening on port ${port}!`))


// const server = http.createServer((req, res) => {
//     const url = req.url;

//     if (url == '/') {
//         res.send('Welcome to HYF app !!!!')
//     } else if (url == '/getStudentsList' && req.method == 'GET') {
//         const result = hyf_students.getList();´´
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