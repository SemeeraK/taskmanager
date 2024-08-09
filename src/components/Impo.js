import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Button } from 'react-bootstrap';
import { Star, Trash2, Edit2, CheckCircle, Home, ArrowLeft } from 'react-feather';
import { GetAllTasks, DeleteTasks, UpdateTasks } from '../apiservices/api';
import { notify } from '../apiservices/utils';
import { Link, useNavigate } from 'react-router-dom';

function Impo() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const fetchAllTasks = async () => {
        try {
            const { data } = await GetAllTasks();
            const importantTasks = data.filter(task => task.important);
            setTasks(importantTasks);
        } catch (err) {
            console.error(err);
            notify('Failed to get important tasks', 'error');
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []); // Empty dependency array to run only once on component mount

    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTasks(id);
            if (success) {
                notify(message, 'success');
                fetchAllTasks(); // Refresh the list of important tasks
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to delete the task', 'error');
        }
    };

    const handleStar = async (item) => {
        const { _id, important, taskName, taskDes, isDone, date } = item;
        const updatedTask = {
            taskName,
            taskDes,
            date,
            isDone,
            important: !important
        };
        try {
            const { success, message } = await UpdateTasks(_id, updatedTask);
            if (success) {
                notify(message, 'success');
                fetchAllTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to mark task as important', 'error');
        }
    };

    const handleCheck = async (item) => {
        const { _id, isDone, taskName, taskDes, date, important } = item;
        const updatedTask = {
            taskName,
            taskDes,
            date,
            isDone: !isDone,
            important
        };
        try {
            const { success, message } = await UpdateTasks(_id, updatedTask);
            if (success) {
                notify(message, 'success');
                fetchAllTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to mark task as completed', 'error');
        }
    };

    const handleEditTask = (item) => {
        navigate(`/edit/${item._id}`);
    };

    return (
        <div id="b" className="container-fluid">
            <Row className="mb-4">
                <Col lg={12} className="p-4 d-flex justify-content-between align-items-center">
                    <h4>Important Tasks</h4>
                    <div className='d-flex'>
                        <p id='t' className='btn px-5 py-3' onClick={() => navigate('/')} variant="outline-primary">
                            <Home /> Go Back to Home
                        </p>
                        <Link to={'/landing'} style={{textDecoration:'none'}}>
                            <p id='t' className='btn px-5 py-3'>
                                <ArrowLeft /> Go Back to previous page
                            </p>
                        </Link>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col lg={12} className="p-4">
                    <Row>
                        {tasks.length > 0 ? (
                            tasks.map((item) => (
                                <Col lg={4} md={6} sm={12} className="mb-4" key={item._id}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title>
                                                <span className={item.isDone ? 'text-decoration-line-through' : ''}>
                                                    {item.taskName}
                                                </span>
                                            </Card.Title>
                                            <Card.Text>{item.taskDes}</Card.Text>
                                            <div className="shadow d-flex justify-content-evenly p-2 text-center gap-2">
                                                <button className="btn btn-success" onClick={() => handleCheck(item)}>
                                                    <CheckCircle />
                                                </button>
                                                <button className={`btn ${item.important ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => handleStar(item)}>
                                                    <Star />
                                                </button>
                                                <button onClick={() => handleDeleteTask(item._id)} className="btn btn-danger">
                                                    <Trash2 />
                                                </button>
                                                <button onClick={() => handleEditTask(item)} className="btn btn-primary">
                                                    <Edit2 />
                                                </button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p>No important tasks found.</p>
                        )}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Impo;
