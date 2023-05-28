import React, {useRef, useState}  from 'react';
import {firestore} from "../firebase"
import {addDoc, collection} from "@firebase/firestore"
import Modal from 'react-modal';
import './habit.css';
import Calendar from './calendar'


const Habit = () => {
    // Create a users collection
    const userRef = collection(firestore, "users")
    // SubCollection of habits under the user collection
    const habitsRef = useRef()

    // Create a state for the user's habits
    const [habitList, setHabitList] = useState([])
    // State for modal
    const[selectedHabit, setSelectedHabit] = useState(null);
    const onSubmitForm = async(e) => {
        e.preventDefault();
        const newHabit = habitsRef.current.value;

        let data = {
            habit: newHabit,
        }
        // Adding user data to firestore
        try {
            await addDoc(userRef, data )
            // adding new habit to the list
            setHabitList((prevHabits) => [...prevHabits, newHabit])
            habitsRef.current.value = ""; // Clear the input field
        } catch (error) {
            console.error(error.message)
        }
    }
    const openModal = (habit) => {
        setSelectedHabit(habit);
    }
    
    const clodeModal = () => {
        setSelectedHabit(null)
    }

    return(
        <div className = 'Habit_background'>
            <form className = "submitForm" onSubmit = {onSubmitForm}>
                <label > Create a habit</label>
                <input type = 'text' ref = {habitsRef} placeholder = 'workout, study, etc..' required></input>
                <button type = 'submit'> + New Habit</button>
            </form>
            {/* Display the list of habits */}
            <ul >
                {habitList.map((habit, index) => (
                    <li className = 'newHabit' key = {index} onClick = {() => openModal(habit)}>{habit}</li>
                ))}
            </ul>

            <Modal isOpen = {selectedHabit !== null} onRequestClose = {clodeModal} contentLabel = "Habit Modal">
                {selectedHabit && <h1>{selectedHabit}</h1>}
                <div> Did you {selectedHabit} today?</div>
                <Calendar />
            </Modal>
            
        </div>
    );
};
export default Habit