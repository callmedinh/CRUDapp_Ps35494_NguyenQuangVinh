import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './User.css'; // Import CSS file for styling

function User() {
  const [listOfSp, setListofSp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user");
        setListofSp(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().min(3).max(45).required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required')
  });

  const handleSubmit = async (data, { resetForm }) => {
    try {
      const response = await axios.post("http://localhost:3001/user", data);
      setListofSp(prevList => [...prevList, response.data]);
      resetForm();
    } catch (error) {
      console.error('POST Error', error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/user/${id}`);
      setListofSp(prevList => prevList.filter(user => user._id !== id));
    } catch (error) {
      console.error('DELETE Error', error);
    }
  }

  return (
    <div className="container">
      <h1 className="title">User Management</h1>
      <div className="user-container">
        <div className="user-form">
          <h2>Create User</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <Field id="fullname" name="fullname" type="fullname" placeholder="Enter Full Name" />
                <ErrorMessage name="fullname" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" type="email" placeholder="Enter Email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field id="password" name="password" type="password" placeholder="Enter Password" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Field id="phone" name="phone" type="phone" placeholder="Enter Phone Number" />
                <ErrorMessage name="phone" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Field id="address" name="address" type="address" placeholder="Enter Address" />
                <ErrorMessage name="address" component="div" className="error-message" />
              </div>
              <button type='submit' className="submit-button">Create User</button>
            </Form>
          </Formik>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}

        <div className="user-list">
          <h2>User List</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listOfSp.map((user, index) =>
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>
                    <button className="edit-button"><a href={`/edituser/${user._id}`}>Update</a></button>
                    <button onClick={() => handleDelete(user._id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;
