const Patient = require("../models/patient.model");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Add this if you're using a .env file

const LOG_FILE_PATH = path.join(__dirname, "log.txt"); // Path to the local log file

const controller = {
  add: async (req, res) => {
    try {
      const { name, roomno } = req.body;
      const ch = name.toLowerCase();
      const check = await Patient.findOne({ name: ch });

      if (check)
        return res.json({
          data: {
            success: false,
            message: "patient already registered",
          },
        });

      const patient = new Patient({
        name: ch,
        roomno,
      });

      const data = await patient.save();
      return res.json({
        data: {
          success: true,
          message: "Successfully added patient",
          data: data,
        },
      });
    } catch (error) {
      return res.status(500).json({
        data: {
          success: false,
          message: error?.message,
        },
      });
    }
  },

  del: async (req, res) => {
    try {
      const { name } = req.body;
      const ch = name.toLowerCase();

      // Attempt to delete from Patient collection
      const patient = await Patient.findOneAndDelete({ name: ch });

      // Attempt to delete from User collection (if applicable)
      const user = await User.findOneAndDelete({ name: ch });

      // Send a success message regardless of where the deletion occurred
      return res.json({
        data: {
          success: true,
          message: "Patient deleted successfully from one or both databases",
        },
      });
    } catch (error) {
      console.error("Error deleting patient:", error);
      return res.status(500).json({
        data: {
          success: false,
          message: error.message,
        },
      });
    }
  },

  spatient: async (req, res) => {
    const { name } = req.body;
    const ch = name.toLowerCase();
    const patient = await Patient.findOne({ name: ch });
    if (!patient) {
      return res.json({
        data: { success: false, message: "No patient found" },
      });
    }
    return res.json({
      data: { success: true, message: "patient found", data: patient },
    });
  },

  streatment: async (req, res) => {
    try {
      const { treatments } = req.body;
      const treat = treatments.split(",");

      const patients = await Patient.find({
        $or: [
          { morning: { $in: treat } },
          { evening: { $in: treat } },
          { night: { $in: treat } },
        ],
      });

      const patientsWithMatchedTreatments = patients.map((patient) => {
        const matchedTreatments = {
          morning: patient.morning.filter((t) => treat.includes(t)),
          evening: patient.evening.filter((t) => treat.includes(t)),
          night: patient.night.filter((t) => treat.includes(t)),
        };
        return {
          roomno: patient.roomno,
          ...patient.toObject(),
          matchedTreatments,
        };
      });

      res.status(200).json({
        data: {
          success: true,
          data: patientsWithMatchedTreatments,
        },
      });
    } catch (err) {
      res.status(500).json({
        data: {
          success: false,
          message: "An error occurred while retrieving treatments.",
        },
      });
    }
  },

  addtreatment: async (req, res) => {
    try {
      const { name, time, treatments } = req.body;
      const ch = name.toLowerCase();
      const tre = treatments.split(", ");
      const patient = await Patient.findOne({ name: ch });

      if (!patient) return res.json({ success: false });

      const previousTreatments = patient[time] || [];
      const roomno = patient.roomno || "Unknown"; // Assuming 'roomno' is a field in the patient schema

      await Patient.updateOne({ name: ch }, { $set: { [time]: tre } });

      const updatedPatient = await Patient.findOne({ name: ch });

      const timestamp = new Date().toISOString();
      const logData = `Timestamp: ${timestamp}\nPatient Name: ${name}\nRoom Number: ${roomno}\nTime Frame: ${time}\nPrevious Treatments: ${previousTreatments.join(
        ", "
      )}\nUpdated Treatments: ${tre.join(", ")}\n\n`;

      fs.appendFileSync(LOG_FILE_PATH, logData);

      return res.json({
        data: {
          success: true,
          message: "updated",
          data: updatedPatient,
          log: logData,
        },
      });
    } catch (error) {
      console.error("Error adding treatments:", error);
      fs.appendFileSync(
        LOG_FILE_PATH,
        `Error adding treatments: ${error.message}\n`
      );
      return res.json({
        data: {
          success: false,
          message: error.message,
        },
      });
    }
  },

  getlog: async (req, res) => {
    try {
      const logData = fs.readFileSync(LOG_FILE_PATH, "utf8");
      return res.json({
        data: {
          success: true,
          data: logData,
        },
      });
    } catch (error) {
      return res.json({
        data: {
          success: false,
          message: error.message,
        },
      });
    }
  },

  alldocs: async (req, res) => {
    try {
      const documents = await Patient.find({});
      return res.json({
        data: {
          success: true,
          data: documents,
        },
      });
    } catch (error) {
      return res.json({
        data: {
          success: false,
          message: error.message,
        },
      });
    }
  },

  login: async (req, res) => {
    try {
      const { name, password } = req.body;

      // Find user by name
      const user = await User.findOne({ name });
      if (!user) {
        return res.status(401).json({ message: "Invalid name or password" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid name or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      const response = {
        data: {
          success: true,
          token,
          user: {
            id: user._id,
            name: user.name,
            role: user.role,
          },
        },
      };
      return res.json(response);
    } catch (error) {
      return res.status(500).json({
        data: {
          success: false,
          message: "Server error during login",
        },
      });
    }
  },

  register: async (req, res) => {
    try {
      const { name, password, role } = req.body;

      const existingUser = await User.findOne({ name });
      if (existingUser) {
        return res.status(400).json({
          data: {
            success: false,
            message: "User already exists",
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        password: hashedPassword,
        role: role || "patient",
      });

      await user.save();

      // If the role is patient, create a patient record as well
      if (role === "patient") {
        const patient = new Patient({
          name: name.toLowerCase(),
          roomno: "Unassigned",
          assignedDoctor: "Unassigned",
        });
        await patient.save();
      }

      res.status(200).json({
        data: {
          success: true,
          message: "User created successfully",
        },
      });
    } catch (error) {
      res.status(500).json({
        data: {
          success: false,
          message: "Server error during registration",
        },
      });
    }
  },

  getDoctorPatients: async (req, res) => {
    try {
      const { doctorName } = req.body;
      const patients = await Patient.find({ assignedDoctor: doctorName });

      if (!patients.length) {
        return res.json({
          data: {
            success: true,
            message: "No patients assigned yet",
            data: [],
          },
        });
      }

      return res.json({
        data: {
          success: true,
          data: patients,
        },
      });
    } catch (error) {
      return res.json({
        data: {
          success: false,
          message: error.message,
        },
      });
    }
  },

  getDoctors: async (req, res) => {
    try {
      const doctors = await User.find({ role: "doctor" });
      return res.json({
        data: {
          success: true,
          data: doctors,
        },
      });
    } catch (error) {
      return res.json({
        data: {
          success: false,
          message: error.message,
        },
      });
    }
  },

  assignDoctor: async (req, res) => {
    try {
      const { doctorName, patientName } = req.body;

      // Update patient's assigned doctor
      const updatedPatient = await Patient.findOneAndUpdate(
        { name: patientName.toLowerCase() },
        { assignedDoctor: doctorName },
        { new: true }
      );

      if (!updatedPatient) {
        return res.json({
          data: {
            success: false,
            message: "Patient not found",
          },
        });
      }

      return res.json({
        data: {
          success: true,
          message: "Doctor assigned successfully",
          data: updatedPatient,
        },
      });
    } catch (error) {
      return res.json({
        data: {
          success: false,
          message: error.message,
        },
      });
    }
  },

  updateRoom: async (req, res) => {
    try {
      const { name, roomno } = req.body;
      const ch = name.toLowerCase();

      const updatedPatient = await Patient.findOneAndUpdate(
        { name: ch },
        { roomno: roomno },
        { new: true }
      );

      if (!updatedPatient) {
        return res.json({
          data: {
            success: false,
            message: "Patient not found",
          },
        });
      }

      return res.json({
        data: {
          success: true,
          message: "Room assigned successfully",
          data: updatedPatient,
        },
      });
    } catch (error) {
      return res.status(500).json({
        data: {
          success: false,
          message: error?.message,
        },
      });
    }
  },
};

module.exports = controller;
