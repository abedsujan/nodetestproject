class Students {
    constructor() {
        this._studentList = [
            { "name": "Hakki", "classId": '08', "email": "adahbour54@gmail.com", "phone": "(263) 972-6043" },
            { "name": "Keerthika devi Alampalli", "classId": '08', "email": "keerthi1822@gmail.com", "phone": "(745) 285-6338" },
            { "name": "Rieko", "classId": '08', "email": "adahbour54@gmail.com", "phone": "(971) 436-6442" },
            { "name": "Sheila Qasemi", "classId": '08', "email": "sheilaqasemi2018@gmail.com", "phone": "(457) 527-9154" },
        ];
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

    isValidStudent(new_student) {
        if (
            new_student.hasOwnProperty("name") &&
            new_student.hasOwnProperty("email") &&
            new_student.hasOwnProperty("classId") &&
            new_student.hasOwnProperty("phone")
        ) {
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
            callback('Successful', errorCallback);
        } catch (error) {
            callback(succcessCallack, error.message);
        }
    }

}



module.exports = Students;