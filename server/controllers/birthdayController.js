const User = require("../models/User");

const getUpcomingBirthdays = async (req, res) => {
  try {
    const today = new Date();
    const currentYear = today.getFullYear();

    const users = await User.find({}, "empId name email dob");

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    const upcomingBirthdays = users
      .map((user) => {
        const dob = new Date(user.dob);
        const thisYearBirthday = new Date(
          currentYear,
          dob.getMonth(),
          dob.getDate()
        );

        const nextBirthday =
          thisYearBirthday < today
            ? new Date(currentYear + 1, dob.getMonth(), dob.getDate())
            : thisYearBirthday;

        return {
          empId: user.empId,
          name: user.name,
          email: user.email,
          dob: user.dob,
          nextBirthday,
        };
      })
      .sort((a, b) => a.nextBirthday - b.nextBirthday);

    res.status(200).json({
      message: "Upcoming birthdays retrieved successfully",
      data: upcomingBirthdays,
    });
  } catch (err) {
    console.error("Error fetching birthdays:", err.message);
    res.status(500).json({
      message: "Error fetching birthdays",
      error: err.message,
    });
  }
};

module.exports = {
  getUpcomingBirthdays,
};
