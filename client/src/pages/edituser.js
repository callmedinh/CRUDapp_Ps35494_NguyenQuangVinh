import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import './EditU.css'; // Import CSS file for styling

async function updateUser(userApi, object) {
  try {
    await axios.put(userApi, object);
  } catch (error) {
    console.error('Put Error:', error);
    throw error; // Propagate error for proper error handling
  }
}

async function fetchUser(courseApi) {
  try {
    const response = await axios.get(courseApi);
    return response.data;
  } catch (error) {
    console.error('GET Error:', error);
    throw error; // Propagate error for proper error handling
  }
}

function EditU() {
  const { id } = useParams();
  const [inputdata, setInputdata] = useState({ fullname: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserById = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:3001/user/${id}`;
        const user = await fetchUser(url);
        setInputdata(user);
      } catch (error) {
        // Handle error (show error message, redirect, etc.)
      } finally {
        setLoading(false);
      }
    };
    fetchUserById();
  }, [id]);

  const handleData = (e) => {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Confirm updating user information!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willUpdate) => {
      if (willUpdate) {
        try {
          const url = `http://localhost:3001/edituser/${id}`;
          await updateUser(url, inputdata);
          swal({
            title: "Update successful!",
            icon: "success",
          });
          setTimeout(() => {
            window.location.href = '/user';
          }, 2000);
        } catch (error) {
          console.error(error);
          swal({
            title: "Update failed!",
            text: "Please try again later.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="edit-user-container">
      <h1>Edit User</h1>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input type='text' name='fullname' value={inputdata.fullname} onChange={handleData} className="input-field"></input>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type='text' name='phone' value={inputdata.phone} onChange={handleData} className="input-field"></input>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type='text' name='address' value={inputdata.address} onChange={handleData} className="input-field"></input>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
}

export default EditU;
