import React, { useEffect, useState } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import { GetAllTasks } from '../apiservices/api';
import { notify } from '../apiservices/utils';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';

function Compl() {
    const [completedTasks, setCompletedTasks] = useState([]);

    const fetchCompletedTasks = async () => {
        try {
            const { data } = await GetAllTasks();
            const completed = data.filter(task => task.isDone); // Filter tasks that are completed
            setCompletedTasks(completed);
        } catch (err) {
            console.error(err);
            notify('Failed to fetch completed tasks', 'error');
        }
    };

    useEffect(() => {
        fetchCompletedTasks();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
    };

    return (
        <div id='b' className="container-fluid">
            <Row>
                <Col lg={12} className="p-4">
                    <h4>Completed Tasks</h4>
<Link to={'/landing'} style={{textDecoration:'none'}}>
                        <p id='t' className='btn px-5 py-3' >
                          <ArrowLeft></ArrowLeft>  Go Back to previous page
                        </p>
    
</Link>
                    <Row>
                        {completedTasks.map((item) => (
                            <Col lg={4} md={6} sm={12} className="mb-4" key={item._id}>
                                <Card id='bb' style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>
                                            <span className="text-decoration-line-through">
                                                <h5>{item.taskName}</h5>
                                            </span>
                                        </Card.Title>
                                        <Card.Text>{item.taskDes}</Card.Text>
                                        <Card.Text>Date: {formatDate(item.date)}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Compl;
