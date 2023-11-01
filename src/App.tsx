import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/components/Home";
import Todo from "./pages/todo/components/Todo";

function App() {
	return (
		<BrowserRouter>
			<main>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/todo" element={<Todo />} />
					<Route path="*" element={<Navigate to="/home" replace />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
