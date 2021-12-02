
import './footer.scss'
import React, { } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
export default function Footer() {
    const categories = useSelector(state => state.postReducer.categories)
    const hashtags = useSelector(state => state.postReducer.hashtags)
    return (
        <div className="footer">
            <div className="footer-left">
                <div className="footer-brand">
                    CHỮ QUỐC NGỮ
                </div>
            </div>
            <div className="footer-center">
                <div style={{
                    fontWeight: 600
                }}>THỂ LOẠI</div>
                <ul className="footer-links">
                    {categories.map(cate => {
                        return (
                            <li key={cate.id}>
                                <Link to={`/category/${cate.id}`}>{cate.name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="footer-right">
                <div className="footer-social-icon">
                    <a href="#"><i className="fab fa-facebook-f facebook-bg"></i></a>
                    <a href="#"><i className="fab fa-twitter twitter-bg"></i></a>
                    <a href="#"><i className="fab fa-google-plus-g google-bg"></i></a>
                </div>
                <div className="contact-us">
                    <h4>Contact Us</h4>
                    {/* <form>
                        <label for="name">Name</label>
                        <input type="text" id="fname" name="name" placeholder="Your name" />
                        <label for="name">Email</label>
                        <input type="text" id="email" name="email" placeholder="Email" />
                        <label for="title">Title</label>
                        <input type="text" id="title" name="title" placeholder="Title" />
                        <label for="subject">Content</label>
                        <textarea id="subject" name="subject" placeholder="Write something.." style={{ height: '170px' }}></textarea>
                        <input type="submit" value="Submit"></input>
                    </form> */}

                </div>
            </div>
        </div>
    )
}
