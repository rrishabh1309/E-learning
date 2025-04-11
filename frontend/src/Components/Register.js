import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const registerState = {username: '', password: ''}
function Register() {
    const [formData, setFormData] = useState(registerState);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const Register = (e) => {
        e.preventDefault();

        try {

        }
    };
    
    export default Register




}


