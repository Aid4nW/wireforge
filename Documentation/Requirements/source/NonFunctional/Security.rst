##########
Security
##########

.. nfreq:: Secure User Authentication
   :id: REQ-NON-SEC-001
   :status: Draft
   :importance: High
   :tags: security, authentication


   The system must provide secure user authentication to protect user data.

   **Acceptance Criteria:**
   *   Passwords are not stored in plain text.
   *   The system is protected against common authentication vulnerabilities (e.g., brute-force attacks, session hijacking).
   *   Users can securely reset their passwords.

.. nfreq:: Data Privacy
   :id: REQ-NON-SEC-002
   :status: Draft
   :importance: High
   :tags: security, privacy


   User data, including harness designs, must be kept private and secure.

   **Acceptance Criteria:**
   *   Users can only access their own data.
   *   The system has measures in place to prevent unauthorized access to data.
   *   The system complies with relevant data protection regulations (e.g., GDPR).
