import { useRef, useEffect, useContext, useState } from "react";
import "./NewReport.css";
import useResize from "../../hooks/useResize";
import { dataContext } from "../../contexts";
import { COMPANIES } from "../../utils/constants";
import { REPORTS } from "../../utils/constants";
import { useNavigate } from "react-router";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const NewReport = ({ setClasses }) => {
  const [companies, setCompanies] = useState([]);
  const candidates = useContext(dataContext).candidates;

  const [selectedCandidate, setSelectedCandidate] = useState("DEFAULT");
  const [selectedCompany, setSelectedCompany] = useState("DEFAULT");
  const [interviewDate, setInterviewDate] = useState("2024-12-11");
  const [phase, setPhase] = useState("hr");
  const [status, setStatus] = useState("passed");
  const [note, setNote] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      id: randomIntFromInterval(10000000, 20000000),
      candidateId: JSON.parse(selectedCandidate).id,
      candidateName: JSON.parse(selectedCandidate).name,
      companyId: JSON.parse(selectedCompany).id,
      companyName: JSON.parse(selectedCompany).name,
      interviewDate: interviewDate,
      phase: phase,
      status: status,
      note: note,
    };

    fetch(REPORTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authToken"),
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "jwt expired") {
          localStorage.removeItem("authToken");
          navigate("/");
        } else {
          setSelectedCandidate("DEFAULT");
          setSelectedCompany("DEFAULT");
          setInterviewDate("2024-12-11");
          setPhase("hr");
          setStatus("passed");
          setNote("");
        }
        if (data === "Incorrect authorization scheme") {
          navigate("/");
        }
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(JSON.parse(selectedCandidate).id);
    // console.log(JSON.parse(selectedCandidate).name);
    // console.log(JSON.parse(selectedCompany).id);
    // console.log(JSON.parse(selectedCompany).name);
    // console.log(interviewDate);
    // console.log(phase);
    // console.log(status);
    // console.log(note);
  };

  const ref = useRef(null);
  const isShortContent = useResize(ref);
  let contentDivClass = isShortContent
    ? "outer-wrapper shortContent"
    : "outer-wrapper";
  useEffect(() => setClasses(contentDivClass));

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

  return (
    <div className="content-wrapper" ref={ref}>
      <h1 className="form-page-heading">Create new report</h1>
      <div className="form-wrapper">
        <form id="newReportForm" onSubmit={handleSubmit}>
          <div className="formFieldWrapper">
            <label htmlFor="candidate">Candidate</label>
            <select
              name="candidateId"
              id="candidate"
              onChange={(e) => {
                setSelectedCandidate(e.target.value);
              }}
              value={selectedCandidate}
            >
              <option hidden disabled value="DEFAULT">
                {" "}
                -- select an option --{" "}
              </option>
              {candidates.map((candidate) => {
                return (
                  <option
                    key={crypto.randomUUID()}
                    value={JSON.stringify(candidate)}
                  >
                    {candidate.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="formFieldWrapper">
            <label htmlFor="company">Company</label>
            <select
              name="company"
              id="company"
              onChange={(e) => {
                setSelectedCompany(e.target.value);
              }}
              value={selectedCompany}
            >
              <option hidden disabled value="DEFAULT">
                {" "}
                -- select an option --{" "}
              </option>
              {companies.map((company) => {
                return (
                  <option
                    key={crypto.randomUUID()}
                    value={JSON.stringify(company)}
                  >
                    {company.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="formFieldWrapper">
            <label htmlFor="date">Interview Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={interviewDate}
              onChange={(e) => {
                const fullDate = new Date(e.target.value);
                const date =
                  fullDate.getDate() < 10
                    ? `0${fullDate.getDate()}`
                    : fullDate.getDate();
                const month =
                  fullDate.getMonth() + 1 < 10
                    ? `0${fullDate.getMonth() + 1}`
                    : fullDate.getMonth() + 1;
                const formatted = `${fullDate.getFullYear()}-${month}-${date}`;
                setInterviewDate(formatted);
              }}
            />
          </div>
          <div className="formFieldWrapper">
            <label htmlFor="phase">Phase</label>
            <input
              type="radio"
              id="phase-hr"
              name="phase"
              value={phase}
              defaultChecked
              onChange={(e) => {
                setPhase(e.target.value);
              }}
            />
            HR
            <input
              type="radio"
              id="phase-final"
              name="phase"
              value={status}
              onChange={(e) => {
                setPhase(e.target.value);
              }}
            />
            Final
          </div>
          <div className="formFieldWrapper">
            <label htmlFor="status">Status</label>
            <input
              type="radio"
              id="status-passed"
              name="status"
              value="passed"
              defaultChecked
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            />
            Passed
            <input
              type="radio"
              id="status-declined"
              name="status"
              value="declined"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            />
            Declined
          </div>
          <div className="formFieldWrapper">
            <label htmlFor="note">Note</label>
            <textarea
              name="note"
              id="note"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            ></textarea>
          </div>

          {/* <div class="error-msg hide">All fields are required.</div> */}
          <button id="submitPost" type="submit" className="btn-submit">
            Submit report
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewReport;
