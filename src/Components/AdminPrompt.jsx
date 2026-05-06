import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPrompt = () => {
  const [showModal, setShowModal] = useState(true);
  const [denied, setDenied] = useState(false);
  const navigate = useNavigate();

  const handleYes = () => {
    setShowModal(false);
    navigate("/admin-login"); // goes to login page
  };

  const handleNo = () => {
    setShowModal(false);
    setDenied(true); // shows access denied message
  };

  return (
    <div>
      {/* ── Modal Prompt ── */}
      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-4">
              <div className="modal-body">
                <h4>🔐 Restricted Area</h4>
                <p className="text-muted mt-2">
                  This page is for administrators only.
                  <br />
                  Are you an admin?
                </p>
                <div className="d-flex justify-content-center gap-3 mt-4">
                  <button
                    className="btn btn-success px-4"
                    onClick={handleYes}
                  >
                    ✅ Yes, I'm an Admin
                  </button>
                  <button
                    className="btn btn-danger px-4"
                    onClick={handleNo}
                  >
                    ❌ No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Access Denied Message ── */}
      {denied && (
        <div className="container text-center mt-5">
          <div className="alert alert-danger p-5">
            <h3>🚫 Access Denied</h3>
            <p>You do not have permission to view this page.</p>
            <button
              className="btn btn-secondary mt-2"
              onClick={() => navigate("/")}
            >
              Go Back Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPrompt;