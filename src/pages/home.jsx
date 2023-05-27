import React, {useRef}  from 'react';
import {firestore} from "../firebase"
import {addDoc, collection} from "@firebase/firestore"
const Home = () => {
    // Immutable object, change later to useState
    const messageRef = useRef();
    const ref = collection(firestore, "messages")


    const handleSave = async(e) => {
        // Makes it so page doesn't refresh
        e.preventDefault();
        console.log(messageRef.current.value);


        let data = {
            message: messageRef.current.value
        }

        // Save data into firebase
        try {
            addDoc(ref,data)
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <div>
            <form onSubmit = {handleSave}>
                <label> Enter Message</label>
                <input type = "text" ref = {messageRef} />
                <button type = "submit" > Save </button>
            </form>
        </div>
    )
}

export default Home