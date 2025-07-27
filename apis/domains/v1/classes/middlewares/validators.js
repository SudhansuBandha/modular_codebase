class Validator {
  validateCreateClass(req, res, next) {
    //validate request body
    const errors = [];
    console.log("Validating class creation:", req.body);
    const { name, startDate, endDate, startTime, duration, capacity, club } =
      req.body;

    // Name
    if (!name || typeof name !== "string" || name.trim() === "") {
      errors.push("Name is required and must be a non-empty string.");
    }

    // Dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!startDate || isNaN(start.getTime())) {
      errors.push("Valid startDate is required.");
    }

    if (!endDate || isNaN(end.getTime())) {
      errors.push("Valid endDate is required.");
    }

    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end < start) {
      errors.push("endDate must be after startDate.");
    }

    // Time
    if (!startTime || !/^\d{2}:\d{2}$/.test(startTime)) {
      errors.push("startTime must be in HH:mm format.");
    } else {
      const [hours, minutes] = startTime.split(":").map(Number);
      if (hours > 23 || minutes > 59) {
        errors.push("startTime must be a valid time.");
      }
    }

    // Duration
    if (
      duration === undefined ||
      typeof duration !== "number" ||
      duration <= 0
    ) {
      errors.push("duration must be a positive number.");
    }

    // Capacity
    if (
      capacity === undefined ||
      typeof capacity !== "number" ||
      capacity <= 0
    ) {
      errors.push("capacity must be a positive number.");
    }

    // Club
    if (!club || typeof club !== "string" || club.trim() === "") {
      errors.push("club is required and must be a valid ID string.");
    }

    // Final check
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  }
}

module.exports = new Validator();
