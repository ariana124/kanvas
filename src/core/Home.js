import React from 'react';
import Posts from '../post/Posts';


const Home = () => (
    <div>
        <div className="jumbotron text-center">
            <h2>Welcome to Kanvas</h2>
            <br/>
            <p style={{ fontFamily: `sans serif` }}>
                <i>
                    Picture your career like a painting, not a ladder. <br/>
                    It's something that takes time and patience.
                </i>
            </p>
        </div>
        <div className="container">
            <Posts />
        </div>
    </div>
)

export default Home;
