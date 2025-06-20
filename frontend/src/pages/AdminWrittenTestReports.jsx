import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const BACKEND_URL = https://quizdepth.onrender.com;

const AdminWrittenTestReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ✅ Fetch all reports
    const getReports = () => {
        fetch(`${BACKEND_URL}/api/written-test-reports`)
            .then(res => res.json())
            .then(data => setReports(data))
            .catch((err) => {console.error("Error fetching Reports:", err);
                setError("Error fetching Report. Try again later.");
            }).finally(() => setLoading(false));
    };

    useEffect(() => {
        getReports();
    }, []);

    // ✅ Delete report function
    const deleteReport = async (id) => {
        if (!id) {
            alert("Report ID is missing!");
            return;
        }

        try {
            const response = await axios.delete(`${BACKEND_URL}/api/written-test-reports/${id}`);

            if (response.status === 200) {
                alert("Report deleted successfully!");
                getReports(); // Refresh report list
            }
        } catch (error) {
            console.error("Error deleting report:", error);
            alert("Failed to delete report.");
        }
    };

    if (loading) return <p>Loading report...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="container">
            <h1>📄 All User Written Test Reports</h1>
            {reports.length === 0 ? (
                <p>No reports found.</p>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Test Name</th>
                                <th>Score</th>
                                <th>Total Marks</th>
                                <th>Passed</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (
                                <tr key={index}>
                                    <td>{report.username}</td>
                                    <td>{report.testName}</td>
                                    <td>{report.score.toFixed(1)}</td>
                                    <td>{report.total}</td>
                                    <td>{report.score >= report.total * 0.5 ? "✅" : "❌"}</td>
                                    <td>
                                        <button className="delete-btn" onClick={() => deleteReport(report._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminWrittenTestReports;
