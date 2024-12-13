import "./ReportCard.css";
import { formatDate } from "../../utils/format-data";
import { useModalManager } from "../../hooks/useModal";
import RCModal from "../RCModal/RCModal";
import DeleteReport from "../DeleteReport/DeleteReport";
import { useNavigate } from "react-router";

const ReportCard = ({ report }) => {
  const date = formatDate(report.interviewDate);
  const { openModal, closeModal, currentModal } = useModalManager();
  const navigate = useNavigate();
  return (
    <>
      <div className="rcard-wrapper">
        <div className="company">{report.companyName}</div>
        <div className="candidate">{report.candidateName}</div>
        <div className="date">{date}</div>
        <div className="status">{report.status}</div>
        <div className="buttons">
          <button onClick={() => openModal("viewModal")}>&#128065;</button>
          {/* <button>&#10008;</button> */}
          <DeleteReport reportId={report.id} />
          <button
            onClick={() => {
              navigate(`/admin/edit-report/${report.id}`)
            }}
          >
            edit
          </button>
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
