import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Distributor.css'; // Import CSS file for styling

function Distributor() {
  const [listOfSp, setListofSp] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/distributor");
        setListofSp(response.data);
        setLoading(false);
      } catch (error) {
        console.error('GET Error', error);
      }
    };

    fetchData();
  }, []);

  const initialValues = {
    name: ""
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(45).required()
  });

  const onSubmit = async (data, { resetForm }) => {
    try {
      const response = await axios.post("http://localhost:3001/distributor", data);
      console.log(response.data);
      resetForm();
      window.location.reload();
    } catch (error) {
      console.error('POST Error', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Create Distributor</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ dirty, isValid }) => (
          <Form className="form">
            <div className="form-group">
              <label htmlFor="name" className="label">Name</label>
              <Field id="name" name="name" placeholder="Enter name" className="input" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <button type="submit" disabled={!dirty || !isValid} className="btn">Create Distributor</button>
          </Form>
        )}
      </Formik>

      <h1 className="title">Distributor List</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">#</th>
              <th className="table-header">Name</th>
              {/* Add additional table headers if needed */}
            </tr>
          </thead>
          <tbody>
            {listOfSp.map((item, index) => (
              <tr key={index}>
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{item.name}</td>
                {/* Add additional table cells/buttons if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Distributor;
