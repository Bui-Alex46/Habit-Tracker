import React, {useState, useEffect} from 'react';
import {createUserWithEmailAndPassword, onAuthStateChanged, 
        signInWithEmailAndPassword, signOut,} from 'firebase/auth';
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import {firestore} from "../firebase"
import { setDoc, doc, collection,} from "@firebase/firestore"


const Authentication = () => {
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [loginEmail, setloginEmail] = useState("")
    const [loginPassword, setloginPassword] = useState("")
    
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);
    
    const register = async () => {
        // Returning a promise
        try{
            const user = await createUserWithEmailAndPassword(
                auth, registerEmail, registerPassword);
            console.log(user)



            // Create a new user subcollection
            const userRef = collection(firestore, "users")
            const userDocRef = doc(userRef, user.user.uid)
            let userData = {
                email: registerEmail,
                id : user.user.uid,
            }
            await setDoc(userDocRef, userData)
        }
        catch(error){
            console.log(error.message)
        } 
    };
    const login = async() => {
        try{
            const user = await signInWithEmailAndPassword(
                auth, loginEmail, loginPassword);
            console.log(user)
            navigate('/habit')
        }
        
        catch(error){
            console.log(error.message)
        } 
    };
    const logout = async() => {
        await signOut(auth);
    };
    return (
        <div>
            {/* Create user signup */}
            <div>
                <h3> Register User</h3>
                <input placeholder="Email" onChange = {(e) => setRegisterEmail(e.target.value)}></input>
                <input placeholder="Password" onChange = {(e) => setRegisterPassword(e.target.value)}></input>
                <button onClick = {register}>Register</button>
            </div>
            {/* User Login */}
            <div>
                <h3> Login</h3>
                <input placeholder="Email" onChange = {(e) => setloginEmail(e.target.value)}></input>
                <input placeholder="Password" onChange = {(e) => setloginPassword(e.target.value)}></input>
                <button onClick = {login}>Login</button>
            </div>

            {/* Log out */}
            <h4> User Logged In: </h4>
            {user?.email}
            <button onClick = {logout}>Logout</button>
        </div>
    )
}
export default Authentication