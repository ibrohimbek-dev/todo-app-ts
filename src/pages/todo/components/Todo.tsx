/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { IData } from "../pages/index";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

import styles from "./todo.module.css";
import redDeleteIcon from "../assets/delete.png";
import houseIcon from "../assets/house.png";
import restoreIcon from "../assets/restore.png";

const Todo = (): JSX.Element => {
	const uniqueId: string = uuidv4();

	const [title, setTitle] = useState<string>();
	const [arr, setArr] = useState<IData[]>([]);
	const [btnEffect, setBtnEffect] = useState(false);

	const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
      
	};

	const handleSubmit = (): void => {
		const hour = new Date().getHours();
		const minute = new Date().getMinutes();
		const second = new Date().getSeconds();

		// Date:
		const day = new Date().getDate();
		const month = new Date().getMonth() + 1;
		const year = new Date().getFullYear();

		function addLeadingZero(number: number) {
			return number < 10 ? "0" + number : number.toString();
		}

		const currentTime = `${addLeadingZero(hour)}:${addLeadingZero(
			minute
		)}:${addLeadingZero(second)}`;

		const currentDate = `${year}-${addLeadingZero(month)}-${addLeadingZero(
			day
		)}`;

		if (!title?.length) return alert("Fill the field!");

		const newData = {
			title: title,
			id: uniqueId,
			time: currentTime,
			date: currentDate,
			description: "description",
		};
		setArr([...arr, newData]);
		// Save the updated array to local storage
		localStorage.setItem("todoData", JSON.stringify([...arr, newData]));
		setTitle("");		
	};

	const deleteHandler = (idToDelete: string): void => {
		// Filter the array to exclude the item with the specified id
		const updatedArr = arr.filter((item) => item.id !== idToDelete);
		setArr(updatedArr);
		localStorage.setItem("todoData", JSON.stringify(updatedArr));
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === "Enter") {
			handleSubmit();
			setBtnEffect(true);

			setTimeout(() => {
				setBtnEffect(false);
			}, 200);
		}
	};

	useEffect(() => {
		// Retrieve data from local storage when the component mounts
		const savedData = localStorage.getItem("todoData");
		if (savedData) {
			setArr(JSON.parse(savedData));
		}
	}, []);

	return (
		<div className={styles.todo}>
			<h1 className={styles.title}>App Todo</h1>

			<input
				value={title}
				onChange={changeHandler}
				className={styles.input}
				onKeyDown={handleKeyPress}
				placeholder="Plan your day!"
				autoFocus
			/>

			<div className={styles.btnContainer}>
				<button
					onClick={handleSubmit}
					type="submit"
					className={`${styles.button} ${btnEffect ? styles.btnEffect : ""}`}
				>
					Add Todo
				</button>
				<Link to="/home">
					<img src={houseIcon} alt="house icon" />
				</Link>

				<img onClick={() => setTitle("")} src={restoreIcon} alt="restore icon" />
			</div>

			<div className={styles.card}>
				{arr.map((todoData) => (
					<div key={todoData.id} className={styles.cardItem}>
						<div className={styles.cardItemTitleContainer}>
							<div className={styles.cardItemTitle}>{todoData.title}</div>
							<img
								src={redDeleteIcon}
								alt="delete icon"
								className={styles.cardItemDel}
								onClick={() => deleteHandler(todoData.id)}
							/>
						</div>
						<div className={styles.cardItemTime}>
							<div>{todoData.date}</div>
							<div>{todoData.time}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Todo;
