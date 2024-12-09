import { useContext, useState } from "react";
import { dataContext } from "../../contexts";
import "./Admin.css";
import Header from "../../components/Header/Header";
import AdminSearch from "../../components/AdminSearch/AdminSearch";
import Footer from "../../components/Footer/Footer";
import ReportCard from "../../components/ReportCard/ReportCard";

const Admin = () => {
  const reports = useContext(dataContext).reports;
  const [search, setSearch] = useState("");
  const filteredReports = reports?.filter((report) => {
    return (
      report?.candidateName?.toLowerCase().includes(search) ||
      report?.companyName?.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <Header />
      <AdminSearch search={search} setSearch={setSearch} reports={reports} />
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
      <Footer />
    </div>
  );
};

export default Admin;
