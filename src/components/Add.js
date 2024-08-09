import React from 'react'
import { Col, Row } from 'react-bootstrap'

function Add() {
  return (
    <div>
<Row>
            <Col>
                <div className='shadow p-3'>
                                    <div className='d-flex align-items-center'>
                                        <img src="https://i.postimg.cc/25nFXm5b/file-1.png" alt="File" style={{ height: '50px' }} />
                                        <input type="text" className='form-control ms-2' placeholder='Search by task name' />
                                    </div>
                                </div>
            </Col>
    
</Row>      
    </div>
  )
}

export default Add
