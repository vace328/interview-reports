// insert this in ReportsTable <DeleteReport reportId={report.id} />
// instead of deleteIcon image, optionally use unicode &#128465;

import React, { useState, useContext } from "react";
import { dataContext } from "../../contexts";

const DeleteReport = ({ reportId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const refreshed = useContext(dataContext).refresh;
  const setIsRefreshed = useContext(dataContext).setIsRefreshed;

  const handleDelete = () => {
    setIsDeleting(true);
    fetch(`http://localhost:3333/api/reports/${reportId}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("authToken"),
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        alert("Error deleting report. Please try again later.");
      }

      setIsRefreshed(refreshed + 1);
      setIsDeleting(false);
    });
  };

  return (
    <button disabled={isDeleting} onClick={handleDelete}>
      {/* <img src={deleteIcon} alt="Delete" /> */}
      &#10008;
    </button>
  );
};

export default DeleteReport;
