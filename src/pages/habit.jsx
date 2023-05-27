import React, {useRef}  from 'react';
import {firestore} from "../firebase"
import {addDoc, collection} from "@firebase/firestore"


const Habit = () => {
    // Create a users collection
    const userRef = collection(firestore, "users")
    // SubCollection of habits under the user collection
    const habitsRef = useRef()
 
    const onSubmitForm = async(e) => {
        e.preventDefault();

        let data = {
            habit: habitsRef.current.value
        }
        // Adding user data to firestore
        try {
            addDoc(userRef,data )
        } catch (error) {
            console.error(error.message)
        }
    }
    

    return(
        <div>
            <form onSubmit = {onSubmitForm}>
                <label> Enter a habit</label>
                <input type = 'text' ref = {habitsRef} placeholder = 'workout, study, etc..'></input>
                <button type = 'submit'> Add habit</button>
            </form>
        </div>
    )




}

export default Habit