import React from 'react';

const Terms = () => {
  return (
    <div className="container mt-5 mb-5 ">
      <div className="card shadow p-4 text-dark">
                <div className="text-center mb-4">
                <h1 className="fw-bold">📜 Terms & Conditions</h1>
                <p className="text-muted">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

        <p>
          Welcome to <strong>MentorConnect</strong>. By using this platform, you agree to the following terms and conditions.
        </p>

        <h4 className="mt-4">1. Use of the Platform</h4>
        <p>
          MentorConnect provides access to mentorship services. You agree to use the platform responsibly and not misuse any services.
        </p>

        <h4 className="mt-4">2. User Accounts</h4>
        <p>
          You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
        </p>

        <h4 className="mt-4">3. Payments</h4>
        <p>
          All payments for mentorship sessions are processed securely. Refund policies may vary depending on the mentor.
        </p>

        <h4 className="mt-4">4. Code of Conduct</h4>
        <p>
          Users must treat mentors and other users with respect. Any abusive or inappropriate behavior may lead to account suspension.
        </p>

        <h4 className="mt-4">5. Limitation of Liability</h4>
        <p>
          MentorConnect is not liable for any outcomes resulting from mentorship advice or sessions.
        </p>

        <h4 className="mt-4">6. Changes to Terms</h4>
        <p>
          We may update these terms at any time. Continued use of the platform means you accept the updated terms.
        </p>

        <p className="mt-4">
          If you have any questions, please contact us at <strong>support@mentorconnect.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default Terms;