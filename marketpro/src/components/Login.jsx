import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getGoogleAuthUrl, login, signup } from '../api/authApi';
import { toast, ToastContainer } from "react-toastify";

const style = {
    container: "account py-80",
    formContainer: "container container-lg",
    card: "border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40",
    input: "common-input",
    button: "btn btn-main py-18 px-40",
    googleButton: "btn btn-light border py-18 px-40 mt-16 w-100 d-flex align-items-center justify-content-center gap-2",
    link: "text-main-600 text-decoration-underline",
};

const Login = () => {
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
    const [fade, setFade] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === "password" && e.target.value.length < 6) {
            setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
        } else {
            setPasswordError("");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const response = await getGoogleAuthUrl();
            window.location.href = response.data.url;
        } catch (error) {
            toast.error("Google login failed", { position: "top-right" });
            console.error("Google login failed", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            localStorage.setItem("tokenFlower", response.data);
            if (response.status === "OK") {
                toast.success("Đăng nhập thành công!", { position: "top-right" });
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data || "Đăng nhập thất bại", { position: "top-right" });
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
        } catch (error) {
            toast.error(error.response?.data || "Đăng ký thất bại", { position: "top-right" });
        }
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        setFade(true);
        setTimeout(() => {
            navigate('/register');
        }, 300); // 300ms for fade-out
    };

    return (
        <section className={style.container + (fade ? ' fade-out' : '')}>
            <ToastContainer />
            <div className={style.formContainer}>
                <div className="row gy-4 justify-content-center">
                    {/* Form Đăng Nhập */}
                    <form className="col-xl-6 pe-xl-5" onSubmit={handleSubmit}>
                        <div className={`${style.card} h-100`}>
                            <h6 className="text-xl mb-32">Đăng Nhập</h6>
                            <div className="mb-24">
                                <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                    Tên đăng nhập hoặc email <span className="text-danger">*</span>
                                </label>
                                <input type="email" className={style.input} name="email" placeholder="Nhập email đăng nhập" onChange={handleChange} />
                            </div>
                            <div className="mb-24">
                                <label className="text-neutral-900 text-lg mb-8 fw-medium">Mật khẩu</label>
                                <input type="password" className={style.input} name="password" placeholder="Nhập mật khẩu" onChange={handleChange} />
                            </div>
                            <button type="submit" className={style.button}>Đăng nhập</button>
                        </div>
                    </form>
                    <div className="w-100 d-flex justify-content-center mt-3">
                        <a href="/register" onClick={handleRegisterClick} className="text-main-600 text-decoration-underline" style={{ cursor: 'pointer', fontWeight: 500 }}>
                            tạo tài khoản mới
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
