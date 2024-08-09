import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'react-feather';
import './Footer.css'; // Make sure to create this CSS file for styling

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white pt-5 pb-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5>About Us</h5>
                        <p>
                            DailyMate is your ultimate task management tool. Whether you're managing personal tasks or team projects, our platform is designed to keep you organized and productive.
                        </p>
                    </div>
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className=""><p>Home</p></Link></li>
                            {/* <li><Link to="/add" className="text-white">Add Task</Link></li> */}
                            <li><Link to="/imp" className=""><p>Important Tasks</p></Link></li>
                            <li><Link to="/contact" className=""><p>Contact Us</p></Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5>Contact Us</h5>
                        <p>Email: <a href="mailto:info@dailymate.com" className="">info@dailymate.com</a></p>
                        <p>Phone: <a href="tel:+1234567890" className="">+123 456 7890</a></p>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5>Follow Us</h5>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className=" mx-2">
                                <Facebook size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className=" mx-2">
                                <Twitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className=" mx-2">
                                <Instagram size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className=" mx-2">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>&copy; {new Date().getFullYear()} DailyMate. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
