var express = require('express');
const Students = require('./students');

const router = express.Router();
const hyf_students = new Students();



router.use('/students/:studentName', (req, res, next) => {
    const student = hyf_students.getStudentDetailByName(req.params.studentName);
    if (student.length > 0) {
        next();
    } else {
        res.status(404);
        res.send('Student does not exits!');
    }
});


router.route('/students/:studentName')
    .get((req, res) => {
        const student = hyf_students.getStudentDetailByName(req.params.studentName);
        res.send(student);
    })
    .delete((req, res) => {

        hyf_students.removeStudent(req.params.studentName, (succcessCallack, errorCallback) => {

            if (succcessCallack) {
                res.statusCode = 200;
                res.send(succcessCallack);
            } else {
                res.statusCode = 400;
                res.send('Something went wrong');
            }
        });

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
        } else if (req.query.email) {
            const student = hyf_students.getStudentDetailByEmail(req.query.email);
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

    });

module.exports = router;