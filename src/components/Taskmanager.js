import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import './Dashboard'

function Taskmanager() {
  return (
    <div>
      <Row>
            <Col lg={3} className="l">
                <ul className="nav flex-column ">
                    <li className="nav-item my-3">
                        <a className="nav-link d-flex " href="#">
                           <Link to={'/'}style={{textDecoration:'none'}}>
                                {/* <i className="fa-solid fa-house-user fs-4 me-2" style={{ color: 'black' }}></i> */}
                                <img src="https://i.postimg.cc/9Qm8jGsf/home.png" alt="Home" style={{ height: '50px' }} />
                                 <p>Home</p>
                           </Link>
                        </a>
                    </li>
                    <hr className="text-white" />
                    <li className="nav-item my-3">
                        <a className="nav-link d-flex" href="#">
<Link >
                            <img src="https://i.postimg.cc/DyhMyVR5/add.png" alt="Add" style={{ height: '50px', cursor: 'pointer' }} />
    
                                 <p>Add</p>
    
</Link>
                        </a>
                    </li>
                    <hr className="text-white" />
                    <li className="nav-item my-3">
                        <a className="nav-link d-flex" href="#">
                            <i className="fa-solid fa-right-from-bracket fs-4 me-2" style={{ color: 'black' }}></i> <p>Important</p>
                        </a>
                    </li>
                    <hr className="text-white" />
                </ul>
            </Col>

            <Col lg={7}>
                <div id="banner" className="d-flex align-items-center shadow text-white">
                    <i className="fa-solid fa-bars mx-3 fa-2x ms-5"></i>
                    <h3>Welcome Admin</h3>
                </div>
                <Row>
                    <Col lg={6} className="p-5 shadow">
                        <div>{/* <AppCalender /> */}</div>
                    </Col>
                    <Col lg={6} className="p-5 shadow">
                        <div>{/* <AppChart /> */}</div>
                    </Col>
                </Row>
            </Col>

            <Col lg={2} className="p-5 shadow">
                <div>{/* <AppProfile /> */}</div>
            </Col>
        </Row>
    </div>
  )
}

export default Taskmanager
