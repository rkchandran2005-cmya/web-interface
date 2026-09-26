import { useEffect, useRef, useState } from 'react';
import idCardPhoto from './idcard.jpeg';
import './aadhaar-registration.css';

const aadhaarName = 'Keerthana R';
const maxPhotoSize = 200 * 1024;
const requiredFields = ['fullName', 'age', 'gender', 'phone', 'aadhaar', 'address', 'state', 'pincode'];

const emptyForm = {
  fullName: '', age: '', gender: '', phone: '', email: '', aadhaar: '', pan: '',
  address: '', city: '', state: '', pincode: '', dateOfBirth: '', occupation: '',
  nationality: 'Indian', password: '', photo: null,
};

function TextField({ label, name, type = 'text', value, error, required, onChange }) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label} {required && <span className="required">*</span>}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} />
      {error && <p className="error">{error}</p>}
    </div>
  );
}

function isLetter(character) {
  return character >= 'A' && character <= 'Z';
}

function validPan(value) {
  const pan = value.toUpperCase();
  if (pan.length !== 10) return false;
  for (let index = 0; index < 5; index += 1) {
    if (!isLetter(pan[index])) return false;
  }
  for (let index = 5; index < 9; index += 1) {
    if (isNaN(pan[index])) return false;
  }
  return isLetter(pan[9]);
}

function checkPhoto(file) {
  return new Promise((resolve) => {
    if (!file) {
      resolve('Photo is required.');
      return;
    }
    if (file.size > maxPhotoSize) {
      resolve('Photo must be 200 KB or smaller.');
      return;
    }

    const image = new Image();
    const imageUrl = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(imageUrl);
      if (image.width !== 300 || image.height !== 300) {
        resolve('Photo must be exactly 300 x 300 pixels.');
      } else {
        resolve('');
      }
    };
    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      resolve('Please select a valid image.');
    };
    image.src = imageUrl;
  });
}

