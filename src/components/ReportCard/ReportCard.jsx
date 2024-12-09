import "./ReportCard.css";
import { formatDate } from "../../utils/format-data";

const ReportCard = ({ report }) => {
  const date = formatDate(report.interviewDate);

  return (
    <div className="rcard-wrapper">
      <div className="company">{report.companyName}</div>
      <div className="candidate">{report.candidateName}</div>
      <div className="date">{date}</div>
      <div className="status">{report.status}</div>
      <div className="buttons">
        <button>View</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default ReportCard;
