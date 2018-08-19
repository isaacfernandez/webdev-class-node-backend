module.exports = function (app) {
    app.post('/api/student/:sectionId/section', enrollStudent);
    app.delete('/api/student/:sectionId/section', unenrollStudent);
    app.get('/api/student/section', findSectionsForStudent);


    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enroll.model.server');


    function findSectionsForStudent(req, res) {
        console.log(req.session);
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        enrollmentModel
            .findSectionsForStudent(studentId)
            .then(function (enrollments) {
                res.json(enrollments);
            });
    }

    function enrollStudent(req, res) {
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        };

        var success;
        var section;
        enrollmentModel.findEnrollmentByPair(enrollment)
            .then(function (response) {
                success = response === null;
            })
            .then(function () {
                return sectionModel.findSectionById(sectionId)
                    .then(function (response) {
                        section = response;
                    })
            })
            .then(function () {
                if (section.seats <= 0) {
                    res.send("unavailable");
                } else if (success) {
                    sectionModel
                        .decrementSectionSeats(sectionId)
                        .then(function () {
                            return enrollmentModel
                                .enrollStudentInSection(enrollment)
                        })
                        .then(function (enrollment) {
                            res.json(enrollment);
                        })
                } else {
                    res.send(false);
                }
            })
    }

    function unenrollStudent(req, res) {
        var enrollmentId = req.params.sectionId;
        var enrollment;
        enrollmentModel.findEnrollmentById(enrollmentId)
            .then(function (response) {
                enrollment = response;
            })
            .then(function () {
                sectionModel
                    .incrementSectionSeats(enrollment.section)
                    .then(function () {
                        return enrollmentModel
                            .unenrollStudent(enrollmentId)
                    })
                    .then(function (enrollment) {
                        res.json(enrollment);
                    })

            })
    }
};