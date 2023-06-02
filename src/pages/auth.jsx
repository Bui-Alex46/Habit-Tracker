import React, {useState, useEffect} from 'react';
import {createUserWithEmailAndPassword, onAuthStateChanged, 
        signInWithEmailAndPassword, signOut,} from 'firebase/auth';
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import {firestore} from "../firebase"
import { setDoc, doc, collection,} from "@firebase/firestore"
import './auth.css';


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
        <div className='auth-background'>
            <div className = "header-title">
                <h1> Track, Improve, Excel </h1>
            </div>
            <div className='auth-container'>
                {/* Create user signup */}
            <div className = "register">
                <h3 > Register Now</h3>
                <input className = "register-input" placeholder="Email" onChange = {(e) => setRegisterEmail(e.target.value)}></input>
                <input className = "register-input" placeholder="Password" onChange = {(e) => setRegisterPassword(e.target.value)}></input>
                <button  className = "register-input"onClick = {register}>Create an account</button>
            </div>
            {/* User Login */}
            <div className = "login">
                <h3> Login</h3>
                <input className = "login-input" placeholder="Email" onChange = {(e) => setloginEmail(e.target.value)}></input>
                <input className = "login-input" placeholder="Password" onChange = {(e) => setloginPassword(e.target.value)}></input>
                <button className = "login-input" onClick = {login}>Login</button>
            </div>

            {/* Log out */}
            <h4 className = "current-user"> User Logged In:  </h4>
            <h3 className = "current-user">{user?.email}</h3>
            <button className = 'logout' onClick = {logout}>Logout</button>
            </div>
            
        </div>
    )
}
export default Authentication