function AadhaarRegistration() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [defaultPhoto, setDefaultPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(idCardPhoto);
  const photoPreviewUrl = useRef(null);

  useEffect(() => {
    let active = true;

    async function loadDefaultPhoto() {
      try {
        const response = await fetch(idCardPhoto);
        const bitmap = await createImageBitmap(await response.blob());
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        const context = canvas.getContext('2d');
        if (!context) return;

        const scale = Math.max(300 / bitmap.width, 300 / bitmap.height);
        const width = bitmap.width * scale;
        const height = bitmap.height * scale;
        context.drawImage(bitmap, (300 - width) / 2, (300 - height) / 2, width, height);
        bitmap.close();

        const photoBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
        if (!active || !photoBlob) return;

        const photo = new File([photoBlob], 'idcard.jpeg', { type: 'image/jpeg' });
        setDefaultPhoto(photo);
        setForm((oldForm) => oldForm.photo ? oldForm : { ...oldForm, photo });
      } catch {
        return;
      }
    }

    loadDefaultPhoto();
    return () => { active = false; };
  }, []);

  useEffect(() => () => {
    if (photoPreviewUrl.current) URL.revokeObjectURL(photoPreviewUrl.current);
  }, []);

  function updatePhotoPreview(photo) {
    if (photoPreviewUrl.current) URL.revokeObjectURL(photoPreviewUrl.current);
    photoPreviewUrl.current = photo ? URL.createObjectURL(photo) : null;
    setPhotoPreview(photoPreviewUrl.current || idCardPhoto);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
    setErrors((oldErrors) => ({ ...oldErrors, [name]: '' }));
    setMessage('');
  }

  function handlePhotoChange(event) {
    const photo = event.target.files[0];
    setForm((oldForm) => ({ ...oldForm, photo }));
    updatePhotoPreview(photo);
    setErrors((oldErrors) => ({ ...oldErrors, photo: '' }));
    setMessage('');
  }

  function validateFields() {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!form[field]) newErrors[field] = 'This field is required.';
    });
    if (form.fullName && form.fullName.toLowerCase() !== aadhaarName.toLowerCase()) newErrors.fullName = 'Name does not match the Aadhaar record.';
    if (form.age && (Number(form.age) < 18 || Number(form.age) > 100)) newErrors.age = 'Age must be between 18 and 100.';
    if (form.phone && (form.phone.length !== 10 || isNaN(form.phone))) newErrors.phone = 'Phone number must contain 10 digits.';
    if (form.email && (!form.email.includes('@') || !form.email.includes('.'))) newErrors.email = 'Enter a valid email address.';
    if (form.aadhaar && (form.aadhaar.length !== 12 || isNaN(form.aadhaar))) newErrors.aadhaar = 'Aadhaar number must contain 12 digits.';
    if (form.pan && !validPan(form.pan)) newErrors.pan = 'PAN must follow ABCDE1234F format.';
    if (form.pincode && (form.pincode.length !== 6 || isNaN(form.pincode))) newErrors.pincode = 'Pincode must contain 6 digits.';
    if (form.password && form.password.length < 8) newErrors.password = 'Password must contain at least 8 characters.';
    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const newErrors = validateFields();
    newErrors.photo = await checkPhoto(form.photo);
    if (!newErrors.photo) delete newErrors.photo;
    setErrors(newErrors);
    setMessage(Object.keys(newErrors).length === 0 ? 'Registration submitted successfully.' : 'Please correct the errors below.');
  }

  function resetForm() {
    setForm({ ...emptyForm, photo: defaultPhoto });
    updatePhotoPreview(null);
    setErrors({});
    setMessage('');
  }

  return (
    <main className="registration-page">
      <section className="registration-card">
        <h1>Aadhaar User Registration</h1>
        <p className="form-intro">Enter your details and upload a 300 x 300 pixel photo up to 200 KB.</p>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <TextField label="Full Name" name="fullName" value={form.fullName} error={errors.fullName} required onChange={handleChange} />
            <TextField label="Age" name="age" type="number" value={form.age} error={errors.age} required onChange={handleChange} />
            <div className="form-field"><label htmlFor="gender">Gender <span className="required">*</span></label><select id="gender" name="gender" value={form.gender} onChange={handleChange}><option value="">Select gender</option><option>Female</option><option>Male</option><option>Other</option></select>{errors.gender && <p className="error">{errors.gender}</p>}</div>
            <TextField label="Phone Number" name="phone" type="tel" value={form.phone} error={errors.phone} required onChange={handleChange} />
            <TextField label="Email Address" name="email" type="email" value={form.email} error={errors.email} onChange={handleChange} />
            <TextField label="Aadhaar Number" name="aadhaar" value={form.aadhaar} error={errors.aadhaar} required onChange={handleChange} />
            <TextField label="PAN Number" name="pan" value={form.pan} error={errors.pan} onChange={handleChange} />
            <TextField label="Address" name="address" value={form.address} error={errors.address} required onChange={handleChange} />
            <TextField label="City" name="city" value={form.city} error={errors.city} onChange={handleChange} />
            <TextField label="State" name="state" value={form.state} error={errors.state} required onChange={handleChange} />
            <TextField label="Pincode" name="pincode" value={form.pincode} error={errors.pincode} required onChange={handleChange} />
            <TextField label="Date of Birth" name="dateOfBirth" type="date" value={form.dateOfBirth} error={errors.dateOfBirth} onChange={handleChange} />
            <TextField label="Occupation" name="occupation" value={form.occupation} error={errors.occupation} onChange={handleChange} />
            <TextField label="Nationality" name="nationality" value={form.nationality} error={errors.nationality} onChange={handleChange} />
            <TextField label="Password" name="password" type="password" value={form.password} error={errors.password} onChange={handleChange} />
            <div className="form-field photo-field"><label htmlFor="photo">Profile Photo <span className="required">*</span></label><img className="photo-preview" src={photoPreview} alt="Profile photo preview" /><input id="photo" name="photo" type="file" accept="image/*" onChange={handlePhotoChange} />{form.photo && <small>{form.photo.name} is ready to upload</small>}{errors.photo && <p className="error">{errors.photo}</p>}</div>
          </div>
          <p className="demo-note">Demo Aadhaar name: <strong>{aadhaarName}</strong></p>
          {message && <p className={Object.keys(errors).length ? 'message error-message' : 'message success'}>{message}</p>}
          <div className="form-actions"><button className="reset-button" type="button" onClick={resetForm}>Reset</button><button className="submit-button" type="submit">Register User</button></div>
        </form>
      </section>
    </main>
  );
}

export default AadhaarRegistration;
