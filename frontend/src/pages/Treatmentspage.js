import { useState } from "react";
import Api from "../apis/Api";
import Loader from "../components/Loader";
import sharedStyles from "../styles/shared";

export default function Treatmentspage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = {
    "hydrotherapy (men)":
      "hot spinal spray,cold spinal spray,cold hip bath,warm hip bath,underwater massage,vichy shower bath,circular jet,douche,sauna bath,steam room,whirlpool bath",
    "hydrotherapy (female)":
      "hot spinal spray(f),cold spinal spray(f),cold hip bath(f),warm hip bath(f),underwater massage(f),vichy shower bath(f),circular jet(f),douche(f),sauna bath(f),steam room(f),whirlpool bath(f)",
    "physiotherapy (men)":
      "swd,ift,tens,lumbar traction,cervical traction,boto,gh pack,ozone water,body farmer,ultrasound,lwd,ozone bagging,oxygen therapy,foot massager,ir light,hot stone therapy,wax theapy,ice & IR to joints",
    "physiotherapy (women)":
      "swd(f),ift(f),tens(f),lumbar traction(f),cervical traction(f),boto(f),gh pack(f),ozone water(f),body farmer(f),ultrasound(f),lwd(f),ozone bagging(f),oxygen therapy(f),foot massager(f),ir light(f),hot stone therapy(f),wax theapy(f),ice & IR to joints(f)",
    "therapy section (men)":
      "fm & stb,pm to back & limbs,pm to abd & limbs,sirodhara,podikizhi,elikizhi,navarakizhi,turkish bath,kativasti,januvasti,greevasti,urovasti abdomen,dhanya maladhara,pizichill,navarateppu,urovasti chest,nasyamfull vasthi,valuka pinda sweda,head massage & sirodhara,head massage,kashaya vasthi",
    "therapy section (women)":
      "fm & stb(f),pm to back & limbs(f),pm to abd & limbs(f),sirodhara(f),podikizhi(f),elikizhi(f),navarakizhi(f),turkish bath(f),kativasti(f),januvasti(f),greevasti(f),urovasti abdomen(f),dhanya maladhara(f),pizichill(f),navarateppu(f),urovasti chest(f),nasyam(f),full vasthi(f),valuka pinda sweda(f),head massage & sirodhara(f),head massage(f),kashaya vasthi(f)",
    packs:
      "mud pack,oil pack,egg pack,mustard pack,leaf pack,full wet sheet pack,herbal pack,liver pack,hot chest pack",
    kriyas: "herbal prakshlana",
    others:
      "acupuncture,suzok,chiropractic manipulation,full mud bath,go muthra herbal,mud to knees",
  };

  const handler = async () => {
    if (!selectedCategory) {
      setError("Please select a treatment category");
      return;
    }

    setLoading(true);
    setError("");
    setResult([]);

    try {
      const response = await Api.streatment({
        treatments: categories[selectedCategory],
      });
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        setError("No patients found with these treatments");
      }
    } catch (err) {
      setError("Error searching for treatments");
    } finally {
      setLoading(false);
    }
  };

  const renderMatchedTreatments = (treatments, timeSlot) => {
    if (!treatments || treatments.length === 0) return null;
    return (
      <div style={{ marginBottom: "1rem" }}>
        <h4 style={{ color: "#4a5568", marginBottom: "0.5rem" }}>{timeSlot}</h4>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {treatments.map((treatment, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#edf2f7",
                padding: "0.5rem 0.75rem",
                borderRadius: "4px",
                marginBottom: "0.25rem",
              }}
            >
              {treatment}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div style={sharedStyles.pageContainer}>
      <h1 style={sharedStyles.pageTitle}>Search Treatments</h1>

      <div style={sharedStyles.card}>
        <div style={sharedStyles.formGroup}>
          <label style={sharedStyles.label}>Treatment Category</label>
          <div style={{ display: "flex", gap: "1rem" }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ ...sharedStyles.select, flex: 1 }}
            >
              <option value="">Select a category...</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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

        {result.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h2 style={sharedStyles.sectionTitle}>Results</h2>
            <div style={sharedStyles.grid}>
              {result.map((patient, index) => (
                <div key={index} style={sharedStyles.itemCard}>
                  <div style={sharedStyles.cardTitle}>{patient.name}</div>
                  <div style={{ marginBottom: "0.5rem", color: "#718096" }}>
                    Room: {patient.roomno}
                  </div>
                  {patient.matchedTreatments && (
                    <div>
                      {renderMatchedTreatments(
                        patient.matchedTreatments.morning,
                        "Morning"
                      )}
                      {renderMatchedTreatments(
                        patient.matchedTreatments.evening,
                        "Evening"
                      )}
                      {renderMatchedTreatments(
                        patient.matchedTreatments.night,
                        "Night"
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
