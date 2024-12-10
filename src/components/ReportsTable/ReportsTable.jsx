import { useEffect, useState } from "react";
import { formatDate } from "../../utils/format-data";
import { getDefaultSorting } from "../../utils/sorting";
import "./ReportsTable.css";
import { useModalManager } from "../../hooks/useModal";
import RCModal from "../RCModal/RCModal";

const ReportsTable = ({ id }) => {
  const { openModal, closeModal, currentModal } = useModalManager();
  const columns = [
    { label: "Company", accessor: "companyName", sortable: true },
    { label: "Date", accessor: "interviewDate", sortable: true },
    { label: "Status", accessor: "status", sortable: true },
    { label: "Details", accessor: "details", sortable: false },
  ];
  const [tableData, setTableData] = useState([]);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const [clickedReport, setClickedReport] = useState(null);

  const candidateReportsURL = `http://localhost:3333/api/reports?candidateId=${id}`;
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(candidateReportsURL, options)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setTableData(getDefaultSorting(res, columns));
      });
  }, []);

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <>
      <div className="reports-section">
        <h2>Reports</h2>
        <div className="reports-container">
          <div className="report-item report-header">
            {columns?.map(({ label, accessor, sortable }) => {
              const cl = sortable
                ? sortField === accessor && order === "asc"
                  ? "up"
                  : sortField === accessor && order === "desc"
                  ? "down"
                  : "default"
                : "";
              return (
                <span
                  key={accessor}
                  onClick={
                    sortable ? () => handleSortingChange(accessor) : null
                  }
                  className={cl}
                >
                  {label}
                </span>
              );
            })}
          </div>

          {tableData?.map((report) => {
            return (
              <div className="report-item">
                <span>{report?.companyName}</span>
                <span>{formatDate(report?.interviewDate)}</span>
                <span>{report?.status}</span>
                <span
                  className="report-item_view"
                  onClick={() => {
                    setClickedReport(report);
                    openModal("viewModal");
                  }}
                >
                  &#128065;
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {currentModal === "viewModal" && (
        <RCModal
          visible={currentModal}
          setVisible={() => closeModal()}
          report={clickedReport}
        />
      )}
    </>
  );
};

export default ReportsTable;
