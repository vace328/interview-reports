// insert this in ReportsTable <DeleteReport reportId={report.id} />
// instead of deleteIcon image, optionally use unicode &#128465;

import React, { useState } from "react";
import deleteIcon from "./assets/trash-svgrepo-com.svg";

const DeleteReport = ({ reportId }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    fetch(`http://localhost:3333/api/reports/${reportId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        alert("Error deleting report. Please try again later.");
      }
      setIsDeleting(false);
    });
  };

  return (
    <button disabled={isDeleting} onClick={handleDelete}>
      <img src={deleteIcon} alt="Delete" />
    </button>
  );
};

export default DeleteReport;
