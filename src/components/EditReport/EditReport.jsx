import React, { useRef, useEffect, useContext, useState } from "react";
import useResize from "../../hooks/useResize";
import { dataContext } from "../../contexts";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditReport = ({ setClasses }) => {
  // const [isDeleting, setIsDeleting] = useState(false);
  const refreshed = useContext(dataContext).refresh;
  const setIsRefreshed = useContext(dataContext).setIsRefreshed;
  const [report, setReport] = useState(null);

  //   form
  const [companies, setCompanies] = useState([]);
  const candidates = useContext(dataContext).candidates.filter((candidate) =>
    candidate.hasOwnProperty("name")
  );

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  //   const initialDate = report[0]?.interviewDate;
  //   console.log(initialDate);
  const [interviewDate, setInterviewDate] = useState("");
  //   const [checkedPhase, setCheckedPhase] = useState({
  //     isChecked: "",
  //   });
  //   const [checkedStatus, setCheckedStatus] = useState({
  //     isChecked: "",
  //   });
  //   const [note, setNote] = useState("");
    const [errors, setErrors] = useState({});

  const { id } = useParams();

  // Keep footer at the bottom if the content is short
  const ref = useRef(null);
  const isShortContent = useResize(ref);
  let contentDivClass = isShortContent
    ? "outer-wrapper shortContent"
    : "outer-wrapper";
  useEffect(() => setClasses(contentDivClass));

  const navigate = useNavigate();
  //   const setReportAdded = useContext(dataContext).setReportAdded;

  // Toastify message
  const notify = () => toast("Report successfully added!");

  //    get report
  useEffect(() => {
    fetch(`http://localhost:3333/api/reports?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInterviewDate(
          new Date(data[0]?.interviewDate).toISOString().split("T")[0]
        );
        console.log(data);
        setSelectedCandidate({candidateId: data[0]?.candidateId, candidateName: data[0]?.candidateName})
        setSelectedCompany({companyId: data[0]?.companyId, companyName: data[0]?.companyName})
        setReport(data[0])
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
    console.log(selectedCandidate);
  const handleEdit = () => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authToken"),
      },
    };
    fetch(`http://localhost:3333/api/reports/${id}`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // navigate(`/admin`);
      });

    //   .then((response) => {
    //     if (!response.ok) {
    //       alert("Error deleting report. Please try again later.");
    //     }
    //   })
    //   .then(() => {
    //     setIsRefreshed(refreshed + 1);
    //     // setIsDeleting(false);
    //   });
  };
  return (
    <>
      <div className="content-wrapper" ref={ref}>
        <h1 className="form-page-heading">Edit report</h1>
        <div className="form-wrapper">
          <form id="newReportForm" onSubmit={handleEdit}>
            <div className="formFieldWrapper">
              <label htmlFor="candidate">Candidate</label>
              <select
                name="candidateId"
                id="candidate"
                onChange={(e) => {
                //   delete errors.candidate;
                //   setErrors(errors);
                  setSelectedCandidate(e.target.value);
                  console.log(e.target.value);
                }}
                value={selectedCandidate?.candidateId}
              >
                <option hidden value={selectedCandidate?.candidateId}>
                  {selectedCandidate?.candidateName}
                </option>
                {candidates.map((candidate, i) => {
                    // console.log(candidate);
                  return (
                    <option key={i + 1} value={{candidateId: candidate.id, candidateName: candidate.name}}>
                    {/* <option key={i + 1} value="fbg"> */}
                      {candidate.name}
                    </option>
                  );
                })}
              </select>
              <span className="error">{errors["candidate"]}</span>
            </div>
           {/*  <div className="formFieldWrapper">
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
            </div>*/}
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
    </>
  );
};

export default EditReport;
