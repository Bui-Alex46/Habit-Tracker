import React, {useRef, useState, useEffect}  from 'react';
import {firestore} from "../firebase"
import {collection, setDoc, getDocs, doc} from "@firebase/firestore"
import Modal from 'react-modal';
import './habit.css';
import Calendar from './calendar'
import {auth} from '../firebase';


const Habit = () => {
    const habitsRef = useRef()

    // Reference a subcollection under unique userId
    const userDocRef = auth.currentUser && doc(firestore, 'users', auth.currentUser.uid)
    // Create a new collection called habits
    const usersHabitsRef = collection(userDocRef, 'habits')
    // Create a state for the user's habits
    const [habitList, setHabitList] = useState([])
    // State for modal
    const[selectedHabit, setSelectedHabit] = useState(null);


    
    useEffect(() => {
        const fetchHabits = async() => {
            if (!auth.currentUser) return;
            const habitsSnapshot = await getDocs(usersHabitsRef);
            const habits = habitsSnapshot.docs.map((doc) => ({
                id: doc.id,
                habit: doc.data().habit
            }))
            setHabitList(habits)
        };
        fetchHabits(); 
    }, [usersHabitsRef]);

    const onSubmitForm = async(e) => {
        e.preventDefault();
        const newHabit = habitsRef.current.value;
        const habitDocRef = doc(usersHabitsRef)
        let data = {
            habit: newHabit,
        }
        // Adding user data to firestore
        try {
            
            await setDoc(habitDocRef, data )

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
    
    const closeModal = () => {
        setSelectedHabit(null)
    }

    // Create a function to remove a habit

    return(
        <div className = 'Habit_background'>
            <form className = "submitForm" onSubmit = {onSubmitForm}>
                <label > Create a habit</label>
                <input type = 'text' ref = {habitsRef} placeholder = 'workout, study, etc..' required></input>
                <button type = 'submit'> + New Habit</button>
            </form>
            {/* Display the list of habits */}
            <ul className='habit-list'>
                {habitList.map((habit) => (
                    <li className = 'newHabit' key = {habit.id} onClick = {() => openModal(habit.habit)}>{habit.habit}</li>
                ))}
            </ul>
            {/* Modal displaying a calendar when a new habit created */}
            <Modal isOpen = {selectedHabit !== null} onRequestClose = {closeModal} contentLabel = "Habit Modal">
                {selectedHabit && <h1>{selectedHabit.habit}</h1>}
                <div> Did you {selectedHabit} today?</div>
                <div className="calendar-wrapper">
                    <Calendar selectedHabit = {selectedHabit} />
                </div>

            </Modal>
            
        </div>
    );
};
export default Habit