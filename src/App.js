import React, { useState } from "react";
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const useStyle = makeStyles((theme) => ({
  containerClass: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  line:{
    lineBreak :"anywhere ",
    color :"blue"
  },
  scroll:{
    maxHeight: "500px",
    overflow:"auto"
  },
  inputarea:{
    width: 280,
  },
  inputField:{
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
  cardBackground :{
    border : "1px solid black",
    boxShadow :"4px 4px 7px 1px gray",
    backgroundColor:"lightGray"
  },
  root: {
    marginTop : "1rem",
    flexGrow: 1,
  },
  deleteHistory:{
    padding : " 10px 4px",
    marginLeft : "74%",
    postion : "relative",
    top : "-5rem",
    textDecoration : "none",
    color : "white",
    backgroundColor : "Blue",
    // borderRadius : "15%"
  

  },
  mdlBtn :{
    padding : "3px 17px",
    marginLeft : "50px"
   
  },
  todoHeader: {
    color: "purple",
    textDecoration:"double underLine",
    fontWeight :"bolder",
    fontSize :"20px"
  },
}));

function App() {
  const classes = useStyle();

  const [todos, setTodos] = useState([]);
  const [error, setError] = useState();
  const [count ,setCount] = useState(0);
  const [delCount ,setDelCount] = useState(0);
  const [todo, setTodo] = useState({});
  const [showHist , setShowHist] = useState(false);
  const [history , setDelHistory] = useState([]);
  const [open , setOpen] = useState(false);

  const onOpenModal = ()=>{
    setOpen(true);
  }
  const onCloseModal = () =>{
    setOpen(false);
  }

  const handleAddTodo = () => {
    if(todo.id) {
      let index = todos.findIndex((v) =>v.id === todo.id);
      todos.splice(index,1,todo);
      setTodo("");
      setTodo([...todos])

    } else {
      addTodo()
    }
  }
  
  const addTodo = () => {
    let todoLocal = {
      id: Math.floor(Math.random() * 10000),
      ...todo
    };
    if ( todoLocal.title !== undefined && todoLocal.title !== "" ) {
      
      todos.push(todoLocal);
      setTodos([...todos]);
      setTodo({});
      setError(false);
      setCount(count + 1);
    } else {
      setError(true);
    }
    
    document.getElementById("focus").focus();
  }
  
  const removeTodo = item => {
    const Index = [...todos].filter( i => i.id !== item.id);
    setTodos(Index);
    setDelCount(delCount + 1);
    setCount(count - 1);

    let arr = history;
    arr.push(item);
    setDelHistory(arr);
   
  };
  
  const editTodo = ({id, title}) =>{

    setTodo({
        id,
        title
    })
  }
  
      const handleChange = (event) => {
        setTodo({
          ...todo,
          title: event.target.value
        })
      };
      const handleKey = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          handleAddTodo();
        }
      };
      const deleteHistory = (item) =>{
        
          setShowHist(true);

          const Index = [...history].filter( i => i.id !== item.id);
          setDelHistory(Index);
          setDelCount(delCount-1);
          onCloseModal();
      }
      
      const list = () => {
          return <List >
      {todos.map((t, i) => {
        return  <ListItem key={i}>
        <ListItemText className={classes.line} primary={t.title} />
        <ListItemIcon onClick = {()=>editTodo(t , i)}>
          <CreateIcon />
        </ListItemIcon>
        <ListItemIcon onClick = {()=>removeTodo(t)}>
          <CloseIcon  />
        </ListItemIcon>
      </ListItem>
      })}
     
    </List>
  }

  const deleteList = () => {
    return <List >
    {history.map((del, i) => {
    return  <ListItem key={i}>
    <ListItemText className={classes.line} primary={del.title} />
    <ListItemIcon  >
    <CloseIcon onClick = {onOpenModal} />
    
    <Modal open={open} onClose = {onCloseModal} center>
        <h2>Are you sure to Delete</h2>
        <button className = {classes.mdlBtn} onClick = {()=>deleteHistory(del) }>Yes</button>
        <button className = {classes.mdlBtn} onClick = {onCloseModal}>No</button>
      </Modal>
      
    
    </ListItemIcon>
    </ListItem>
})}
</List>
}
  return (
    
    <div className={classes.root}>

      <Grid
        container className={classes.containerClass}
        >
        <Grid item xs={5} sm={5} md={5} lg={4}>
          
          <Card className={classes.cardBackground} >
             { !showHist ? 
             <CardContent>
             <Typography className={classes.todoHeader} color="textSecondary"  >{` ${
               count ===0 ? `you have ${count} todo :- ( ` : `you have ${count} todo :- ) `
              }`} </Typography>
               <a className={classes.deleteHistory} href ="#" onClick={deleteHistory}> Delete History</a>
              <div className ={classes.scroll}>
                {list()}
              </div>
               <div className ={classes.inputField}>
                <TextField className={classes.inputarea}
                  error = {error}
                  id="focus"
                  label="Add a Todo"
                  value={todo.title || ''}
                  variant="outlined"
                  helperText={ error? "Incorrect entry." : ""} 
                  onChange={handleChange}
                  onKeyDown={handleKey} />
                <Button  variant="contained" color="primary" onClick={handleAddTodo} >
                  Submit
                </Button>
              </div>
            </CardContent > :
            
          <CardContent>
             <Typography className={classes.todoHeader} color="textSecondary"  >
               {` ${ count == 0 ? ` ${delCount + 1} Delete todo  ` : `you have ${count} Delete todos ` }`} </Typography>
              <div>
                {deleteList()}
              </div>
          </CardContent>}
         
          </Card>  
        </Grid>
      </Grid>
      
    </div>
  );
}

export default App;