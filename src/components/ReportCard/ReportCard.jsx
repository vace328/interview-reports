import "./ReportCard.css";
import { formatDate } from "../../utils/format-data";
import { useModalManager } from "../../hooks/useModal";
import RCModal from "../RCModal/RCModal";

const ReportCard = ({ report }) => {
  const date = formatDate(report.interviewDate);
  const { openModal, closeModal, currentModal } = useModalManager();

  return (
    <>
      <div className="rcard-wrapper">
        <div className="company">{report.companyName}</div>
        <div className="candidate">{report.candidateName}</div>
        <div className="date">{date}</div>
        <div className="status">{report.status}</div>
        <div className="buttons">
          <button onClick={() => openModal("viewModal")}>View</button>
          <button>Delete</button>
        </div>
      </div>
      {currentModal === "viewModal" && (
        <RCModal
          visible={currentModal}
          setVisible={() => closeModal()}
          report={report}
        />
      )}
    </>
  );
};

export default ReportCard;
