import React, { useEffect, useState } from "react";

export default function InstructorLeads() {

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const user_id = localStorage.getItem("user_id");

    console.log("USER ID:", user_id); // 👈 DEBUG

    if (!user_id) {
      setLoading(false);
      return;
    }

    fetch(`https://languagewala.in/get-my-leads.php?user_id=${user_id}`)
      .then(res => res.json())
      .then(data => {

        console.log("API DATA:", data); // 👈 DEBUG

        if (data.status === true) {
          setLeads(data.leads);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="col-xl-9 col-lg-12">
      <div className="section-my-courses-right section-right">
        <div className="row">
          <div style={{ padding: "10px" }}>

            <h2 style={{ marginBottom: "10px" }}>Leads</h2>

            {leads.length === 0 && <p>No leads found</p>}

            {leads.length > 0 && (

              <table
                width="100%"
                border="1"
                cellPadding="5"
                style={{ borderCollapse: "collapse" }}
              >

                <thead style={{ background: "#eee" }}>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Course</th>
                    <th>Source</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>

                      <td>{lead.name}</td>
                      <td>{lead.email}</td>
                      <td>{lead.phone}</td>
                      <td>{lead.course}</td>
                      <td>{lead.source}</td>
                      <td>{lead.created_at}</td>

                    </tr>
                  ))}
                </tbody>

              </table>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}