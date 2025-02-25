const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    roomno: {
      type: String,
      default: "Unassigned",
    },
    morning: {
      type: [String],
      default: [],
    },
    evening: {
      type: [String],
      default: [],
    },
    night: {
      type: [String],
      default: [],
    },
    "pre breakfast": {
      type: [String],
      default: [],
    },
    breakfast: {
      type: [String],
      default: [],
    },
    lunch: {
      type: [String],
      default: [],
    },
    "post lunch": {
      type: [String],
      default: [],
    },
    dinner: {
      type: [String],
      default: [],
    },
    assignedDoctor: {
      type: String,
      default: "Unassigned",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Patient", PatientSchema);
