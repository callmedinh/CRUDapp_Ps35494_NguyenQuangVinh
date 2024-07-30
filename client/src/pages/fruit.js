import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './Fruit.css'; // Import CSS file for styling

function Fruit() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [disId, setDisId] = useState('');
    const [listOfDis, setListOfDis] = useState([]);
    const [listOfFruits, setListOfFruit] = useState([]);

    async function updateFruit(fruitApi, object) {
        try {
            await axios.put(fruitApi, object);
        } catch (error) {
            console.error('PUT Error:', error);
            throw error; // Propagate error for proper error handling
        }
    }

    useEffect(() => {
        const fetchDistributors = async () => {
            try {
                const response = await axios.get("http://localhost:3001/distributor");
                setListOfDis(response.data);
                setDisId(response.data[0]._id);
            } catch (error) {
                console.error("Error fetching distributors:", error);
            }
        };
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/fruit");
                setListOfFruit(response.data);
            } catch (error) {
                console.error('GET Error', error);
            }
        }
        fetchDistributors();
        fetchData();
    }, []);

    const handleAdd = async () => {
        if (name === '' || quantity === '' || price === '' || status === '' || disId === '') {
            swal({
                title: "Thêm mới thất bại",
                text: "Vui lòng điền đầy đủ thông tin",
                icon: "error",
            });
            return;
        }

        swal({
            title: "Xác nhận",
            text: "Xác nhận thêm mới sản phẩm",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (will) => {
                if (will) {
                    try {
                        const data = {
                            name, quantity, price, status, id_distributor: disId
                        };
                        await axios.post("http://localhost:3001/fruit/", data);
                        swal({
                            title: "Thêm mới thành công",
                            icon: "success",
                        });
                    } catch (error) {
                        console.error("Error adding new fruit:", error);
                        swal({
                            title: "Thêm mới thất bại",
                            icon: "error",
                        });
                    }
                }
            });
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/fruit/${id}`);
            setListOfFruit(prevList => prevList.filter(fruit => fruit._id !== id));
            swal({
                title: "Xóa thành công",
                icon: "success",
            });
        } catch (error) {
            console.error('DELETE Error', error);
            swal({
                title: "Xóa thất bại",
                icon: "error",
            });
        }
    };
    const handleUpdate = async (id) => {
        try {
            const data = {
                name, quantity, price, status, id_distributor: disId
            };
            await axios.put(`http://localhost:3001/fruit/${id}`, data);
            swal({
                title: "Cập nhật thành công",
                icon: "success",
            });
        } catch (error) {
            console.error('PUT Error', error);
            swal({
                title: "Cập nhật thất bại",
                icon: "error",
            });
        }
    }

    return (
        <div className="container">
            <div className="form-container">
                <h2>Add New Fruit</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type='text' id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input type='number' id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity:</label>
                        <input type='number' id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <input type='text' id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="distributor">Distributor:</label>
                        <select id="distributor" value={disId} onChange={(e) => setDisId(e.target.value)}>
                            {listOfDis.map((item, index) => <option key={index} value={item._id}>{item.name}</option>)}
                        </select>
                    </div>
                    <button type='button' onClick={handleAdd}>Add</button>
                </form>
            </div>

            <div className="table-container">
                <h2>List of Fruits</h2>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfFruits.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button className='edit-button'><a href={`./editfruit/${item._id}`}>Update</a></button>
                                    <button onClick={() => handleDelete(item._id)} className='delete-button'>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Fruit;
