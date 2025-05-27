import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./About.css";
import hrImage from "../assets/hr.jpg";


const About = () => {
  return (
    <>
<body>
    <div class="container">
    <div className="hero-image">
          <img src={hrImage} alt="HR Management" />
        </div>
        <section class="about-section">
            <h2 class="section-title">About the App</h2>
            <div class="about-content">
                <p class="about-text">
                    Welcome to the HR Management App! The app is designed to help you manage human resources in your
                    organization more efficiently. Whether you’re managing employee records, payroll, attendance,
                    recruitment, or performance reviews, This app makes it easy to automate and streamline these
                    processes.
                </p>
                <p class="about-text">
                    With a user-friendly interface, the HR Management App simplifies complex HR tasks, saving time and
                    effort while ensuring compliance with labor laws and company policies. Say goodbye to manual paperwork and
                    embrace the future of HR management with our all-in-one platform.
                </p>
            </div>

            <h2 class="section-title">Key Features</h2>
            <div class="features">
                <div class="feature-card">
                    <h3>Employee Management</h3>
                    <p>Effortlessly track and manage employee information, roles, and performance.</p>
                </div>
                <div class="feature-card">
                    <h3>Payroll & Compensation</h3>
                    <p>Automate salary calculations, generate payslips, and manage bonuses with ease.</p>
                </div>
                <div class="feature-card">
                    <h3>Leave & Attendance</h3>
                    <p>Track employee attendance and leave requests for seamless management.</p>
                </div>
                <div class="feature-card">
                    <h3>Recruitment & Onboarding</h3>
                    <p>Post job openings, track applicants, and onboard new employees efficiently.</p>
                </div>
                <div class="feature-card">
                    <h3>Performance Management</h3>
                    <p>Conduct performance reviews and set goals to help your employees thrive.</p>
                </div>
                <div class="feature-card">
                    <h3>Analytics & Reporting</h3>
                    <p>Generate reports to track HR metrics and make data-driven decisions.</p>
                </div>
            </div>
        </section>
    </div>
</body>
    </>
  );
};

export default About;