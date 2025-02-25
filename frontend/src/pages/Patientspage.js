import { useState } from "react";
import Api from "../apis/Api";
import Loader from "../components/Loader";
import sharedStyles from "../styles/shared";

const hydrotherapyOptions = [
  "hot spinal spray",
  "cold spinal spray",
  "cold hip bath",
  "warm hip bath",
  "underwater massage",
  "vichy shower bath",
  "circular jet",
  "douche",
  "sauna bath",
  "steam room",
  "whirlpool bath",
];

const hydrotherapyOptionsf = [
  "hot spinal spray(f)",
  "cold spinal spray(f)",
  "cold hip bath(f)",
  "warm hip bath(f)",
  "underwater massage(f)",
  "vichy shower bath(f)",
  "circular jet(f)",
  "douche(f)",
  "sauna bath(f)",
  "steam room(f)",
  "whirlpool bath(f)",
];

const physiotherapyOptions = [
  "swd",
  "ift",
  "tens",
  "lumbar traction",
  "cervical traction",
  "boto",
  "gh pack",
  "ozone water",
  "body farmer",
  "ultrasound",
  "lwd",
  "ozone bagging",
  "oxygen therapy",
  "foot massager",
  "ir light",
  "hot stone therapy",
  "wax theapy",
  "ice & IR to joints",
];

const physiotherapyOptionsf = [
  "swd(f)",
  "ift(f)",
  "tens(f)",
  "lumbar traction(f)",
  "cervical traction(f)",
  "boto(f)",
  "gh pack(f)",
  "ozone water(f)",
  "body farmer(f)",
  "ultrasound(f)",
  "lwd(f)",
  "ozone bagging(f)",
  "oxygen therapy(f)",
  "foot massager(f)",
  "ir light(f)",
  "hot stone therapy(f)",
  "wax theapy(f)",
  "ice & IR to joints(f)",
];

const therapyOptions = [
  "fm & stb",
  "pm to back & limbs",
  "pm to abd & limbs",
  "sirodhara",
  "podikizhi",
  "elikizhi",
  "navarakizhi",
  "turkish bath",
  "kativasti",
  "januvasti",
  "greevasti",
  "urovasti abdomen",
  "dhanya maladhara",
  "pizichill",
  "navarateppu",
  "urovasti chest",
  "nasyam",
  "full vasthi",
  "valuka pinda sweda",
  "head massage & sirodhara",
  "head massage",
  "kashaya vasthi",
];

const therapyOptionsf = [
  "fm & stb(f)",
  "pm to back & limbs(f)",
  "pm to abd & limbs(f)",
  "sirodhara(f)",
  "podikizhi(f)",
  "elikizhi(f)",
  "navarakizhi(f)",
  "turkish bath(f)",
  "kativasti(f)",
  "januvasti(f)",
  "greevasti(f)",
  "urovasti abdomen(f)",
  "dhanya maladhara(f)",
  "pizichill(f)",
  "navarateppu(f)",
  "urovasti chest(f)",
  "nasyam(f)",
  "full vasthi(f)",
  "valuka pinda sweda(f)",
  "head massage & sirodhara(f)",
  "head massage(f)",
  "kashaya vasthi(f)",
];

const packsOptions = [
  "mud pack",
  "oil pack",
  "egg pack",
  "mustard pack",
  "leaf pack",
  "full wet sheet pack",
  "herbal pack",
  "liver pack",
  "hot chest pack",
];

const kriyasOptions = ["herbal prakshlana"];

const otherOptions = [
  "acupuncture",
  "suzok",
  "chiropractic manipulation",
  "full mud bath",
  "go muthra herbal",
  "mud to knees",
];

const treatmentOptions = {
  "hydrotherapy (men)": hydrotherapyOptions,
  "hydrotherapy (female)": hydrotherapyOptionsf,
  "physiotherapy (men)": physiotherapyOptions,
  "physiotherapy (women)": physiotherapyOptionsf,
  "therapy section (men)": therapyOptions,
  "therapy section (women)": therapyOptionsf,
  packs: packsOptions,
  kriyas: kriyasOptions,
  others: otherOptions,
};

