import { useRef, useEffect, useContext, useState } from "react";
import "./NewReport.css";
import useResize from "../../hooks/useResize";
import { dataContext } from "../../contexts";
import { COMPANIES } from "../../utils/constants";
import { REPORTS } from "../../utils/constants";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const NewReport = ({ setClasses }) => {
  const [companies, setCompanies] = useState([]);
  const candidates = useContext(dataContext).candidates.filter((candidate) => candidate.hasOwnProperty('name'));
  const [isLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));

  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  const [selectedCandidate, setSelectedCandidate] = useState(
    JSON.stringify({})
  );
  const [selectedCompany, setSelectedCompany] = useState(JSON.stringify({}));
  const [interviewDate, setInterviewDate] = useState(todayFormatted);
  const [checkedPhase, setCheckedPhase] = useState({
    isChecked: "",
  });
  const [checkedStatus, setCheckedStatus] = useState({
    isChecked: "",
  });
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});

  // Toastify message
  const navigate = useNavigate();
  const setReportAdded = useContext(dataContext).setReportAdded;
  const notify = () => toast("Report successfully added!");

  // Form validation
  const handleValidation = (candidate, company) => {
    const formErrors = {};
    let formIsValid = true;

    if (Object.keys(JSON.parse(candidate)).length === 0) {
      formIsValid = false;
      formErrors["candidate"] = "You must choose a candidate";
    }
    if (Object.keys(JSON.parse(company)).length === 0) {
      formIsValid = false;
      formErrors["company"] = "You must choose a company";
    }
    if (checkedPhase.isChecked === "") {
      formIsValid = false;
      formErrors["phase"] = "You must choose a phase";
    }
    if (checkedStatus.isChecked === "") {
      formIsValid = false;
      formErrors["status"] = "You must choose status";
    }

    setErrors(formErrors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      id: randomIntFromInterval(10000000, 20000000),
      candidateId: JSON.parse(selectedCandidate).id,
      candidateName: JSON.parse(selectedCandidate).name,
      companyId: JSON.parse(selectedCompany).id,
      companyName: JSON.parse(selectedCompany).name,
      interviewDate: interviewDate,
      phase: checkedPhase.isChecked,
      status: checkedStatus.isChecked,
      note: note,
    };

    if (handleValidation(selectedCandidate, selectedCompany)) {
      if (!isLoggedIn) {
        navigate("/");
      } else {
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
              localStorage.setItem("isLoggedIn", false);
              navigate("/");
            } else {
              // Reset form on successful submit
              setSelectedCandidate(JSON.stringify({}));
              setSelectedCompany(JSON.stringify({}));
              setInterviewDate(todayFormatted);
              setCheckedPhase({ isChecked: "" });
              setCheckedStatus({ isChecked: "" });
              setNote("");
              setReportAdded((prev) => prev + 1);
              notify();
            }

            if (data === "Incorrect authorization scheme") {
              // console.log(data);
              localStorage.setItem("isLoggedIn", false);
              navigate("/");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      console.log("Form has errors.");
    }
  };

  // Keep footer at the bottom if the content is short
  const ref = useRef(null);
  const isShortContent = useResize(ref);
  let contentDivClass = isShortContent
    ? "outer-wrapper shortContent"
    : "outer-wrapper";
  useEffect(() => setClasses(contentDivClass));

  // Fetch companies
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
                delete errors.candidate;
                setErrors(errors);
                setSelectedCandidate(e.target.value);
              }}
              value={selectedCandidate}
            >
              <option hidden disabled value={JSON.stringify({})}>
                {" "}
                -- select an option --{" "}
              </option>
              {candidates.map((candidate, i) => {
                return (
                  <option
                    key={i+1}
                    value={JSON.stringify(candidate)}
                  >
                    {candidate.name}
                  </option>
                );
              })}
            </select>
            <span className="error">{errors["candidate"]}</span>
          </div>
          <div className="formFieldWrapper">
            <label htmlFor="company">Company</label>
            <select
              name="company"
              id="company"
              onChange={(e) => {
                delete errors.company;
                setErrors(errors);
                setSelectedCompany(e.target.value);
              }}
              value={selectedCompany}
            >
              <option hidden disabled value={JSON.stringify({})}>
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
            <span className="error">{errors["company"]}</span>
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
                setInterviewDate(fullDate.toISOString().split("T")[0]);
              }}
            />
          </div>
          <div className="formFieldWrapper">
            <label htmlFor="phase">Phase</label>
            <input
              type="radio"
              id="phase-hr"
              name="phase"
              checked={checkedPhase.isChecked === "hr"}
              value="hr"
              onChange={(e) => {
                delete errors.phase;
                setErrors(errors);
                setCheckedPhase({ isChecked: e.target.value });
              }}
            />
            HR
            <input
              type="radio"
              id="phase-final"
              name="phase"
              checked={checkedPhase.isChecked === "final"}
              value="final"
              onChange={(e) => {
                delete errors.phase;
                setErrors(errors);
                setCheckedPhase({ isChecked: e.target.value });
              }}
            />
            Final
            <div className="error">{errors["phase"]}</div>
          </div>
          <div className="formFieldWrapper">
            <label htmlFor="status">Status</label>
            <input
              type="radio"
              id="status-passed"
              name="status"
              checked={checkedStatus.isChecked === "passed"}
              value="passed"
              onChange={(e) => {
                delete errors.status;
                setErrors(errors);
                setCheckedStatus({ isChecked: e.target.value });
              }}
            />
            Passed
            <input
              type="radio"
              id="status-declined"
              name="status"
              checked={checkedStatus.isChecked === "declined"}
              value="declined"
              onChange={(e) => {
                delete errors.status;
                setErrors(errors);
                setCheckedStatus({ isChecked: e.target.value });
              }}
            />
            Declined
            <div className="error">{errors["status"]}</div>
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
          <button
            id="submitPost"
            type="submit"
            className="new-report btn-submit"
          >
            Submit report
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default NewReport;
