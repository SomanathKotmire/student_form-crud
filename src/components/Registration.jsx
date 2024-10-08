import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Registration() {

    let { id } = useParams()
    let navigate = useNavigate()

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        rollNo: "",
        mobileNo: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        firstNameError: '',
        lastNameError: '',
        rollNoError: '',
        mobileNoError: '',
        emailError: '',
        passwordError: ''
    });

    const [passwordVisibile, setPasswordVisible] = useState(false);


    function handleChange(e) {
        e.preventDefault();
        setError({
            firstNameError: '',
            lastNameError: '',
            rollNoError: '',
            mobileNoError: '',
            emailError: '',
            passwordError: ''
        });
        setData({ ...data, [e.target.id]: e.target.value })
    };

    function handleSubmit(e) {
        // console.log(data);

        const errObj = {};

        if (data.firstName.trim() === '') {
            errObj.firstNameError = 'First Name is required';
        } else if (data.firstName.trim().length <= 2) {
            errObj.firstNameError = 'First Name must be longer than 2 characters';
        }
        if (data.lastName.trim() === '') {
            errObj.lastNameError = 'Last Name is required';
        } else if (data.lastName.trim().length <= 2) {
            errObj.lastNameError = 'Last Name must be longer than 2 characters';
        }
        if (data.rollNo.trim() === '') {
            errObj.rollNoError = 'Roll No is required';
        }
        if (data.email.trim() === "") {
            errObj.emailError = "Email is Required"
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)) {
            errObj.emailError = "Please Enter Valid Email"
        }
        if (data.mobileNo.trim() === "") {
            errObj.mobileNoError = "MobileNo is Required"
        } else if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(data.mobileNo)) {
            errObj.mobileNoError = "Please Enter Valid No."
        }
        if (data.password.trim() === "") {
            errObj.passwordError = "Password is Required"
        } else if (data.password.trim().length <= 5) {
            errObj.passwordError = "6 Character is Required"
        }

        if (Object.keys(errObj).length > 0) {
            setError(errObj);
        } else {
            if (id === undefined) {
                axios.post("https://6607c541a2a5dd477b136715.mockapi.io/InfoSonicTask/", data)
                    .then((res) => {
                        console.log(res.data);
                        // alert("Data Added Successfully")
                        notifyAdd()
                        navigate("/userData");
                        setData({
                            firstName: "",
                            lastName: "",
                            rollNo: "",
                            mobileNo: "",
                            email: "",
                            password: ""
                        })

                    })
            } else {
                axios.put("https://6607c541a2a5dd477b136715.mockapi.io/InfoSonicTask/" + id, data)
                    .then((res) => {
                        console.log(res.data);
                        notifyAdd();
                        navigate("/userdata");
                        setData({
                            firstName: "",
                            lastName: "",
                            rollNo: "",
                            mobileNo: "",
                            email: "",
                            password: ""
                        })
                    })
            }
        }


    };

    useEffect(() => {
        if (id !== undefined) {
            // alert(id)
            axios.get("https://6607c541a2a5dd477b136715.mockapi.io/InfoSonicTask/" + id)
                .then((res) => {
                    console.log(res.data);
                    setData({
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        rollNo: res.data.rollNo,
                        mobileNo: res.data.mobileNo,
                        email: res.data.email,
                        password: res.data.password,
                    })
                })
        }
    }, []);

    const notifyAdd = () => {
        toast.success('Data added!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    return (
        <div>
            <section class="vh-100">
                <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div class="container h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div class="card my-4" style={{ borderRadius: "15px" }}>
                                    <div class="card-body p-5">
                                        <h2 class="text-uppercase text-center mb-5">Student Registration</h2>

                                        <form>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div data-mdb-input-init class="form-outline mb-4">
                                                        {error.firstNameError && <span className='text-danger'>{error.firstNameError}</span>}
                                                        <input type="text" id="firstName" value={data.firstName} onChange={(e) => handleChange(e)} class="form-control form-control-lg" />
                                                        <label class="form-label" for="form3Example1cg">First Name</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div data-mdb-input-init class="form-outline mb-4">
                                                        {error.lastNameError && <span className='text-danger'>{error.lastNameError}</span>}
                                                        <input type="text" id="lastName" value={data.lastName} onChange={(e) => handleChange(e)} class="form-control form-control-lg" />
                                                        <label class="form-label" for="form3Example1cg">Last Name</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-6">
                                                    {error.rollNoError && <span className='text-danger'>{error.rollNoError}</span>}
                                                    <div data-mdb-input-init class="form-outline mb-4">
                                                        <input type="text" id="rollNo" value={data.rollNo} onChange={(e) => handleChange(e)} class="form-control form-control-lg" />
                                                        <label class="form-label" for="form3Example1cg">Roll No</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div data-mdb-input-init class="form-outline mb-4">
                                                        {error.mobileNoError && <span className='text-danger'>{error.mobileNoError}</span>}
                                                        <input type="text" id="mobileNo" value={data.mobileNo} onChange={(e) => handleChange(e)} class="form-control form-control-lg" />
                                                        <label class="form-label" for="form3Example1cg">Mobile No</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div data-mdb-input-init class="form-outline mb-4">
                                                {error.emailError && <span className='text-danger'>{error.emailError}</span>}
                                                <input type="email" id="email" value={data.email} onChange={(e) => handleChange(e)} class="form-control form-control-lg" />
                                                <label class="form-label" for="form3Example3cg">Your Email</label>
                                            </div>

                                            <div data-mdb-input-init class="form-outline mb-2">
                                                {error.passwordError && <span className='text-danger'>{error.passwordError}</span>}
                                                <input type={passwordVisibile ? "text" : "password"} id="password" value={data.password} onChange={(e) => handleChange(e)} class="form-control form-control-lg"
                                                />
                                                <label class="form-label" for="form3Example4cg">Password</label>
                                            </div>
                                            <div class="form-check" style={{textAlign:"left"}}>
                                                <input onChange={(e) => setPasswordVisible(e.target.checked)} class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label class="form-check-label" for="flexCheckDefault">Show Password</label>
                                            </div>

                                            <div class="d-flex justify-content-center">
                                                <button type="button" onClick={(e) => handleSubmit(e)} class="btn btn-success btn-block btn-lg gradient-custom-4 text-body mt-3">Register</button>
                                            </div>

                                            <Link to={"/userData"}>
                                                <a href="#!" class="fw-bold text-body"><u>Go To UserData</u></a>
                                            </Link>

                                            <p class="text-center text-muted mt-3 mb-0">Have already an account? <a href="#!"
                                                class="fw-bold text-body"><u>Login here</u></a></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    )
}
