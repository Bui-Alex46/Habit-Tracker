import {useState} from 'react';
import {createUserWithEmailAndPassword, onAuthStateChanged, 
        signInWithEmailAndPassword, signOut,} from 'firebase/auth';
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
const Authentication = () => {
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [loginEmail, setloginEmail] = useState("")
    const [loginPassword, setloginPassword] = useState("")
    const navigate = useNavigate()
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })
    
    const register = async () => {
        // Returning a promise
        try{
            const user = await createUserWithEmailAndPassword(
                auth, registerEmail, registerPassword);
            console.log(user)
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
                <input placeholder="Email" type="email" onChange = {(e) => setloginEmail(e.target.value)}></input>
                <input placeholder="Password" type="password" onChange = {(e) => setloginPassword(e.target.value)}></input>
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