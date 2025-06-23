import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/authApi';
import { toast, ToastContainer } from "react-toastify";
import HeaderOne from "./HeaderOne";

const style = {
    container: "account py-80",
    formContainer: "container container-lg",
    card: "border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40",
    input: "common-input",
    button: "btn btn-main py-18 px-40",
    link: "text-main-600 text-decoration-underline",
};

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        address: "",
        phone: "",
        gender: "",
    });
    const [passwordError, setPasswordError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === "password" && e.target.value.length < 6) {
            setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
        } else {
            setPasswordError("");
        }
    };

    const handleSubmitSignin = async (e) => {
        e.preventDefault();
        if (formData.password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự", { position: "top-right" });
            return;
        }
        try {
            const response = await signup(formData);
            localStorage.setItem("token", response.data.data);
            toast.success("Vui lòng kiểm tra Mail, xác nhận tài khoản!", { position: "top-right" });
            setFormData({
                email: "",
                password: "",
                name: "",
                address: "",
                phone: "",
                gender: "",
            });
            navigate('/account');
        } catch (error) {
            toast.error(error.response?.data || "Đăng ký thất bại", { position: "top-right" });
        }
    };

    return (
        <>
            <HeaderOne />
            <section className={style.container}>
                <ToastContainer />
                <div className={style.formContainer}>
                    <div className="row gy-4 justify-content-center">
                        <form className="col-xl-6" onSubmit={handleSubmitSignin}>
                            <div className="breadcrumb py-26 bg-white">
                                <div className={style.card}>
                                    <h6 className="text-xl mb-32">Đăng Ký</h6>
                                    <input type="text" className={style.input + ' mb-24'} name="name" placeholder="Tên đăng nhập" onChange={handleChange} />
                                    <input type="email" className={style.input + ' mb-24'} name="email" placeholder="Địa chỉ email" onChange={handleChange} />
                                    <input type="tel" className={style.input + ' mb-24'} name="phone" placeholder="Số điện thoại" onChange={handleChange} />
                                    <input type="text" className={style.input + ' mb-24'} name="address" placeholder="Địa chỉ" onChange={handleChange} />
                                    <div className="mb-32">
                                        <label className="text-neutral-900 text-lg mb-8 fw-medium">Giới tính</label>
                                        <div className="d-flex gap-24 mt-2">
                                            <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Nam</label>
                                            <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Nữ</label>
                                            <label><input type="radio" name="gender" value="Other" onChange={handleChange} /> Khác</label>
                                        </div>
                                    </div>
                                    <div className="mb-32">
                                        <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                            Mật khẩu <span className="text-danger">*</span>
                                        </label>
                                        <input type="password" className={style.input + ' mt-2'} name="password" placeholder="Nhập mật khẩu" onChange={handleChange} />
                                        {passwordError && <p className="text-danger mt-2">{passwordError}</p>}
                                    </div>
                                    <p className="text-gray-500 mb-32">
                                        Thông tin cá nhân của bạn sẽ được sử dụng theo <Link to="#" className={style.link}>chính sách bảo mật</Link>.
                                    </p>
                                    <button type="submit" className={style.button}>Đăng Ký</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;