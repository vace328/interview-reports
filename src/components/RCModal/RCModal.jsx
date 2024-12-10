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
      <div>
        {report.candidateName}
        <button onClick={() => setVisible(false)}>X</button>
      </div>
      <div>
        <div>
          <h2>{report.companyName}</h2>
          <h2>{formatDate(report.interviewDate)}</h2>
          <h2>{report.phase}</h2>
          <h2>{report.status}</h2>
        </div>
        <div>{report.note}</div>
      </div>
    </Modal>
  );
};

export default RCModal;
