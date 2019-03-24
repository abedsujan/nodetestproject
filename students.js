const jsonfile = require('jsonfile')
const file = 'students.json';
let studentJson = jsonfile.readFileSync(file);

class Students {
    constructor() {
        this._studentList = studentJson;
    }
    /**
     * Getlist should provide all students from database
     * 
     */
    getList() {
        return this._studentList;
    }

    getListByClassID(classId) {
        return this._studentList.filter((student => {
            return student.classId.toString() == classId.toString();
        }));

    }
    getStudentDetailByName(name) {

        return this._studentList.filter((student => {
            return student.name.toLowerCase() == name.toLowerCase()
        }));
    }

    getStudentDetailByEmail(email) {

        return this._studentList.filter((student => {
            return student.email.toLowerCase() == email.toLowerCase()
        }));
    }
    isValidStudent(new_student) {
        if (
            new_student.hasOwnProperty("name") &&
            new_student.hasOwnProperty("email") &&
            new_student.hasOwnProperty("classId") &&
            new_student.hasOwnProperty("phone")
        ) {

            if (new_student.name.length <= 2) {
                throw new Error("Name too short");
            }

            const result = this.getStudentDetailByName(new_student.name);

            if (result.length == 0) {
                return;
            } else {
                throw new Error("Student already exits");
            }
        } else {
            throw new Error("Student must have name email classid and phone ");
        }
    }

    /**
     * Method for add a student to the list
     * @param { name: String, phone: number} studentInfo
     */

    addNewStudent(studentInfo, callback) {
        let succcessCallack;
        let errorCallback;
        try {
            this.isValidStudent(studentInfo);
            this._studentList.push(studentInfo);
            this.writeToStudentJson(); // saving list into json file
            callback('Successful', errorCallback);
        } catch (error) {
            callback(succcessCallack, error.message);
        }
    }

    removeStudent(studentName, callback) {

        let succcessCallack;
        let errorCallback;
        try {
            const studentIndex = this._studentList.findIndex(student => student.name.toLowerCase() === studentName.toLowerCase());

            console.log('studentIndex', studentIndex);
            if (studentIndex >= 0) {
                this._studentList.splice(studentIndex, 1);
                
                this.writeToStudentJson();  // saving list into json file
            } else {
                throw new Error("Student not found");
            }

            callback('Successfully Deleted', errorCallback);
        } catch (error) {
            callback(succcessCallack, error.message);
        }
    }

    writeToStudentJson() {
        jsonfile.writeFile(file, this._studentList, function (err) {
            if (err) console.error(err)
        })
    }

}



module.exports = Students;