export default function Patientspage() {
  const [data, setData] = useState({
    name: "",
    roomno: "",
    morning: [],
    evening: [],
    night: [],
  });
  const [editField, setEditField] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    hydrotherapy: "",
    "physiotherapy (men)": "",
    "physiotherapy (women)": "",
    "therapy section (men)": "",
    "therapy section (women)": "",
    packs: "",
    kriyas: "",
    others: "",
  });
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState("");

  const handler = async () => {
    if (!data.name.trim()) {
      setError("Please enter a patient name");
      return;
    }

    setLoading(true);
    setError("");
    setPatientData(null);

    try {
      const response = await Api.spatient(data);
      if (response.data.success) {
        setPatientData(response.data.data);
        setData(response.data.data);
      } else {
        setError(response.data.message || "Patient not found");
      }
    } catch (err) {
      setError("Error searching for patient");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (field) => {
    setEditField(field);
    setEditedValue(data[field].join(", "));
  };

  const handleSave = async (field) => {
    try {
      const response = await Api.addtreatment({
        name: data.name,
        time: field,
        treatments: editedValue,
      });

      if (response.data.success) {
        setData((prevData) => ({
          ...prevData,
          [field]: editedValue.split(",").map((item) => item.trim()),
        }));
        setEditField(null);
      } else {
        setError("Failed to update treatments");
      }
    } catch (error) {
      setError("Error saving treatment");
    }
  };

  const handleDropdownChange = (e, field) => {
    const newOption = e.target.value;
    setSelectedOptions((prev) => ({
      ...prev,
      [field]: newOption,
    }));
    setEditedValue((prevValue) => {
      const values = new Set(prevValue.split(",").map((item) => item.trim()));
      values.add(newOption);
      return Array.from(values).join(", ");
    });
  };

  const renderTreatmentSection = (field, title) => {
    const isEditing = editField === field;
    return (
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ ...sharedStyles.sectionTitle, margin: 0 }}>{title}</h3>
          <button
            onClick={() => (isEditing ? handleSave(field) : handleEdit(field))}
            style={{
              ...sharedStyles.button,
              padding: "0.5rem 1rem",
              fontSize: "0.9rem",
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {isEditing ? (
          <div>
            <div style={sharedStyles.formGroup}>
              <select
                style={sharedStyles.select}
                onChange={(e) => handleDropdownChange(e, field)}
                value={selectedOptions[field]}
              >
                <option value="">Select treatment...</option>
                {Object.entries(treatmentOptions).map(([category, options]) => (
                  <optgroup key={category} label={category}>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <textarea
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              style={{
                ...sharedStyles.input,
                minHeight: "100px",
                marginTop: "1rem",
              }}
              placeholder="Treatments (comma-separated)"
            />
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {data[field] && data[field].length > 0 ? (
              data[field].map((treatment, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: "#f7fafc",
                    padding: "0.75rem",
                    marginBottom: "0.5rem",
                    borderRadius: "6px",
                    color: "#4a5568",
                  }}
                >
                  {treatment}
                </li>
              ))
            ) : (
              <li style={{ color: "#718096" }}>No treatments assigned</li>
            )}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div style={sharedStyles.pageContainer}>
      <h1 style={sharedStyles.pageTitle}>Search & Edit Patient Treatments</h1>

      <div style={sharedStyles.card}>
        <div style={sharedStyles.formGroup}>
          <label style={sharedStyles.label}>Patient Name</label>
          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Enter patient name"
              style={{ ...sharedStyles.input, flex: 1 }}
            />
            <button
              onClick={handler}
              style={{
                ...sharedStyles.button,
                minWidth: "120px",
              }}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {error && <div style={sharedStyles.errorMessage}>{error}</div>}

        {loading && (
          <div style={sharedStyles.loadingContainer}>
            <Loader />
          </div>
        )}

        {patientData && (
          <div style={{ marginTop: "2rem" }}>
            <div
              style={{
                backgroundColor: "#f7fafc",
                padding: "1.5rem",
                borderRadius: "8px",
                marginBottom: "2rem",
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ fontWeight: "600", color: "#2d3748" }}>
                  Name:
                </span>{" "}
                {patientData.name}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ fontWeight: "600", color: "#2d3748" }}>
                  Room:
                </span>{" "}
                {patientData.roomno}
              </div>
              <div>
                <span style={{ fontWeight: "600", color: "#2d3748" }}>
                  Doctor:
                </span>{" "}
                {patientData.assignedDoctor || "Not assigned"}
              </div>
            </div>

            {renderTreatmentSection("morning", "Morning Treatments")}
            {renderTreatmentSection("evening", "Evening Treatments")}
            {renderTreatmentSection("night", "Night Treatments")}
          </div>
        )}
      </div>
    </div>
  );
}
