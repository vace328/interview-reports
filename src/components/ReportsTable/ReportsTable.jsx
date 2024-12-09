import { useContext, useState } from "react";
import { dataContext } from "../../contexts";
import { formatDate } from "../../utils/format-data";
import { getDefaultSorting } from "../../utils/sorting";
import "./ReportsTable.css";

const ReportsTable = () => {    
  const reports = useContext(dataContext).reports;
  const [candidateId, setCandidateId] = useState(84705028);
  const filteredReports = reports.filter((report) => {
    return report.candidateId === candidateId;
  });

  const columns = [
    { label: "Company", accessor: "companyName", sortable: true },
    { label: "Date", accessor: "interviewDate", sortable: true },
    { label: "Status", accessor: "status", sortable: true },
    { label: "Details", accessor: "details", sortable: false },
  ];
 
  const initiallySortedData = getDefaultSorting(filteredReports, columns);
  const [tableData, setTableData] = useState(initiallySortedData);
  console.log(getDefaultSorting(filteredReports, columns));
  console.log(tableData);


  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

 

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
                onClick={sortable ? () => handleSortingChange(accessor) : null}
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
              <span>Details</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportsTable;
