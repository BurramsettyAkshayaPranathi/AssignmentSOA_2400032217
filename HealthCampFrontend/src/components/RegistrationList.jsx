
function RegistrationList({
  healthCamps,
  loading,
  deletingId,
  onEdit,
  onDelete,
  onRefresh
}) {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
          <div>
            <h2 className="h4 fw-bold mb-1">Registration Records</h2>
            <p className="text-secondary small mb-0">
              View and manage participant details.
            </p>
          </div>

          <button
            className="btn btn-outline-primary btn-sm"
            onClick={onRefresh}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary mt-3 mb-0">
              Loading registrations...
            </p>
          </div>
        ) : healthCamps.length === 0 ? (
          <div className="text-center py-5">
            <div className="empty-icon mb-3">📋</div>
            <h3 className="h5">No registrations yet</h3>
            <p className="text-secondary mb-0">
              Add a registration using the form to see records here.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-3">
              <span className="badge text-bg-primary">
                {healthCamps.length} Registration
                {healthCamps.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Camp Name</th>
                    <th scope="col">Participant</th>
                    <th scope="col">Age</th>
                    <th scope="col">Attended</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {healthCamps.map((camp) => (
                    <tr key={camp.id}>
                      <td className="fw-semibold">{camp.id}</td>
                      <td>{camp.campName}</td>
                      <td>{camp.participantName}</td>
                      <td>{camp.age}</td>
                      <td>
                        <span
                          className={`badge ${
                            camp.attended
                              ? 'text-bg-success'
                              : 'text-bg-secondary'
                          }`}
                        >
                          {camp.attended ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => onEdit(camp)}
                            disabled={deletingId !== null}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete(camp.id)}
                            disabled={deletingId !== null}
                          >
                            {deletingId === camp.id
                              ? 'Deleting...'
                              : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RegistrationList;
