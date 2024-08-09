import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Form, Modal } from 'react-bootstrap';
import { Edit2, Star, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateTask, DeleteTasks, GetAllTasks, UpdateTasks } from '../apiservices/api';
import { notify } from '../apiservices/utils';

function Dashboard() {
    const [input, setInput] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copytask, setCopyTask] = useState([]);
    const [importantTasks, setImportantTasks] = useState([]);
    const [show, setShow] = useState(false);
    const [updateTask, setUpdateTask] = useState(null);

    const handleClose = () => {
        setShow(false);
        setUpdateTask(null);
        setInput('');
        setTaskDescription('');
        setTaskDate('');
    };
    
    const handleShow = () => setShow(true);

    const handleTask = async () => {
        if (updateTask) {
            const obj = {
                taskName: input,
                taskDes: taskDescription,
                date: taskDate,
                isDone: updateTask.isDone,
                important: updateTask.important
            };

            try {
                const { success, message } = await UpdateTasks(updateTask._id, obj);
                if (success) {
                    notify(message, 'success');
                    fetchAllTasks();
                    handleClose();
                } else {
                    notify(message, 'error');
                }
            } catch (err) {
                console.error(err);
                notify('Failed to update task', 'error');
            }
        } else {
            const obj = {
                taskName: input,
                isDone: false,
                taskDes: taskDescription,
                date: taskDate,
                important: false
            };
            try {
                const { success, message } = await CreateTask(obj);
                if (success) {
                    notify(message, 'success');
                    fetchAllTasks();
                    handleClose();
                } else {
                    notify(message, 'error');
                }
            } catch (err) {
                console.error(err);
                notify('Failed to create task', 'error');
            }
        }
    };

    const fetchAllTasks = async () => {
        try {
            const { data } = await GetAllTasks();
            setTasks(data);
            setCopyTask(data); // Save the original task list
            setImportantTasks(data.filter(task => task.important));
        } catch (err) {
            console.error(err);
            notify('Failed to get all tasks', 'error');
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

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

    const handleCheck = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: !isDone,
        };
        try {
            const { success, message } = await UpdateTasks(_id, obj);
            if (success) {
                notify(message, 'success');
                fetchAllTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to update the task', 'error');
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

    const handleEditTask = (item) => {
        setUpdateTask(item);
        setInput(item.taskName);
        setTaskDescription(item.taskDes);
        setTaskDate(item.date);
        handleShow();
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        if (term) {
            const result = copytask.filter((item) => item.taskName.toLowerCase().includes(term));
            setTasks(result);
        } else {
            setTasks(copytask); // Reset to original task list if search is cleared
        }
    };

    const formatDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
    };

    return (
        <div id="b" className="container-fluid">
            <Row>
                <Col lg={3} className="p-4">
                    <ul className="nav flex-column">
                        <li className="nav-item my-3 d-flex">
                            <Link to="/" className="nav-link ">
                                <img
                                    src="https://i.postimg.cc/5tGM7ZxG/home.png"
                                    alt=""
                                    style={{ height: '30px', cursor: 'pointer' }}
                                />
                                <p className="ms-2 text-black">Home</p>
                            </Link>
                        </li>
                        <hr className="text-white" />
                        <li className="nav-item my-3 d-flex">
                            <img
                                onClick={handleShow}
                                src="https://i.postimg.cc/DyhMyVR5/add.png"
                                alt="Add"
                                style={{ height: '30px', cursor: 'pointer' }}
                            />
                            <p className="ms-2">Add</p>
                        </li>
                        <hr className="text-white" />
                        <li className="nav-item my-3 d-flex">
                            <Link to={'/imp'} style={{ textDecoration: 'none' }}>
                                <img src="https://i.postimg.cc/9M4jB0fd/pin.png" alt="" style={{ height: '30px' }} />
                                <p className="ms-2">Important</p>
                            </Link>
                        </li>
                        <hr className="text-white" />
                        <li className="nav-item my-3 d-flex">
<Link to={'/cmp' }style={{textDecoration:'none'}}>
                                <img src="https://i.postimg.cc/1XV7BGzb/checked.png" alt="" style={{ height: '30px' }} />
                                <p className="ms-2">Completed</p>
    
</Link>
                        </li>


                        <hr className="text-white" />
                        <li className="nav-item my-3 d-flex">
                            <input onChange={handleSearch} type="text" className="form-control" placeholder="Search" />
                            <img src="https://i.postimg.cc/52pGGw2C/search.png" alt="" style={{ height: '30px' }} />
                        </li>

                    </ul>
                </Col>

                <Col lg={9} className="p-4">
                    <div id="banner" className="d-flex align-items-center shadow mb-4 p-2">
                        {/* <i className="fa-solid fa-bars mx-3 fa-2x ms-5"></i> */}
                        <h3>Welcome To DailyMate</h3>
                    </div>

                    <h4>All Tasks</h4>
                    <Row>
                        {tasks.map((item) => (
                            <Col lg={4} md={6} sm={12} className="mb-4" key={item._id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>
                                            <span className={item.isDone ? 'text-decoration-line-through' : ''}>
                                                <h5>{item.taskName}</h5>
                                            </span>
                                        </Card.Title>
                                        <Card.Text>{item.taskDes}</Card.Text>
                                        {/* <Card.Text>{item.category}</Card.Text> */}

                                        <Card.Text>Date: {formatDate(item.date)}</Card.Text>

                                        <div className="shadow d-flex justify-content-evenly p-2 text-center gap-2">
                                            <button className="btn btn-success">
                                                <i onClick={() => handleCheck(item)} className="fa-solid fa-square-check"></i>
                                            </button>
                                            <button onClick={() => handleStar(item)} className={`btn ${item.important ? 'btn-warning' : 'btn-outline-warning'}`}>
                                                <i className={`fa-solid fa-star`}></i>
                                            </button>
                                            <button onClick={() => handleDeleteTask(item._id)} className="btn btn-danger">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                            <button onClick={() => handleEditTask(item)} className="btn btn-primary">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{updateTask ? 'Update Task' : 'Add Task'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTaskName">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter task name" value={input} onChange={(e) => setInput(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTaskDescription">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control type="text"  as="textarea"
                                rows={3} placeholder="Enter task description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="formTaskCategory"> */}
    {/* <Form.Label>Category</Form.Label>
    <Form.Control
        as="select"
        // value={category}
        // onChange={(e) => setCategory(e.target.value)}
    >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Birthday">Birthday</option>
        <option value="Other">Other</option>
    </Form.Control>
</Form.Group> */}


                        <Form.Group className="mb-3" controlId="formTaskDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter task date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} min={new Date().toISOString().split('T')[0]}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleTask}>
                        {updateTask ? 'Update Task' : 'Add Task'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div>
    );
}

export default Dashboard;
