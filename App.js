/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  FlatList,
  Alert,



} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';



const App = () => {


  const COLORS = { primary: "#1f145c", white: "#fff" };
  const myIcon = <Icon name="delete" size={30} color="red" />

  const [textInput, setTextInput] = useState('');
  const [editId,setEditId] = useState('');
  const [todos, setTodos] = useState([
    //  { id: 1, task: "First Todo", completed: false },
    // { id: 2, task: "Second Todo", completed: false },
    // { id: 3, task: "First Todo", completed: true },
    // { id: 4, task: "Second Todo", completed: true },

  ]);

 
 const ListItem = ({ todo }) => {
    return <View style={styles.ListItem}>
      <View style={{ flex: 1, }}>
        
        <Text style={
          {
            color: "black",
            fontSize: 16,
            fontWeight: "bold",
            textDecorationLine: todo?.completed ? 'line-through' : 'none',
          }
        } >
                    {todo?.task}
        </Text>
      </View>
      {
        !todo?.completed && (
          <>
            <TouchableOpacity onPress={()=>DoneTodo(todo?.id)} style={styles.actionIcon}><Text style={{ fontSize: 13, fontWeight: "bold", color: "white" }}>Done</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>editTodo(todo?.id)} style={styles.EditIcon}><Text style={{ fontSize: 13, fontWeight: "bold", color: "white" }}>Edit</Text></TouchableOpacity>

          </>

        )
      }
      <TouchableOpacity onPress={()=>deleteTodo(todo?.id)} style={styles.DeleteIcon}><Text style={{ fontSize: 13, fontWeight: "bold", color: "white" }}>Delete</Text></TouchableOpacity>


    </View>


  }

  

  const addTodo = () => {
    console.log(textInput);
    const newTodo = {
      id:Math.random(),
      task:textInput,
      completed:false,
    };
 
    if(textInput==""){
     Alert.alert("Error", "Please enter todo !");
    } 
    
    else{
      setTodos([...todos, newTodo]);
      setTextInput('');
    }
    
    //   else if(textInput){
    //   setTodos(
    //     todos.map((todos)=>{
    //       if(todos.id === editId ){
    //         return {...todos,task:textInput}
    //       }
    //       return todos;
    //     })
    //   )



    // }
   

  }

  const DoneTodo = (todoId)=>{
    const newTodo = todos.map((item)=>{
      if(item.id == todoId){
        return{...item,completed:true}
      }
      return item;
    })
    setTodos(newTodo); 
  };

  const deleteTodo=(todoId)=>{
      const newTodo = todos.filter(item=> item.id != todoId)
      setTodos(newTodo);

  };

  const clearAll=()=>{
    Alert.alert('Confirm', 'Clear All todos ?',[
      {
        text:"No",
      },
      {
        text:"Yes",
        onPress:()=> setTodos([]),

      }
    ])
    
  };
  
  const editTodo=(todoId)=>{
    let newTodo = todos.find((elem)=>{
      return elem.id === todoId;
    });
    console.log(newTodo);
    //setEditId(newTodo.id)
    setTextInput(newTodo.task);
    setEditId(newTodo.id)
    console.log(editId)
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header Component */}
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: COLORS.primary,textDecorationLine:"underline" }} >TODO APP</Text>
        <View style={{backgroundColor:"#1f145c", width:100,height:30,justifyContent:"center",alignItems:"center",borderRadius:10,elevation:40}} ><Text onPress={clearAll} style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>Clear All</Text></View>
      </View>
      {/* todo rendering */}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100, }}
        data={todos}
        renderItem={({ item }) => <ListItem todo={item} />}
      />

      {/* Footer Compnent */}

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput style={{ fontSize: 16 }} placeholderTextColor={"black"} color="black" placeholder='Add Todo'
            value={textInput}
            onChangeText={text => setTextInput(text)}
          />
        </View>
        {/* add todo Component */}
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    color: "white",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: "white",
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 30,
    borderRadius: 30,
    paddingHorizontal: 20,


  },
  iconContainer: {
    height: 50,
    width: 70,
    backgroundColor: "#1f145c",
    borderRadius: 15,
    elevation: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  ListItem: {
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    elevation: 40,
    borderRadius: 7,
    marginVertical: 10,
    backgroundColor: "white",

  },
  actionIcon: {
    height: 25,
    width: 50,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    elevation: 20,
    borderRadius: 8,
    marginLeft: 5,

  },
  EditIcon: {
    height: 25,
    width: 50,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    elevation: 20,
    borderRadius: 8,
    marginLeft: 5,

  },
  DeleteIcon: {
    height: 25,
    width: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    elevation: 20,
    borderRadius: 8,
    marginLeft: 5,

  },
});

export default App;
