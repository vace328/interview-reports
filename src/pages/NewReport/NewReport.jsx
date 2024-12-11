import { useRef, useEffect, useContext, useState } from "react";
import "./NewReport.css";
import useResize from "../../hooks/useResize";
import { dataContext } from "../../contexts";
import { COMPANIES } from "../../utils/constants";

const NewReport = ({ setClasses }) => {
  const [formData, setFormData] = useState({
    id: crypto.randomUUID,
    candidateId: "",
    companyId: "",
    companyName: "",
    interviewDate:
      "Sun Aug 29 2021 06:55:42 GMT+0200 (Central European Summer Time)",
    phase: "final",
    status: "passed",
    note: "Harum consequuntur rerum libero impedit. Quia omnis amet explicabo pariatur. Qui excepturi molestiae suscipit officia eius corrupti.",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      interviewDate: `${new Date(value)}`,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const [companies, setCompanies] = useState([]);
//   const [chosenCandidate, setChosenCandidate] = useState("");
//   const [chosenCompany, setChosenCompany] = useState("");

  const ref = useRef(null);
  const isShortContent = useResize(ref);
  let contentDivClass = isShortContent
    ? "outer-wrapper shortContent"
    : "outer-wrapper";
  useEffect(() => setClasses(contentDivClass));

  const candidates = useContext(dataContext).candidates;
  console.log(candidates);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(COMPANIES, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCompanies(res);
      });
  }, []);

  console.log(crypto.randomUUID());
  return (
    <div className="content-wrapper" ref={ref}>
      <h1>Create new report</h1>
      <div class="form-wrapper">
        <form id="newReportForm" onSubmit={handleSubmit}>
          <div class="formFieldWrapper">
            <label for="candidate">Candidate</label>
            <select
              name="candidate"
              id="candidate"
              onChange={handleFormChange}
            >
              <option hidden disabled selected value>
                {" "}
                -- select an option --{" "}
              </option>
              {candidates.map((candidate) => {
                return (
                  <option value={candidate.candidateId}>
                    {candidate.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div class="formFieldWrapper">
            <label for="company">Company</label>
            <select
              name="company"
              id="company"
              onChange={handleFormChange}
            >
              <option hidden disabled selected value>
                {" "}
                -- select an option --{" "}
              </option>
              {companies.map((company) => {
                return (
                  <option value={company.candidateId}>{company.name}</option>
                );
              })}
            </select>
          </div>
          <div class="formFieldWrapper">
            <label for="date">Date</label>
            <input type="date" id="date" name="datet" value="2024-07-22" onChange={handleFormChange}/>
          </div>
          <div class="formFieldWrapper">
            <label for="phase">Phase</label>
            <input type="radio" id="phase-hr" name="phase" value="hr" checked onChange={handleFormChange} />
            HR
            <input type="radio" id="phase-final" name="phase" value="final" onChange={handleFormChange} />
            Final
          </div>
          <div class="formFieldWrapper">
            <label for="status">Status</label>
            <input
              type="radio"
              id="status-passed"
              name="status"
              value="passed"
              checked
              onChange={handleFormChange}
            />
            Passed
            <input
              type="radio"
              id="status-declined"
              name="status"
              value="declined"
              onChange={handleFormChange}
            />
            Declined
          </div>
          <div class="formFieldWrapper">
            <label for="note">Note:</label>
            <textarea name="note" id="note" cols="30" rows="10" onChange={handleFormChange}></textarea>
          </div>
          {/* <div class="error-msg hide">All fields are required.</div> */}
          <button id="submitPost" type="submit">
            Submit report
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewReport;
