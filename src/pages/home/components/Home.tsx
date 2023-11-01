// Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
	return (
		<div className="home-container">
			<div className="home-child">
				<h1 className="home-title">Welcome to Your Todo App</h1>
				<p className="home-description">
					Organize your tasks and get things done!
				</p>
				<Link to="/todo" className="get-started-link">
					<button className="get-started-button">Get Started</button>
				</Link>
			</div>
		</div>
	);
};

export default Home;
