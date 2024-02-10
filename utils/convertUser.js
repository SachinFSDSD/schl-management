exports.userResponse = (student) => {
  let usersResult = [];
  student.forEach((user) => {
    usersResult.push({
      firstName: user.firstName,
      lastName: user.lastName,
      class: user.class,
      dateOfBirth: user.dateOfBirth,
      studentId: user.studentId,
      userType: user.userType,
    });
  });

  return usersResult;
};
