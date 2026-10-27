
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import RegistrationList from './components/RegistrationList.jsx';
import './App.css';

const API_URL = `${import.meta.env.VITE_API_URL}/healthcamp`;

function App() {
  const [healthCamps, setHealthCamps] = useState([]);
  const [editData, setEditData] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchHealthCamps = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${API_URL}/displayall`);
      setHealthCamps(response.data);
    } catch (error) {
      showMessage(
        'Unable to load registrations. Check whether the backend is running.',
        'danger'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealthCamps();
  }, [fetchHealthCamps]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    setMessage('');

    try {
      if (editData) {
        await axios.put(
          `${API_URL}/update/${editData.id}`,
          formData
        );
        showMessage('Registration updated successfully.');
        setEditData(null);
      } else {
        await axios.post(`${API_URL}/add`, formData);
        showMessage('Registration added successfully.');
      }

      setSearchResult(null);
      setSearchError('');
      await fetchHealthCamps();
    } catch (error) {
      showMessage(
        error.response?.data?.message ||
          'Unable to save registration. Please check your details and try again.',
        'danger'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (camp) => {
    setEditData(camp);

    document.getElementById('register')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this registration?'
      )
    ) {
      return;
    }

    setDeletingId(id);
    setMessage('');

    try {
      await axios.delete(`${API_URL}/delete/${id}`);

      showMessage('Registration deleted successfully.');

      if (editData?.id === id) {
        setEditData(null);
      }

      if (String(searchId) === String(id)) {
        setSearchResult(null);
        setSearchError('Registration ID not found.');
      }

      await fetchHealthCamps();
    } catch (error) {
      showMessage(
        'Unable to delete registration. Please try again.',
        'danger'
      );
    } finally {
      setDeletingId(null);
    }
  };

  const findRegistration = async (e) => {
    e.preventDefault();

    setSearchResult(null);
    setSearchError('');
    setMessage('');

    const id = searchId.trim();

    if (!/^[1-9]\d*$/.test(id)) {
      setSearchError('Please enter a valid Registration ID.');
      return;
    }

    setSearchLoading(true);

    try {
      const response = await axios.get(`${API_URL}/display/${id}`);
      const data = response.data;

      if (
        !data ||
        data.id == null ||
        String(data.id) !== id
      ) {
        setSearchError('Registration ID not found.');
      } else {
        setSearchResult(data);
      }
    } catch (error) {
      setSearchError('Registration ID not found.');
    } finally {
      setSearchLoading(false);
    }
  };

  const attendedCount = healthCamps.filter(
    (camp) => camp.attended === true
  ).length;

  const notAttendedCount = healthCamps.filter(
    (camp) => camp.attended === false
  ).length;

  return (
    <>
      <Navbar />

      <main id="home" className="container py-4 py-md-5">
        <div className="page-heading mb-4">
          <p className="text-primary fw-semibold mb-1">
            HEALTH SERVICES
          </p>

          <h1 className="fw-bold">
            Health Camp Registration
          </h1>

          <p className="text-secondary mb-0">
            Register participants and manage health camp records.
          </p>
        </div>

        {message && (
          <div
            className={`alert alert-${messageType} alert-dismissible fade show`}
            role="alert"
          >
            {message}

            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setMessage('')}
            />
          </div>
        )}

        {/* Registration Overview */}
        <section className="mb-4" aria-label="Registration overview">
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <div className="card shadow-sm border-0 p-3 h-100">
                <span className="text-secondary">
                  Total Registrations
                </span>
                <h3 className="fw-bold mb-0">
                  {healthCamps.length}
                </h3>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card shadow-sm border-0 p-3 h-100">
                <span className="text-secondary">Attended</span>
                <h3 className="fw-bold text-success mb-0">
                  {attendedCount}
                </h3>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card shadow-sm border-0 p-3 h-100">
                <span className="text-secondary">Not Attended</span>
                <h3 className="fw-bold text-danger mb-0">
                  {notAttendedCount}
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* Add Registration */}
        <section id="register" className="mb-4">
          <div className="card shadow-sm border-0 p-3 p-md-4">
            <div className="mb-3">
              <h4 className="fw-bold mb-1">Participant Registration</h4>
              <p className="text-secondary mb-0">
                Enter the participant details to register.
              </p>
            </div>

            <RegistrationForm
              onSubmit={handleSubmit}
              editData={editData}
              onCancel={() => setEditData(null)}
              saving={saving}
            />
          </div>
        </section>

        {/* Display All Registrations */}
        <section id="registrations" className="mb-4">
          <div className="card shadow-sm border-0 p-3 p-md-4">
            <div className="mb-3">
              <h4 className="fw-bold mb-1">
                Participant Directory
              </h4>
              <p className="text-secondary mb-0">
               
              </p>
            </div>

            <RegistrationList
              healthCamps={healthCamps}
              loading={loading}
              deletingId={deletingId}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRefresh={fetchHealthCamps}
            />
          </div>
        </section>

        {/* Find and Delete Registration by ID */}
        <section id="find-registration" className="mb-4">
        <div className="row g-4 align-items-start">
            {/* Find by ID */}
            <div className="col-12 col-lg-6">
              <div className="card border-0 shadow-sm h-100 p-3 p-md-4">
                <div className="mb-3">
                  <h4 className="fw-bold mb-1">
                    Find a Participant
                  </h4>
                  <p className="text-secondary mb-0">
                    Search for a participant using their registration ID.
                  </p>
                </div>

                <form onSubmit={findRegistration} className="mt-auto">
                  <div className="mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Registration ID"
                      value={searchId}
                      onChange={(e) => {
                        setSearchId(e.target.value);
                        setSearchResult(null);
                        setSearchError('');
                      }}
                      min="1"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={searchLoading}
                  >
                    {searchLoading ? 'Searching...' : 'Find Registration'}
                  </button>
                </form>

                {searchError && (
                  <div className="alert alert-danger mt-3 mb-0" role="alert">
                    {searchError}
                  </div>
                )}

                {searchResult && (
                  <div className="registration-result mt-3 p-3 rounded">
                    <h5 className="fw-bold mb-3">
                      Participant Details
                    </h5>
                    <p><strong>ID:</strong> {searchResult.id}</p>
                    <p><strong>Camp Name:</strong> {searchResult.campName}</p>
                    <p><strong>Participant:</strong> {searchResult.participantName}</p>
                    <p><strong>Age:</strong> {searchResult.age}</p>
                    <p className="mb-0">
                      <strong>Attended:</strong>{' '}
                      {searchResult.attended ? 'Yes' : 'No'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Delete by ID */}
            <div className="col-12 col-lg-6">
              <div className="card delete-card border-0 shadow-sm h-100 p-3 p-md-4">
                <div className="mb-3">
                  <h4 className="fw-bold mb-1">
                  Manage Participant Records
                  </h4>
                  <p className="text-secondary mb-0">
                    Enter a registration ID to remove that record.
                  </p>
                </div>

                <form
                  className="mt-auto"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const id = e.currentTarget.elements.deleteId.value.trim();

                    if (/^[1-9]\d*$/.test(id)) {
                      handleDelete(Number(id));
                    }
                  }}
                >
                  <div className="mb-3">
                    <input
                      name="deleteId"
                      type="number"
                      className="form-control"
                      placeholder="Enter Registration ID"
                      min="1"
                      step="1"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-danger w-100">
                    Remove Participant
                  </button>
                </form>

                <p className="delete-warning mt-3 mb-0"></p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="card border-0 shadow-sm p-4 mb-4">
          <h4 className="fw-bold">About HealthCamp</h4>
          <p className="text-secondary mb-0">
            HealthCamp is a registration management application for
            organizing participant details, managing attendance, and
            maintaining health camp records.
          </p>
        </section>

        <footer className="text-center text-secondary py-4">
          Health Camp Registration System
        </footer>
      </main>
    </>
  );
}

export default App;
