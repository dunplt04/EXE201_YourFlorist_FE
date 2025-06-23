import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../api/authApi';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '', gender: '' });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data.data);
        setForm({
          name: data.data.name || '',
          phone: data.data.phone || '',
          address: data.data.address || '',
          gender: data.data.gender || '',
        });
      } catch (err) {
        setError('Không thể tải thông tin người dùng.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
    setSuccess('');
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm({
      name: profile.name || '',
      phone: profile.phone || '',
      address: profile.address || '',
      gender: profile.gender || '',
    });
    setSuccess('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    try {
      await updateUserProfile(form);
      setProfile({ ...profile, ...form });
      setEditMode(false);
      setSuccess('Cập nhật thành công!');
    } catch (err) {
      setError('Cập nhật thất bại.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Đang tải thông tin...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!profile) return null;

  return (
    <div className="container container-lg my-5 d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="shadow-lg rounded-24 bg-white p-5" style={{ maxWidth: 420, width: '100%' }}>
        <div className="d-flex flex-column align-items-center mb-4">
          <div className="rounded-circle bg-main-100 d-flex justify-content-center align-items-center mb-3" style={{ width: 90, height: 90, fontSize: 36, color: '#258f4a', fontWeight: 700 }}>
            {getInitials(profile.name)}
          </div>
          <h4 className="mb-1 text-main-600">{profile.name}</h4>
          <div className="text-gray-500 mb-2">{profile.email}</div>
        </div>
        <hr className="mb-4" />
        {editMode ? (
          <form onSubmit={handleSave}>
            <div className="mb-3">
              <label className="form-label">Họ tên</label>
              <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
              <input className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Địa chỉ</label>
              <input className="form-control" name="address" value={form.address} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="form-label">Giới tính</label>
              <select className="form-select" name="gender" value={form.gender} onChange={handleChange} required>
                <option value="">Chọn giới tính</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
              </select>
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-outline-secondary" onClick={handleCancel} disabled={saving}>Hủy</button>
              <button type="submit" className="btn btn-main" disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
            </div>
          </form>
        ) : (
          <>
            <div className="mb-3 d-flex align-items-center">
              <span className="me-2 text-main-600"><i className="ph ph-phone"></i></span>
              <span><strong>Số điện thoại:</strong> {profile.phone}</span>
            </div>
            <div className="mb-3 d-flex align-items-center">
              <span className="me-2 text-main-600"><i className="ph ph-map-pin"></i></span>
              <span><strong>Địa chỉ:</strong> {profile.address}</span>
            </div>
            <div className="mb-3 d-flex align-items-center">
              <span className="me-2 text-main-600"><i className="ph ph-user"></i></span>
              <span><strong>Giới tính:</strong> {profile.gender}</span>
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-main" onClick={handleEdit}>Chỉnh sửa</button>
            </div>
          </>
        )}
        {success && <div className="alert alert-success mt-4 mb-0 text-center">{success}</div>}
      </div>
    </div>
  );
};

export default UserProfile; 