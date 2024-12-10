import "./RCModal.css";
import Modal from "react-modal";
import { formatDate } from "../../utils/format-data";

const RCModal = ({ visible, setVisible, report }) => {
  console.log(report);

  return (
    <Modal
      isOpen={visible}
      onRequestClose={() => setVisible(false)}
      style={{
        overlay: {
          background: "#02040f55",
        },
        content: {
          width: "800px",
          height: "500px",
          display: "flex",
          background: "white",
          margin: "auto",
          borderRadius: "25px",
        },
      }}
    >
      <div className="fullModal">
        <div className="modalCandidateName">
          {report.candidateName}
          <button onClick={() => setVisible(false)}>X</button>
        </div>
        <div className="modalCandidateInfo">
          <div className="modalCandidateStatus">
            <h3>Company:</h3>
            <h2>{report.companyName}</h2>
            <h3>Interview Date:</h3>
            <h2>{formatDate(report.interviewDate)}</h2>
            <h3>Interview Phase:</h3>
            <h2>{report.phase}</h2>
            <h3>Interview Status:</h3>
            <h2>{report.status}</h2>
          </div>

          <div className="modalCandidateNote">
            <h3>Notes:</h3>
            <div>{report.note}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RCModal;
