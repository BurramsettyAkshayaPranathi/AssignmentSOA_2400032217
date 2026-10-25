
import { useEffect, useState } from 'react';

const initialForm = {
  campName: '',
  participantName: '',
  age: '',
  attended: ''
};

function RegistrationForm({ onSubmit, editData, onCancel, saving }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        campName: editData.campName ?? '',
        participantName: editData.participantName ?? '',
        age: String(editData.age ?? ''),
        attended:
          editData.attended === true
            ? 'true'
            : editData.attended === false
              ? 'false'
              : ''
      });
    } else {
      setFormData(initialForm);
    }

    setErrors({});
  }, [editData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    const age = Number(formData.age);

    if (!formData.campName.trim()) {
      newErrors.campName = 'Camp name is required.';
    } else if (formData.campName.trim().length > 100) {
      newErrors.campName = 'Camp name must be at most 100 characters.';
    }

    if (!formData.participantName.trim()) {
      newErrors.participantName = 'Participant name is required.';
    } else if (formData.participantName.trim().length > 100) {
      newErrors.participantName =
        'Participant name must be at most 100 characters.';
    }

    if (formData.age.trim() === '') {
      newErrors.age = 'Age is required.';
    } else if (!Number.isInteger(age) || age < 1 || age > 120) {
      newErrors.age = 'Age must be a whole number between 1 and 120.';
    }

    if (formData.attended === '') {
      newErrors.attended = 'Please select attendance.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    await onSubmit({
      campName: formData.campName.trim(),
      participantName: formData.participantName.trim(),
      age: Number(formData.age),
      attended: formData.attended === 'true'
    });

    if (!editData) {
      setFormData(initialForm);
      setErrors({});
    }
  };

  const cancelEdit = () => {
    setFormData(initialForm);
    setErrors({});
    onCancel();
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body p-3 p-md-4">
        <h2 className="h4 fw-bold mb-1">
          {editData ? 'Update Registration' : 'Add Registration'}
        </h2>
        <p className="text-secondary small mb-4">
          {editData
            ? 'Update the participant details below.'
            : 'Enter the participant details to register.'}
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="campName" className="form-label fw-semibold">
              Camp Name <span className="text-danger">*</span>
            </label>
            <input
              id="campName"
              name="campName"
              type="text"
              className={`form-control ${errors.campName ? 'is-invalid' : ''}`}
              placeholder="Enter camp name"
              value={formData.campName}
              onChange={handleChange}
              maxLength={100}
              required
            />
            {errors.campName && (
              <div className="invalid-feedback">{errors.campName}</div>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="participantName"
              className="form-label fw-semibold"
            >
              Participant Name <span className="text-danger">*</span>
            </label>
            <input
              id="participantName"
              name="participantName"
              type="text"
              className={`form-control ${
                errors.participantName ? 'is-invalid' : ''
              }`}
              placeholder="Enter participant name"
              value={formData.participantName}
              onChange={handleChange}
              maxLength={100}
              required
            />
            {errors.participantName && (
              <div className="invalid-feedback">
                {errors.participantName}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label fw-semibold">
              Age <span className="text-danger">*</span>
            </label>
            <input
              id="age"
              name="age"
              type="number"
              className={`form-control ${errors.age ? 'is-invalid' : ''}`}
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
              min="1"
              max="120"
              step="1"
              required
            />
            {errors.age && (
              <div className="invalid-feedback">{errors.age}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="attended" className="form-label fw-semibold">
              Attended <span className="text-danger">*</span>
            </label>
            <select
              id="attended"
              name="attended"
              className={`form-select ${
                errors.attended ? 'is-invalid' : ''
              }`}
              value={formData.attended}
              onChange={handleChange}
              required
            >
              <option value="">Select attendance</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.attended && (
              <div className="invalid-feedback">{errors.attended}</div>
            )}
          </div>

          <div className="d-flex flex-wrap gap-2">
            <button
              type="submit"
              className="btn btn-primary flex-grow-1"
              disabled={saving}
            >
              {saving && (
                <span className="spinner-border spinner-border-sm me-2" />
              )}
              {saving
                ? 'Saving...'
                : editData
                  ? 'Update Registration'
                  : 'Add Registration'}
            </button>

            {editData && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={cancelEdit}
                disabled={saving}
              >
                Cancel
              </button>
            )}
          </div>

       
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
