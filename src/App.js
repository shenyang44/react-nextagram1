import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/nav';
import axios from 'axios';
import Loader from './components/loader';
import HomePage from './pages/HomePage';
import { Route, useHistory } from 'react-router-dom';
import UserProfilePage from './pages/UserProfilePage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProfilePage from './pages/MyProfilePage';
import UploadPage from './pages/UploadPage';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  let windowW = window.innerWidth;
  const [emailInput, setEmailInput] = useState('')
  const [emailText, setEmailText] = useState('')
  const [passInput, setPassInput] = useState('')
  const [passText, setPassText] = useState('')
  const [userNameText, setUserNameText] = useState('')
  const [userNameInput, setUserNameInput] = useState('')
  const [userValid, setUserValid] = useState()
  const [rePassText, setRePassText] = useState('')
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwt'));
  let history = useHistory();

  //log in and sign up button stuff.
  const [modal, setModal] = useState(false);
  const [isLog, setIsLog] = useState(true);

  const toggle = () => {
    setModal(!modal);
    setUserNameText('')
    setEmailText('')
    setPassText('');
    setRePassText('')
  }
  const handleLogIn = () => {
    handleSubmit();
  }
  const logVsSign = () => {
    setIsLog(!isLog)
  }

  const handleLogClick = (e) => {
    toggle();
    setIsLog(true)
    if (e.target.id === 'signClick') {
      setIsLog(false)
    }
  }

  const handleSwitch = () => {
    logVsSign();
  }
  //


  //LOG OUT
  const logOutPls = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(localStorage.getItem('jwt') !== null)
    history.push('/')
    localStorage.removeItem('myUserId')
  }


  function handleInput(e) {
    if (e.target.id === 'eInputField') {
      setEmailText(e.target.value)
    }
    else if (e.target.id === 'pInputField') {
      setPassText(e.target.value)
    }
    else if (e.target.id === 'uNameField') {
      setUserNameText(e.target.value)
    }
    else {
      setRePassText(e.target.value)
    }
  }

  //upon submitting sign up or log in form
  function handleSubmit() {
    setEmailInput(emailText)
    setPassInput(passText)
    setUserNameInput(userNameText)
  }


  const [passValid, setPassValid] = useState();
  const [isUserLength, setIsUserLength] = useState();
  const [rePassState, setRePassState] = useState();

  useEffect(() => {
    //passwordcheck
    if (passText.length === 0) {
      setPassValid(0)
    }
    else if (passText.length < 8 || passText.length > 50) {
      setPassValid(false)
    }
    else {
      setPassValid(true)
    }
    //username check
    if (userNameText.length === 0) {
      setIsUserLength(0)
    }
    else if (userNameText.length < 5 || userNameText.length > 20) {
      setIsUserLength(false)
    }
    else {
      setIsUserLength(true)
    }

    // repeated password check
    if (rePassText.length === 0) {
      setRePassState(0)
    }
    else if (rePassText !== passText) {
      setRePassState(false)
    }
    else {
      setRePassState(true)
    }
  }, [userNameText, rePassText, passText])


  // Api call username check
  useEffect(() => {
    axios.get(`https://insta.nextacademy.com/api/v1/users/check_name?username=${userNameText}`)
      .then(result => {
        setUserValid(result.data.valid)
      })
      .catch(err => {
        console.log('ERROR: ', err)
      })
  }, [userNameText])


  // Sign up POST
  const [emailError, setEmailError] = useState([])
  useEffect(() => {
    if (userNameInput !== '') {
      axios({
        method: 'POST',
        url: 'https://insta.nextacademy.com/api/v1/users/',
        data: {
          username: userNameInput,
          email: emailInput,
          password: passInput
        }
      })
        .then(response => {
          toastMe();
          setUserNameText('');
          setPassText('')
          setEmailText('')
          toggle();
        })
        .catch(error => {
          console.error(error.response.data.message)
          setEmailError(error.response.data.message)
        })
      setEmailInput('')
    }
  }, [emailInput])

  //Log In POST
  useEffect(() => {
    if (userNameInput !== '') {
      axios({
        method: 'POST',
        url: 'https://insta.nextacademy.com/api/v1/login',
        data: {
          username: userNameInput,
          password: passInput
        }
      })
        .then(response => {
          toastMeIn();
          setUserNameText('');
          setPassText('')
          toggle();
          localStorage.setItem('jwt', response.data.auth_token)
          setLoggedIn(localStorage.getItem('jwt') !== null)
          localStorage.setItem('myUserId', response.data.user.id)
          history.push(`/profile`)
        })
        .catch(error => {
          console.error(error)
        })
      setUserNameInput('')
    }
  }, [userNameInput])


  useEffect(() => {
    axios.get('https://insta.nextacademy.com/api/v1/users ')
      .then(result => {
        setUsers(result.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log('ERROR: ', err)
      })
  }, [])

  const toastMe = () => {
    toast.success(`🦄 You signed up successfully! Welcome to the most poorly styled social media site on the planet! :')`, {
      position: "top-center",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }
  const toastMeIn = () => {
    toast.success(`🦄 You logged successfully! Welcome back... :')`, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }

  return (
    isLoading ? (<Loader />) : (
      <main style={{ width: { windowW }, boxSizing: 'border-box' }}>
        <NavBar loggedIn={loggedIn} logOutPls={logOutPls} loggedIn={loggedIn} rePassState={rePassState} isUserLength={isUserLength} emailError={emailError} userValid={userValid} passValid={passValid} handleInput={handleInput} handleSubmit={handleSubmit} eText={emailText} pText={passText} modal={modal}
          toggle={toggle} handleSubmit={handleSubmit} handleLogIn={handleLogIn} handleLogClick={handleLogClick} handleSwitch={handleSwitch}
          isLog={isLog}
          logVsSign={logVsSign} userNameText={userNameText} tag='a' id='top' />
        <ToastContainer
          position="top-center"
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />

        <Route exact path='/'>
          <HomePage users={users} />
        </Route>
        <Route path='/users/:id' component={UserProfilePage} />
        <Route exact path='/profile'>
          <MyProfilePage loggedIn={loggedIn} />
        </Route>
        <Route exact path='/profile/upload'>
          <UploadPage />
        </Route>
        <a id='toTop' href='#top'>
          ^
        </a>
      </main>
    )
  )
}

export default App;
