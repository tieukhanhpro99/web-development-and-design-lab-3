
import './App.css';

function App() {
    return (
        <div className="page">
            <div className="profile-card">

                <div className="avatar-wrapper">
                    <img
                        src={`${import.meta.env.BASE_URL}NamKhanh.png`}
                        alt="Nam Khanh"
                        className="avatar"
                    />
                </div>

                <h2>Nam Khanh</h2>

                <h3>Computer Science Student</h3>

                <p className="description">
                    I enjoy exploring technology and building
                    interactive applications. I'm currently
                    learning React and web development.
                </p>

                <div className="skills">
                    <span>HTML</span>
                    <span>CSS</span>
                    <span>JavaScript</span>
                    <span>React</span>
                </div>

                <a
                    href="mailto:26560028@gm.uit.edu.vn"
                    className="contact-button"
                >
                    Contact me
                </a>

            </div>
        </div>
    );
}

export default App;
