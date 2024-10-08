import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Userdata() {


    const [newData, setNewdata] = useState([]);
    const [error, setError] = useState(false);
    const [spinner, setSpinner] = useState(false);
    let navigate = useNavigate();


    function loadData() {
        axios.get("https://6607c541a2a5dd477b136715.mockapi.io/InfoSonicTask")
            .then((res) => {
                console.log(res.data);
                setNewdata(res.data);
                setSpinner(true)
            }).catch((err) => {
                setError("Unable To Product Fetch Data")
            })
    };

    useEffect(() => {
        loadData();
    }, []);

    const notifyDelete = () => {
        toast.error('Deleted Successfully!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    function handleDelete(e, id) {
        e.preventDefault();
        axios.delete("https://6607c541a2a5dd477b136715.mockapi.io/InfoSonicTask/" + id)
            .then((res) => {
                console.log(res.data);
                loadData();
                // alert("data deleted successfully")
                notifyDelete()
            })
    };



    return (
        <div>

            <div className="container mt-5">
                <div className='text-end my-3 mx-2'>
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn    btn-primary me-2"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Download as XLS"
                    />
                    <Link to={"/"}>
                    <button className='btn btn-success'>SignUp</button>
                    </Link>
                </div>
                <div className="card shadow">
                    <div className="card-body">
                        {
                            spinner
                                ?
                                <table className="table table-hover" id="table-to-xls">
                                    <thead style={{ backgroundColor: "#88c8bc" }}>
                                        <tr>
                                            <th scope="col">Sr.No.</th>
                                            <th scope="col">Roll No</th>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Mobile NO</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Password</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            newData.map((eachData, i) => {
                                                return (
                                                    <tr className='text-center' key={i} >
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{eachData.rollNo}</td>
                                                        <td>{eachData.firstName}</td>
                                                        <td>{eachData.lastName}</td>
                                                        <td>{eachData.mobileNo}</td>
                                                        <td>{eachData.email}</td>
                                                        <td>{eachData.password}</td>
                                                        <td>
                                                            <Link to={"/" + eachData.id}>
                                                                <button className='btn btn-primary me-2'><i className="fa-regular fa-pen-to-square"></i></button>
                                                            </Link>

                                                            <button onClick={(e) => handleDelete(e, eachData.id)} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                                                        </td>
                                                    </tr>

                                                )
                                            })

                                        }


                                    </tbody>
                                </table>
                                :

                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                    <div className="spinner-border text-info" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}
