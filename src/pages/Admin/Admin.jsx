import { useContext, useState, useRef, useEffect } from "react";
import { dataContext } from "../../contexts";
import "./Admin.css";
import AdminSearch from "../../components/AdminSearch/AdminSearch";
import ReportCard from "../../components/ReportCard/ReportCard";
import useResize from "../../hooks/useResize";
import { useNavigate } from "react-router";

const Admin = ({ setClasses }) => {
  const navigate = useNavigate();
  const reports = useContext(dataContext).reports;
  const [search, setSearch] = useState("");
  const filteredReports = reports?.filter((report) => {
    return (
      report?.candidateName?.toLowerCase().includes(search) ||
      report?.companyName?.toLowerCase().includes(search)
    );
  });

  const ref = useRef(null);
  const isShortContent = useResize(ref);
  let contentDivClass = isShortContent
    ? "outer-wrapper shortContent"
    : "outer-wrapper";
  useEffect(() => setClasses(contentDivClass));

  return (
    <div className="content-wrapper" ref={ref}>
      <AdminSearch search={search} setSearch={setSearch} reports={reports} />
      <div className="action-wrapper">
        <button
          className="new-report"
          onClick={() => {
            navigate(`/admin/new-report`);
          }}
        >
          <span>+</span> Create new report
        </button>
      </div>
      <div className="rcard-title">
        <div className="company">Company</div>
        <div className="candidate">Candidate</div>
        <div className="date">Date</div>
        <div className="status">Status</div>
        <div className="actions">Actions</div>
      </div>
      <div>
        <div className="reports-wrapper">
          {filteredReports?.map((report) => {
            return <ReportCard report={report} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
