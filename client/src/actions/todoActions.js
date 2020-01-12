import axios from 'axios';
const url = 'http://localhost:5000/report/';


export const filesLoaded = () => {
    return (dispatch) => {
        dispatch({
            type: 'FILES_LOADED'
        })
    }
}

export const addForm = form => {

    return async (dispatch) => {
        axios({
            method: 'post',
            url: `${url}add`,
            data: form
        })
        .then(succ => {
            
            console.log("FORM successfully added", succ)
            dispatch({
                type: 'ADD_FORM',
                form,
                form_id: succ.data.id
            })
            return succ.data;
        })
        .catch(error => {
            console.log("FORM couldnt added", error.message)
            dispatch({
                type: 'ERROR_ADDING',
                error: error.message
            })
        })
    }
}

// FETCH SINGLE FORM FROM DB
export const searchToken = token => {

    return async (dispatch) => {
        axios({
            method: 'get',
            url: `${url}findone/${token}`
        })
        .then(succ => {
            
            console.log("FORM Token Found", succ.status)
            dispatch({
                type: 'SHOW_FORM',
                form: succ.data
            })
        })
        .catch(error => {
            console.log("FORM Token not in DB", error.message)
            dispatch({
                type: 'ERROR_FETCHING',
                error: error.message
            })
        })
    }
}

// Fetch ALL FORMS from mongodb and display item when component is rendered
export const showForm = id => {
    return async (dispatch) => {
        dispatch({
            type: 'IS_FETCHING'
        })
        
        await axios(`${url}alldata`)
          .then(res => {
            dispatch({
                type: 'SHOW_FORM',
                form: res.data,
            })
            }) 
          .catch(error => { 
            console.log("Can’t access " + url + " response. Blocked by browser?")
            dispatch({
                type: 'ERROR_FETCHING',
                error: error.message
            })
        })
    }
}

export const deleteForm = id => {
    console.log('actions DELETED ID', id);
    
    return async (dispatch) => {
        axios({
            method: 'delete',
            url: `${url}delete/${id}`,
            data: id
        })
        .then(succ => {
            console.log("item successfully deleted", succ.status)
            dispatch({
                type: 'DELETE_TODO',
                id
            })
        })
        .catch(error => {
            console.log("Item couldnt deleted", error.message)
            dispatch({
                type: 'ERROR_DELETING',
                error: error.message
            })
        })
    }
}



// export const toggleTodo = todo => {
//     todo.done = !todo.done 
//     console.log('STATUSSSSS', todo.done)
//     return async (dispatch) => {
//         // Sending put request to update the record in mongodb
//         await axios({
//             method: 'put',
//             url: `http://localhost:5000/todolist/edit/${todo._id}`,
//             data: todo
//         })
//         .then(succ => {
//           console.log("item successfully UPDATED after TOGGLE MONGOOSE", succ.status)
//           dispatch({
//               type: 'TOGGLE_TODO',
//               id: todo._id
//           })  
//         })
//       .catch(error => {
//           console.log("Item couldnt Updated after TOGGLE MONGOOSE", error.message)
//           dispatch({
//               type: 'ERROR_FETCHING',
//               error: error.message
//           })
//       })
//     }
// }

export const editForm = form => {
    console.log('item TO BE UPDATED', form);
    
    return async (dispatch) => {
    axios({
        method: 'put',
        url: `${url}edit/${form._id}`,
        data: form
      })
      .then(succ => {
          console.log("item successfully UPDATED MONGOOSE", succ.status)
          dispatch({
            type: 'EDIT_TODO',
            form
            })  
        })
      .catch(error => {
          console.log("Item couldnt Updated MONGOOSE", error.message)
          dispatch({
              type: 'ERROR_FETCHING',
              error: error.message
          })  
        })
    }
}