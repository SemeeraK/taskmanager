import React, { useEffect, useState } from 'react';
import './Home.css'; 
import { Col, Row, Form, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Edit2, Trash2 } from 'react-feather';
import Card from 'react-bootstrap/Card';
import { GetAllTasks, UpdateTasks, DeleteTasks } from '../apiservices/api';
import { notify } from '../apiservices/utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Impo from '../components/Impo';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [importantTasks, setImportantTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');

    const fetchAllTasks = async () => {
        try {
            const { data } = await GetAllTasks();
            setTasks(data);
            setImportantTasks(data.filter(task => task.important));
        } catch (err) {
            console.error(err);
            notify('Failed to get all tasks', 'error');
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        let filteredTasks = tasks.filter(task =>
            task.taskName.toLowerCase().includes(term)
        );

        if (term === 'all') {
            setImportantTasks(tasks);
        } else {
            filteredTasks = tasks.filter(task =>
                task.important && task.taskName.toLowerCase().includes(term)
            );
            setImportantTasks(filteredTasks);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTasks(id);
            if (success) {
                notify(message, 'success');
                fetchAllTasks();
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
            important: !important,
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

    const handleEdit = (task) => {
        setCurrentTask(task);
        setTaskName(task.taskName);
        setTaskDescription(task.taskDes);
        setTaskDate(task.date);
        setShowEditModal(true);
    };

    const handleEditSubmit = async () => {
        if (!currentTask) return;

        const updatedTask = {
            taskName,
            taskDes: taskDescription,
            date: taskDate,
            isDone: currentTask.isDone,
            important: currentTask.important,
        };

        try {
            const { success, message } = await UpdateTasks(currentTask._id, updatedTask);
            if (success) {
                notify(message, 'success');
                fetchAllTasks();
                setShowEditModal(false);
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to update the task', 'error');
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
    };

    return (
        <div id='b' className='p-5'>
            <Row>
                <Col lg={4}>
                    <div className='p-5'>
                        <h1 id='t'>DailyMate</h1>
                        <p className='p'>
                            DailyMate is your one-stop destination for all your task management needs. Whether you're a busy professional, a student, or someone looking to organize their daily chores, TaskMate offers a seamless and intuitive way to manage your tasks and projects.
                            {/* <img src="https://i.postimg.cc/Zn60HvtV/OIP-1.jpg" alt=""  /> */}
                        </p>
                        <Link to={'/landing'} style={{textDecoration:'none'}}>
                            <button id='btn' className='btn px-5 py-3'>
                                START <i className="fa-solid fa-circle-plus fa-fade"></i>
                            </button>
                        </Link>
                    </div>
                </Col>
                <Col lg={8}>
                    <img src="https://i.postimg.cc/WbKNkssR/illustration-examples.gif" alt="" className='p-4' style={{ height: '350px' ,width:'65%'}} />
                </Col>
            </Row>
            <div>
                
            </div>

            <div>
                <h3 id='t'>Important Tasks To Remember</h3>
                <Row className="mb-3">
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Col>
                </Row>

                <Row>
                    {importantTasks.map((item) => (
                        <Col lg={4} md={6} sm={12} className="mb-4" key={item._id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>
                                        <h5>{item.taskName}</h5>
                                    </Card.Title>
                                    <Card.Text>{item.taskDes}</Card.Text>
                                    <Card.Text>Date: {formatDate(item.date)}</Card.Text>
                                    <div className="shadow d-flex justify-content-evenly p-2 text-center gap-2">
                                        <button onClick={() => handleStar(item)} className={`btn ${item.important ? 'btn-warning' : 'btn-outline-warning'}`}>
                                            <i className="fa-solid fa-star"></i>
                                        </button>
                                        <button onClick={() => handleEdit(item)} className='btn btn-primary'>
                                            <Edit2 />
                                        </button>
                                        <button onClick={() => handleDeleteTask(item._id)} className='btn btn-danger'>
                                            <Trash2 />
                                        </button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <Row className='mt-3'>
                <Col className='d-flex justify-content-end'>
                    <Link to={'/landing'}>
                        <img id='note' src="https://i.postimg.cc/k53KtxvN/OIP-removebg-preview-1.png" alt="" style={{ height: '70px' }} />
                    </Link>
                </Col>
            </Row>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

            {/* Edit Task Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTaskName">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter task name" 
                                value={taskName} 
                                onChange={(e) => setTaskName(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTaskDescription">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control 
                                type="text" 
                                as="textarea"
                                rows={3} 
                                placeholder="Enter task description" 
                                value={taskDescription} 
                                onChange={(e) => setTaskDescription(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTaskDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control 
                                type="date" 
                                placeholder="Enter task date" 
                                value={taskDate} 
                                onChange={(e) => setTaskDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]} // Set min date to today
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Home;
