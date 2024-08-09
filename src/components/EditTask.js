import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { GetAllTasks, UpdateTasks } from '../apiservices/api';
import { notify } from '../apiservices/utils';

function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await GetAllTasks();
                const currentTask = data.find(task => task._id === id);
                if (currentTask) {
                    setTask(currentTask);
                    setTaskName(currentTask.taskName);
                    setTaskDescription(currentTask.taskDes);
                    setTaskDate(currentTask.date);
                }
            } catch (err) {
                console.error(err);
                notify('Failed to fetch task details', 'error');
            }
        };

        fetchTask();
    }, [id]);

    const handleSave = async () => {
        if (!task) return;

        const updatedTask = {
            ...task,
            taskName,
            taskDes: taskDescription,
            date: taskDate
        };

        try {
            const { success, message } = await UpdateTasks(id, updatedTask);
            if (success) {
                notify(message, 'success');
                navigate('/imp'); // Navigate back to the important tasks page
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error');
        }
    };

    return (
        <div>
            {task && (
                <Modal show={true} onHide={() => navigate('/impo')} centered>
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
                        <Button variant="secondary" onClick={() => navigate('/impo')}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default EditTask;
