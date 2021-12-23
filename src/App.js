import React, { useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import CreateIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Checkbox from "@material-ui/core/Checkbox";

const useStyle = makeStyles((theme) => ({
	containerClass: {
		width: "100",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	line: {
		lineBreak: "anywhere ",
		color: "blue",
	},
	throught: {
		textDecoration: "line-through",
		color: "Green",
	},
	hide: {
		display: "none",
	},
	unHide: {
		display: "block",
	},
	icon: {
		fontSize: "25px",
		margin: "Auto 20px",
		marginLeft: "20%",
	},
	ll: {
		maxHeight: "500px",
		overflow: "auto",
	},
	CardContnt: {
		position: "relative",
	},
	inputarea: {
		width: 330,
	},
	inputField: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	gridRoot: {
		display: "flex",
		justify: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	cardBackground: {
		// border: "1px solid black",
		// boxShadow: "4px 4px 7px 1px gray",
		// backgroundColor: "lightGray",
		boxShadow: "3px 4px 12px -2px grey",
	},
	root: {
		marginTop: "1rem",
		flexGrow: 1,
	},
	deleteHistory: {
		position: "absolute",
		padding: " 10px 7px",
		marginLeft: "75%",
		top: "10%",
		textDecoration: "none",
		color: "white",
		backgroundColor: "Blue",
	},
	completeHistory: {
		position: "absolute",
		padding: " 10px 7px",
		marginLeft: "75%",
		top: "10%",
		marginLeft: "48%",
		textDecoration: "none",
		color: "white",
		backgroundColor: "Green",
	},
	mdlBtn: {
		padding: "3px 17px",
		marginLeft: "50px",
	},
	menuBtn: {
		position: "absolute",
		padding: " 10px 7px",
		top: "4%",
		marginLeft: "38%",
		textDecoration: "none",
		color: "blue",
	},
	clearBtn: {
		marginRight: "14px",
	},
	todoHeader: {
		color: "purple",
		textDecoration: "double underLine",
		fontWeight: "bolder",
		fontSize: "20px",
	},
}));

function App() {
	const classes = useStyle();

	const [todos, setTodos] = useState([]);
	const [error, setError] = useState();
	const [count, setCount] = useState(0);
	const [delCount, setDelCount] = useState(1);
	const [compCount, setCompCount] = useState(-1);
	const [todo, setTodo] = useState({});
	const [screen, setScreen] = useState(0);
	const [history, setDelHistory] = useState([]);
	const [completeHist, setCompleteHist] = useState([]);
	const [open, setOpen] = useState(false);
	const [menu, setMenu] = useState(null);
	const [checked, setChecked] = React.useState(false);
	const [selectTodoIndex, setSelectTodoIndex] = useState();

	const onOpenModal = () => {
		setOpen(true);
	};
	const onCloseModal = () => {
		setOpen(false);
	};
	const onShowHist = () => {
		setScreen(0);
	};
	const handleClose = () => {
		setMenu(null);
	};

	const handleClick = (event) => {
		setMenu(event.currentTarget);
	};

	const handleCheckBox = (todo) => {
		let index = todos.findIndex((i) => i.id == todo.id);
		setSelectTodoIndex(index);
	};

	const completeTodo = (todo) => {
		let index = todos.findIndex((v) => v.id === todo.id);
		let localTodo = todos[index];
		localTodo = {
			...localTodo,
			status: 1,
		};
		todos.splice(index, 1, localTodo);
		setTodos([...todos]);
		setCompCount(compCount + 1);

		let arr = [...completeHist];
		arr.push(todo);
		setCompleteHist(arr);
	};

	const handleAddTodo = () => {
		if (todo.title == "") {
			setError(true);
		} else if (todo.id) {
			let index = todos.findIndex((v) => v.id === todo.id);
			todos.splice(index, 1, todo);
			setError(true);
			setTodo("");
			setTodo([...todos]);
		} else {
			addTodo();
		}
	};

	const addTodo = () => {
		let todoLocal = {
			onActive: false,
			status: 0,
			id: Math.floor(Math.random() * 10000),
			...todo,
		};
		if (todoLocal.title !== undefined && todoLocal.title !== "") {
			todos.push(todoLocal);
			setTodos([...todos]);
			setTodo({});
			setError(false);
			setCount(count + 1);
		} else {
			setError(true);
		}

		document.getElementById("focus").focus();
	};

	const editTodo = ({ id, title }) => {
		setTodo({
			id,
			title,
		});
	};

	const removeTodo = (item) => {
		const Index = [...todos].filter((i) => i.id !== item.id);
		let arr = [...history];
		arr.push(item);
		setDelHistory(arr);

		setTodos(Index);
		setCount(count - 1);
		setDelCount(delCount + 1);
	};

	const handleChange = (event) => {
		setTodo({
			...todo,
			title: event.target.value,
		});
	};
	const handleKey = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			handleAddTodo();
		}
	};
	const deleteHistory = (item) => {
		setScreen(1);

		const Index = [...history].filter((i) => i.id !== item.id);
		setDelHistory(Index);
		setDelCount(delCount - 1);
		onCloseModal();
		handleClose();
	};
	const clear = () => {
		// let Index = [];
		// setTodos(Index);
		setTodos([]);
		setCount(0);
	};

	const completeHistory = (item) => {
		setScreen(2);

		const Index = [...completeHist].findIndex((i) => i.id !== item.id);
		setCompCount(compCount + 1);
		handleClose();
	};

	const list = () => {
		return (
			<List>
				{todos.map((t, i) => {
					console.log(selectTodoIndex, i);
					let isChecked = selectTodoIndex == i;
					return (
						<ListItem key={i}>
							<Checkbox checked={selectTodoIndex == i} onChange={() => handleCheckBox(t)} />
							<ListItemText className={`${classes.line} ${t.status == 1 ? classes.throught : ""} `} primary={t.title} />
							<ListItemText
								className={`${classes.line} ${isChecked ? classes.unHide : classes.hide} `}
								primary={
									<React.Fragment>
										<CreateIcon className={classes.icon} onClick={() => editTodo(t, i)} />
										<CloseIcon className={classes.icon} onClick={() => removeTodo(t)} />
										<DoneIcon className={classes.icon} onClick={() => completeTodo(t)} />
									</React.Fragment>
								}
							/>
						</ListItem>
					);
				})}
			</List>
		);
	};

	const deleteList = () => {
		return (
			<List>
				{history.map((del, i) => {
					return (
						<ListItem key={i}>
							<ListItemText className={classes.line} primary={del.title} />
							<ListItemIcon>
								<CloseIcon onClick={onOpenModal} />
								<Modal open={open} onClose={onCloseModal} center>
									<h2>Are you sure to Delete</h2>
									<button className={classes.mdlBtn} onClick={() => deleteHistory(del)}>
										Yes
									</button>
									<button className={classes.mdlBtn} onClick={onCloseModal}>
										No
									</button>
								</Modal>
							</ListItemIcon>
						</ListItem>
					);
				})}
			</List>
		);
	};

	const completeList = () => {
		return (
			<List>
				{completeHist.map((comp, i) => {
					return (
						<ListItem key={i}>
							<ListItemText className={classes.line} primary={comp.title} />
							<ListItemIcon>
								<DoneIcon />
							</ListItemIcon>
						</ListItem>
					);
				})}
			</List>
		);
	};
	const options = ["Delete History", "Complete History"];

	return (
		<div className={classes.root}>
			<Grid container className={classes.containerClass}>
				<Grid item xs={5} sm={5} md={5} lg={5}>
					<Card className={classes.cardBackground}>
						{screen == 0 && (
							<>
								<CardContent className={classes.CardContnt}>
									<Typography className={classes.todoHeader} color='textSecondary'>
										{` ${count === 0 ? `you have ${count} todo :- ( ` : `you have ${count} todo :- ) `}`}{" "}
									</Typography>
									<div className={classes.scroll}>{list()}</div>
									<div className={classes.inputField}>
										<TextField
											className={classes.inputarea}
											error={error}
											id='focus'
											label='Add a Todo'
											value={todo.title || ""}
											variant='outlined'
											helperText={error ? "Incorrect entry." : ""}
											onChange={handleChange}
											onKeyDown={handleKey}
											autoComplete='off'
										/>
										<div>
											{/* <a  href='javascript:void(0)' >
												Clear
											</a> */}
											<Button variant='contained' className={classes.clearBtn} color='default' onClick={clear}>
												Clear
											</Button>
											<Button variant='contained' color='primary' onClick={handleAddTodo}>
												Submit
											</Button>
										</div>
									</div>
								</CardContent>
							</>
						)}

						{screen == 1 && (
							<>
								{" "}
								<CardContent>
									<ArrowBackIcon onClick={onShowHist} />
									<Typography className={classes.todoHeader} color='textSecondary'>
										{` ${delCount === 0 ? ` ${delCount} Delete todo  ` : `you have ${delCount} Delete todos `}`}{" "}
									</Typography>
									<div>{deleteList()}</div>
								</CardContent>
							</>
						)}
						{screen == 2 && (
							<>
								{" "}
								<CardContent>
									<ArrowBackIcon onClick={onShowHist} />
									<Typography className={classes.todoHeader} color='textSecondary'>
										{` ${compCount === 0 ? ` ${compCount} Complete todo  ` : `you have ${compCount} Complete todos `}`}{" "}
									</Typography>
									<div>{completeList()}</div>
								</CardContent>
							</>
						)}
						<IconButton
							className={classes.menuBtn}
							aria-label='more'
							aria-controls='long-menu'
							aria-haspopup='true'
							onClick={handleClick}
						>
							<MoreVertIcon />
						</IconButton>
						<Menu id='simple-menu' anchorEl={menu} keepMounted open={Boolean(menu)} onClose={handleClose}>
							<MenuItem onClick={deleteHistory}>Delete History</MenuItem>
							<MenuItem onClick={completeHistory}>Complete History</MenuItem>
						</Menu>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
