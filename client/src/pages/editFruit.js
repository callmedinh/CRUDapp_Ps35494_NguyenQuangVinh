import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory, useParams } from 'react-router-dom'; // Import useHistory and useParams from react-router-dom
import './EditFruit.css'; // Import CSS file for styling

function EditFruit() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [disId, setDisId] = useState('');
    const [listOfDis, setListOfDis] = useState([]);
    const history = useHistory(); // Initialize useHistory hook
    const { id } = useParams(); // Get id parameter from URL

    useEffect(() => {
        const fetchFruit = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/fruit/${id}`);
                const { name, quantity, price, status, id_distributor } = response.data;
                setName(name);
                setQuantity(quantity);
                setPrice(price);
                setStatus(status);
                setDisId(id_distributor);
            } catch (error) {
                console.error("Error fetching fruit data:", error);
            }
        };
        fetchFruit();
    }, [id]); // Add id as a dependency

    useEffect(() => {
        const fetchDistributors = async () => {
            try {
                const response = await axios.get("http://localhost:3001/distributor");
                setListOfDis(response.data);
            } catch (error) {
                console.error("Error fetching distributors:", error);
            }
        };
        fetchDistributors();
    }, []);

    const handleUpdate = async () => {
        if (name === '' || quantity === '' || price === '' || status === '' || disId === '') {
            swal({
                title: "Update Failed",
                text: "Please fill in all fields",
                icon: "error",
            });
            return;
        }

        swal({
            title: "Confirm Update",
            text: "Are you sure you want to update this fruit?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willUpdate) => {
                if (willUpdate) {
                    try {
                        const data = {
                            name, quantity, price, status, id_distributor: disId
                        };
                        await axios.put(`http://localhost:3001/fruit/${id}`, data);
                        swal({
                            title: "Update Successful",
                            icon: "success",
                        });
                        history.push('/fruit'); // Redirect to the fruits page after successful update
                    } catch (error) {
                        console.error("Error updating fruit:", error);
                        swal({
                            title: "Update Failed",
                            icon: "error",
                        });
                    }
                }
            });
    };

    return (
        <div className="edit-fruit-container">
            <h2>Edit Fruit</h2>
            <div className="form-container">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type='text' id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type='number' id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input type='number' id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <input type='text' id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="distributor">Distributor</label>
                        <select id="distributor" value={disId} onChange={(e) => setDisId(e.target.value)}>
                            {listOfDis.map((item, index) => <option key={index} value={item._id}>{item.name}</option>)}
                        </select>
                    </div>
                    <button type='button' className="btn-update" onClick={handleUpdate}>Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditFruit;
