import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
  Grid,
  Typography,
  Button,
  Checkbox
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//Dialog imports
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//Card imports
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//Icons imports
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
//Firebase imports
import { useHistory } from 'react-router-dom';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import * as firebase from 'firebase';

//Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDy98scBj_05f6VoJqcXczg5sqZcG3zWXc',
  authDomain: 'to-do-list-59982.firebaseapp.com',
  projectId: 'to-do-list-59982',
  storageBucket: 'to-do-list-59982.appspot.com',
  messagingSenderId: '92859883872',
  appId: '1:92859883872:web:9971d726341298e6ee3e05',
  measurementId: 'G-WFSWHRGCCJ'
};

//Firebase initialization
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  //Header styings
  header: {
    width: '100%',
    fontFamily: 'montserrat',
    padding: '0',
    margin: '0',
    listStyle: 'none',
    boxSizing: 'border-box',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: '#ffffff',
    overflow: 'visible',
    height: '100px',
    zIndex: '2',
    float: 'right',
  },
  nav: {
    width: '100%',
    height: '80px',
    position: 'fixed',
    top: '0',
    marginRight: '20px',
    float: 'right',
  },
  ul: {
    padding: '10px',
    margin: '0 auto',
    listStyle: 'none',
    textAlign: 'center'
  },
  li: {
    display: 'inline-block',
    lineHeight: '70px',
    margin: '0px 2px',
  },
  links: {
    fontFamily: 'montserrat',
    padding: '12px',
    color: '#000',
    fontSize: '35px',
    textDecoration: 'none',
    fontWeight: 'bold',
    float: 'left',
    '&:hover': {
      background: '#c6b3f2'
    },
    '&:active': {
      borderBottom: '2px',
      solid: '#85C2FF'
    }
  },
  logo: {
    zIndex: '2',
    width: '150px',
    height: '100px',
    float: 'left',
    overflow: 'hidden',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  //End of Header stylings
  //home styings
  home: {
    backgroundImage:
      'url(' +
      'https://scontent.fjnb11-1.fna.fbcdn.net/v/t1.6435-9/p180x540/235764214_6236350409771540_1731177234276419419_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeF1PzNmNaobQrAT8ZEscjEWniVHVRZ9oYeeJUdVFn2hhzaKE5cCVAb2WoJH2-Jq6qxOGlp2ht1ZlJiFM31aKTrb&_nc_ohc=M6ZCWr6j8SgAX9XSpm7&_nc_ht=scontent.fjnb11-1.fna&oh=fab49f7f760e7010d1ff5db3b46b167b&oe=613EDB6A' +
      ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: 'auto',
    height: '520px'
  },
  homeMenu: {
    height: '450px',
    backgroundColor: '#abb0b0',
    overflow: 'visible'
  },
  menu:{
    width: 'auto',
    //height: '100vh',
    overflow: 'visible',
    backgroundImage:
      'url(https://scontent.fjnb11-1.fna.fbcdn.net/v/t1.6435-9/237037317_6236589616414286_6688111339642450988_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeHbp5_zcph1tYy7QqfkEAgy-hnt29IXBzX6Ge3b0hcHNaiOvAQAv0gzVGaxg5nIo10P8WVMfLUcE7WHJR2BHU1-&_nc_ohc=53FOkq7WJwEAX_mUIqL&tn=yWXzxHN1w3b5G6a2&_nc_ht=scontent.fjnb11-1.fna&oh=de68db628e30df062aa903c9095f0dc5&oe=61419086)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginTop:'100px',
    padding: '20px',
    //marginLeft:'10px'
  },
  cards: {
    width: '350px',
    height: '380px',
    boxShadow:
      '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderRadius: '29px'
  },
  about: {
    width: 'auto',
    height: '450px',
    overflow: 'visible',
    backgroundImage:
      'url(https://scontent.fjnb11-1.fna.fbcdn.net/v/t1.6435-9/237037317_6236589616414286_6688111339642450988_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeHbp5_zcph1tYy7QqfkEAgy-hnt29IXBzX6Ge3b0hcHNaiOvAQAv0gzVGaxg5nIo10P8WVMfLUcE7WHJR2BHU1-&_nc_ohc=53FOkq7WJwEAX_mUIqL&tn=yWXzxHN1w3b5G6a2&_nc_ht=scontent.fjnb11-1.fna&oh=de68db628e30df062aa903c9095f0dc5&oe=61419086)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  contact: {
    width: 'auto',
    height: '330px',
    overflow: 'visible',
    backgroundImage:
      'url(https://scontent.fjnb11-1.fna.fbcdn.net/v/t1.6435-9/237037317_6236589616414286_6688111339642450988_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeHbp5_zcph1tYy7QqfkEAgy-hnt29IXBzX6Ge3b0hcHNaiOvAQAv0gzVGaxg5nIo10P8WVMfLUcE7WHJR2BHU1-&_nc_ohc=53FOkq7WJwEAX_mUIqL&tn=yWXzxHN1w3b5G6a2&_nc_ht=scontent.fjnb11-1.fna&oh=de68db628e30df062aa903c9095f0dc5&oe=61419086)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  register:{ 
    width: 'auto',
    height: '100vh',
    overflow: 'visible',
    backgroundImage:
      'url(https://scontent.fjnb11-1.fna.fbcdn.net/v/t1.6435-9/238313868_6236592189747362_3675021765569249439_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeENqAVV1nQfcikjP0fdGaxSGxiOG_r8mAAbGI4b-vyYAEfbn-P0NgWoabMILzN7AcSpKQV6RrlYlqpRKiPklrvV&_nc_ohc=tM4H4IOqmrsAX9091Nw&_nc_ht=scontent.fjnb11-1.fna&oh=f35c19dae24c05f064052bebc946621c&oe=61432FB5)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginTop:'80px'
  },
  inputs:{
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
     boxSizing: 'border-box',
    borderRadius:'8px',
     backgroundColor:'#EBEBEB',
     placeholderColor:'#aaa',
  },
  productsBox:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '50px'
  },
  product:{
    width: '350px',
    height: 'auto', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '50px',
    marginRight: '24px',
    transition: 'all 0.3s ease-in-out',
    padding: '12px',
    borderRadius: '10px', 
    '&:hover': {
      boxShadow: '5px 5px 20px 0px rgba(0, 0, 0, 0.1)',
    },
  }
}));

export default function App() {
  return (
    <div>
      <Router>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/menu">
          <Home />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/purchase">
          <Purchase />
        </Route>
        <Route exact path="/history">
          <PurchaseHistory />
        </Route>
        <Route exact path="/shipping">
          <Shipping />
        </Route>
        <Route exact path="/add">
          <AddProducts />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
    </div>
  );
}//Complete

//=================================================== Header =======================
function Header({ user }){
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  // handle logout
  const handleLogout = () => {
    auth.signOut().then(() => {
        history.push('/signin');
    })
  }
      //Open Dialog
  const handleClickOpen = () => {setOpen(true);};
  //close Dialog
  const handleClose = () => {setOpen(false);};
  const toSignin =()=>{history.push('/Login')}
  const toSignup =()=>{history.push('/signup')} 

  return(
    <div>
      <Grid className={classes.header}>
        <div>
          <nav className={classes.nav}>
          {!user && <div className='rightside'>
          <div className={classes.logo}>
            <img
              src="https://image.shutterstock.com/image-vector/green-vegan-product-vector-icon-260nw-1494197558.jpg" alt="logo" height="100px" />
          </div>
          <ul className={classes.ul}>
            <li className="navigation__item">
              <a className={classes.links} href="#" color="inherit">Home </a>
            </li>
            <li className="navigation__item">
            <a className={classes.links} href="#menu" color="inherit">| Menu</a>
            </li>
            <li className="navigation__item">
              <a className={classes.links} href="#about" color="inherit">| About</a>
            </li>
            <li className="navigation__item">
              <a className={classes.links} href="#contact" color="inherit">| ContactUs</a>
            </li>
            <li className="navigation__item">
              <a className={classes.links} to="" onClick={handleClickOpen} color="inherit" >| History</a>
            </li>
            <span><Link to="signup" className={classes.links}>| Sign Up</Link></span>
              <span><Link to="login" className={classes.links} styles={{cursor: 'auto'}}>| Login</Link></span>
          </ul>
          </div>}
          {user && <div className='rightside'>
          <div className={classes.logo}>
            <img
              src="https://image.shutterstock.com/image-vector/green-vegan-product-vector-icon-260nw-1494197558.jpg"alt="logo" height="100px"/>
          </div>
          <ul className={classes.ul}>
            <li className="navigation__item">
              <a className={classes.links} href="/" color="inherit">Home</a>
            </li>
            <li className="navigation__item">
            <a className={classes.links} href="menu" color="inherit">| Menu</a>
            </li>
            <li className="navigation__item">
              <a className={classes.links} href="/" color="inherit">| About</a>
            </li>
            <li className="navigation__item">
              <a className={classes.links} href="/" color="inherit">| ContactUs</a>
            </li>
            <li className="navigation__item">
              <a className={classes.links} to=""  color="inherit" >| History</a>
            </li>
           {/* <span><Link to="/" className={classes.links}>{user}</Link></span>*/}
              <span><Link to="cart" style={{padding:'28px'}}><Badge badgeContent={} color="secondary" style={{marginTop:'25px'}} >
          <ShoppingCartIcon />{" "}
        </Badge></Link></span>
              {/*<span className='no-of-products'>{totalQty}</span>*/}
              <span><Button style={{marginTop:'25px'}} variant='contained' color="primary" type='submit' className='logout-btn' onClick={handleLogout}>Logout</Button></span>
          </ul>
          </div>}
        </nav>
      </div>
      <div>
          <Dialog open={open} onClose={handleClose}>
          <DialogTitle> Not logged in </DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1">
                You need to login or Register first to view purchase history
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={toSignin} color="primary"> Login </Button>
            <Button onClick={toSignup} color="primary"> Register </Button>
          </DialogActions>
        </Dialog>
        </div>
    </Grid>
  );
    </div>
  )
}//Complete
//=================================================== Signup =======================
function Signup(){
  const history = useHistory();
  const classes = useStyles();
  const [fullName, setFullname]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg]=useState('');
  const [successMsg, setSuccessMsg]=useState('');

  const clearInputs = () => {
    setFullname('')
    setEmail('')
    setPassword('')
    setErrorMsg('')
    setConfirmPassword('')
  };

  const handleSignup=(e)=>{
      e.preventDefault();
      // console.log(fullName, email, password);
      auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
          console.log(credentials);
          fs.collection('users').doc(credentials.user.uid).set({
              FullName: fullName,
              Email: email,
              Password: password
          }).then(()=>{
              setSuccessMsg('Signup Successfull.')
              clearInputs()
              setTimeout(()=>{
                  setSuccessMsg('')
                  history.push('/menu')
              },3000)
          }).catch(error=>setErrorMsg(error.message))
      }).catch((error)=>{
          setErrorMsg(error.message)
      })
  }

  return (
    <div className={classes.root}>
    <Grid container spacing={1}>
      <Grid id="Header" item xs={12}>
          <Header />
      </Grid>

      <Grid className={classes.register} item xs={12} id="register">
        <div style={{paddingLeft:'450px'}}> 
        <div id="form" style={{paddingTop:'5px', width:'400px', height:'300px', color:"#F6F6F6"}}>
        <h2 style={{ overflow: 'visible', whiteSpace: 'pre', fontSize: '46px', letterSpacing: '-2px', color: '#F6F6F6', lineHeight: '1.1',fontWeight: 700, fontStyle: 'normal', fontFamily: 'Arvo, serif', margin: 0 }}>
                Create An Account
                <hr></hr>
        </h2>
        {successMsg&&<>
              <div className='success-msg'>{successMsg}</div>
              <br></br>
          </>}
        <div className='container'>
        <form className='form-group' autoComplete="off" onSubmit={handleSignup}>
        <label>Full-Name</label>
              <input type="text" className={classes.inputs} required
              onChange={(e)=>setFullname(e.target.value)} value={fullName}></input>
              <br></br>
              <label>Email</label>
              <input type="email" className={classes.inputs} required
               onChange={(e)=>setEmail(e.target.value)} value={email}></input>
              <br></br>
              <label>Password</label>
              <input type="password" className={classes.inputs} required
               onChange={(e)=>setPassword(e.target.value)} value={password}></input>
              <br></br>
              <label htmlFor="confirPassowrd">Confirm_Password:</label>
              <input type="password" className='form-control' required
                  onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} 
                  className={classes.inputs} />
              <br />
              <div className='btn-box'>
              <Button type="submit" color="primary" variant="contained" className={classes.signupButton} startIcon={<ExitToAppRoundedIcon />} fullWidth  disabled={!confirmPassword}>SIGN IN</Button>
              </div>
          </form>
          {errorMsg&&<>
              <br></br>
              <div className='error-msg'>{errorMsg}</div>                
          </>}
          <span>Already have an account? Login
              <Link to="login"> Here</Link>
          </span>
      </div>
        </div>
        </div>
    </Grid>
    </Grid>
    </div>
  )
}

//=================================================== Landing =======================
function Landing(){
  const classes = useStyles();
  const history = useHistory();

  const handleMenu = () => {
    history.push('/menu')
  };
  const handleShipping = () => {
    history.push('/shipping')
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid id="Header" item xs={12}>
            <Header />
        </Grid>
        <Grid item xs={12} className={classes.home} id="home">
          <div>
            <p style={{width: '600px',height: '320px',overflow: 'hidden',whiteSpace: 'pre-wrap', wordWrap: 'break-word', wordBreak: 'break-word',fontWeight: '400',fontStyle: 'normal',fontFamily: 'Sanchez',color: '#4a4025',fontSize: '72px',letterSpacing: '0.1px',lineHeight: '1.2', textAlign: 'center' }}>
              <Typography variant="h2">Welcome</Typography>
              <Typography variant="subtitle1">
                Freshly picked from the ground and <br />
                cleaned for our customers. We are what we
                <br /> eat. Low prices on selected items everyday.
              </Typography>
            </p>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.homeMenu} id="menu">
          <div style={{display: 'flex',float: 'left',marginBottom: '16px',padding: '10px 30px 30px 30px'}}>
            {/*============================================== Fuit Card==================*/}
            <Card className={classes.cards}>
              <CardActionArea onClick={handleMenu}>
                <CardMedia component="img" alt="Fruits" height="240" title="Fruits Menu"
                  image="https://scontent.fjnb11-1.fna.fbcdn.net/v/t1.6435-9/238830577_6236590873080827_4601024688957702708_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeHbCNRtivem8IuDtte-klCLw9287Yk_7OzD3bztiT_s7IXI9c_JdnfaHmyY5v_VAraHYgc427j1Ki4Bt7D5d7XV&_nc_ohc=xGBcmG7i9-UAX9i3mZv&_nc_ht=scontent.fjnb11-1.fna&oh=a357d7de43721d7838fa7738499f5cdc&oe=61407BA2"/>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">Fresh Fruits</Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    We get our Ftuits from local Farmers
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/*============================================== Vegetable Card==================*/}
            <Card className={classes.cards}>
              <CardActionArea onClick={handleMenu}>
                <CardMedia component="img" alt="Vegeatbles" height="240"  title="Vegeatbles Menu"
                  image="https://scontent.fjnb11-1.fna.fbcdn.net/v/t1.6435-9/237948160_6236616756411572_5451525474340166214_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeF42GblSh_Pk-VuY88_RH1oifh8LJs5traJ-Hwsmzm2toPfMDWXz-yFfk5YZb1makLUXsOPy92mUnlWm0Xw32n6&_nc_ohc=_aB-1X_m7FwAX_714KI&tn=yWXzxHN1w3b5G6a2&_nc_ht=scontent.fjnb11-1.fna&oh=d69da43480679879d20e10c71520a741&oe=61414411" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">Fresh Vegetables</Typography>
                  <Typography variant="body2" color="textSecondary" component="p" >
                    We grow our own Vegeatbles to delivery low affordable prices, and fresh vegetables
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/*============================================== Transport Card==================*/}
            <Card className={classes.cards}>
              <CardActionArea onClick={handleShipping}>
                <CardMedia component="img" alt="Transport" height="240"  title="Transportation"
                  image="https://scontent.fjnb11-1.fna.fbcdn.net/v/t1.6435-9/238153644_6236612943078620_8795884513667792244_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeEaocLUVbGkEaORXSHagtnqnT-rlDQKJAydP6uUNAokDMDte4YqDDFfmLl2ctq_AEpy0wmlBvEjb7vWxs6vmhj9&_nc_ohc=uWQhJ1XAlpsAX96Ldi8&_nc_oc=AQkqdARr30c5dgvspSSa6X2a8dMpuwGWHNrMIunYBEmZFMV2jxUeGKi1xX1sU5A2Ms4&_nc_ht=scontent.fjnb11-1.fna&oh=f87bda724e62397df99755c9e660334c&oe=613F1680" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">Fast DeliveryFast</Typography>
                  <Typography variant="body2" color="textSecondary" component="p" >
                    and affordable Food delivery is our speciality
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.about} id="about">
          <div>
            <p style={{ width: '600px',height: '320px',overflow: 'hidden',whiteSpace: 'pre-wrap',wordWrap: 'break-word', wordBreak: 'break-word',fontWeight: '400',fontStyle: 'normal',fontFamily: 'Sanchez',color: '#4a4025',  fontSize: '72px',letterSpacing: '0.1px',lineHeight: '1.2',textAlign: 'center', marginLeft: '28%', marginTop: '10%' }}>
              <Typography variant="h2">About Us</Typography>
              <Typography variant="subtitle1">
                we are a slow developing fruits and vegetables shop, low pices
                and fresh quality delivery of fruits and vegetables. "We are
                what We Eat
              </Typography>
            </p>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.contact} id="contact">
          <div style={{ padding: '20px' }}>
            <Typography variant="h4">Contact Us</Typography>
            <div className="row" style={{color:'#4a4025',}}>
              <div class="column" style={{float: 'left',width: '33.3%', marginBottom: '12px', padding: '0 8px'}}>
                <div className="card">
                  <div className="container">
                    <LocationOnOutlinedIcon />
                    <h3>PHYSICAL ADDRESS</h3>
                    <h4>Vargan F&V</h4>
                    <p>153 Troye Street, Sunnyside, Pretoria, 0002</p>
                  </div>
                </div>
              </div>
              <div className="column" style={{ display:'flex',float: 'left', width: '33.3%',marginBottom: '16px',padding: '0 8px'}}>
                <div className="card">
                  <div className="container">
                    <PhoneRoundedIcon />
                    <h3>PHONE</h3>
                    <h4>Manager</h4>
                    <p>
                      0825454961
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Or
                      <br />
                      0214567890
                    </p>
                  </div>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="column" style={{float: 'left',width: '33.3%',marginBottom: '16px', padding: '0 8px'}} >
                <div className="card">
                  <div class="container">
                    <MailOutlineRoundedIcon />
                    <h3>EMAIL ADDRESS</h3>
                    <h4>Enquiries</h4>
                    <p>varganfv@enquiries.co.za</p>
                    <h4>Complaints</h4>
                    <p>varganfv@complaints.co.za</p>
                  </div>
                </div>
              </div>
              </div>
              
      
            </div>
          </div>
        </Grid>
       
      </Grid>
    </div>
  );
}//Complete

//=================================================== Login =======================
function Login(){
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');

  const [errorMsg, setErrorMsg]=useState('');
  const [successMsg, setSuccessMsg]=useState('');

  const handleLogin=(e)=>{
      e.preventDefault();
      // console.log(email, password);
      auth.signInWithEmailAndPassword(email,password).then(()=>{
          setSuccessMsg('Login Successfull. Happy Shopping!!!');
          setEmail('');
          setPassword('');
          setErrorMsg('');
          setTimeout(()=>{
              setSuccessMsg('');
              history.push('/menu');
          },3000)
      }).catch(error=>setErrorMsg(error.message));
  }

  return (
    <div className={classes.root}>
    <Grid container spacing={1}>
      <Grid id="Header" item xs={12}>
          <Header />
      </Grid>

      <Grid className={classes.register} item xs={12} id="register">
        <div style={{paddingLeft:'450px'}}> 
        <div id="form" style={{paddingTop:'5px', width:'400px', height:'300px', color:"#F6F6F6"}}>
          <br/><br/><br/><br/>
        <h2 style={{ overflow: 'visible', whiteSpace: 'pre', fontSize: '46px', letterSpacing: '-2px', color: '#F6F6F6', lineHeight: '1.1',fontWeight: 700, fontStyle: 'normal', fontFamily: 'Arvo, serif', margin: 0 }}>
                Welcome Back
        </h2>
        <hr></hr>
        {successMsg&&<>
              <div className='success-msg'>{successMsg}</div>
              <br></br>
          </>}
        <Typography variant="body2">
        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
        <Link to="/signup" color="#fff">
             {"Don't have an account? Sign Up"}
            </Link>
        </Typography>
        <form className='form-group' autoComplete="off"
          onSubmit={handleLogin}>               
              <label>Email</label>
              <input type="email" className={classes.inputs} required
              onChange={(e)=>setEmail(e.target.value)} value={email}></input>
              <br></br>
              <label>Password</label>
              <input type="password" className={classes.inputs} required
              onChange={(e)=>setPassword(e.target.value)} value={password}></input>
              <br></br>
              <div className='btn-box'>
              <FormControlLabel control={ <Checkbox name="remember" color="primary" fullWidth variant="contained" /> } label="remember me" />

              <Button type="submit" color="primary" variant="contained" className={classes.signupButton} startIcon={<ExitToAppRoundedIcon />} fullWidth onClick={handleLogin} disabled={!password}>SIGN IN</Button>
              </div>
          </form>
          {errorMsg&&<>
              <br></br>
              <div className='error-msg'>{errorMsg}</div>                
          </>}
         <Grid container>
           <Grid item xs>
            <Link href="#" variant="body2">
             Forgot password?
           </Link>
           </Grid>
          </Grid>
        </div>
        </div>
    </Grid>
    </Grid>
    </div>
  )
}
//=================================================== Home =======================
function Home(){
  const [products, setProducts]=useState([]);
  const classes = useStyles();
  function GetUserUid(){
    const [uid, setUid]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setUid(user.uid);
            }
        })
    },[])
    return uid;
  }

  const uid = GetUserUid(); 

    // getting current user function
  function GetCurrentUser(){
    const [user, setUser]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('users').doc(user.uid).get().then(snapshot=>{
                    setUser(snapshot.data().FullName);
                })
            }
            else{
                setUser(null);
            }
        })
    },[])
    return user;
  }
  const user = GetCurrentUser();

  // getting products function
  const getProducts = async ()=>{
    const products = await fs.collection('Products').get();
    const productsArray = [];
    for (var snap of products.docs){
        var data = snap.data();
        data.ID = snap.id;
        productsArray.push({
            ...data
        })
        if(productsArray.length === products.docs.length){
            setProducts(productsArray);
        }
    }
  }

  useEffect(()=>{
    getProducts();
  },[])

  let Product;
  const addToCart = (product)=>{
    if(uid!==null){
        Product=product;
        Product['qty']=1;
        Product['TotalProductPrice']=Product.qty*Product.price;
        fs.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
            console.log('successfully added to cart');
        })

    }
    else{
        props.history.push('/login');
    }
    
  }

  return (
    <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid id="Header" item xs={12}>
          <Header user={user}/>   
           </Grid>
            <Grid item xs={12} className={classes.menu}>
              {products.length > 0 && (
                <div className='display'>
                 <h1 className='text-center'>Vegetables</h1> 
                 <div className='products-box'>
                   <Products products={products} addToCart={addToCart} />
                   </div>
                   <div>
                     <h1>Fruits</h1>
                     </div>
                </div>
                )}
              {products.length < 1 && (
                <div className='container-fluid'>There Are No Items To Display</div>
            )}
            </Grid>
        </Grid>
      </div>
  )
}
//=================================================== Products =======================
function IndividualProduct({individualProduct, addToCart}){
   // console.log(individualProduct);
   const handleAddToCart=()=>{
    addToCart(individualProduct);
  }   
  return (
    <div style={{ width: '20%',padding: '10px',border: '1px solid gray',borderRadius: '12px',wordWrap: 'break-word',}}>
        <div className='product-img'>
            <img src={individualProduct.url} alt="product-img" style={{objectFit: 'cover', flexShrink: '1',width: '100%', height: '281px',marginBottom: '20px',}}/>
        </div>
        <div><h4>{individualProduct.title}</h4></div>
        <div style={{ margin: '20px 0'}}>
        <h5>R {individualProduct.price}</h5>
        </div>
        <div>
        <Button fullWidth style={{padding: '6px 10px',cursor: 'pointer',borderRadius: '25px',backgroundColor: '#ffa430',border: 'none',transition: 'all 0.2s ease-in'}}
          onClick={ handleAddToCart }
        >
          ADD TO CART
        </Button>
      </div>
    </div>
  )
}

function Products({products, addToCart}){

  return products.map((individualProduct)=>(
    <IndividualProduct key = {individualProduct.ID} individualProduct={individualProduct}
       addToCart={addToCart}
    />
  ))
}
//=================================================== Cart =======================
function Cart(){
  const [cartProducts, setCartProducts]=useState([]);
  const classes = useStyles();
  function GetCurrentUser(){
    const [user, setUser]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('users').doc(user.uid).get().then(snapshot=>{
                    setUser(snapshot.data().FullName);
                })
            }
            else{
                setUser(null);
            }
        })
    },[])
    return user;
  }
  const user = GetCurrentUser();


  // getting cart products from firestore collection and updating the state
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
        if(user){
            fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                const newCartProduct = snapshot.docs.map((doc)=>({
                    ID: doc.id,
                    ...doc.data(),
                }));
                setCartProducts(newCartProduct);                    
            })
        }
        else{
            console.log('user is not signed in to retrieve cart');
        }
    })
  },[])

   // global variable
   let Product;
    
   // cart product increase function
   const cartProductIncrease=(cartProduct)=>{
       // console.log(cartProduct);
       Product=cartProduct;
       Product.qty=Product.qty+1;
       Product.TotalProductPrice=Product.qty*Product.price;
       // updating in database
       auth.onAuthStateChanged(user=>{
           if(user){
               fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                   console.log('increment added');
               })
           }
           else{
               console.log('user is not logged in to increment');
           }
       })
   }

   // cart product decrease functionality
   const cartProductDecrease =(cartProduct)=>{
       Product=cartProduct;
       if(Product.qty > 1){
           Product.qty=Product.qty-1;
           Product.TotalProductPrice=Product.qty*Product.price;
            // updating in database
           auth.onAuthStateChanged(user=>{
               if(user){
                   fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                       console.log('decrement');
                   })
               }
               else{
                   console.log('user is not logged in to decrement');
               }
           })
       }
   }

  return (
    <div className={classes.root}>
    <Grid container spacing={1}>
      <Grid id="Header" item xs={12}>
          <Header user={user} />
      </Grid>
      <Grid item xs={12} className={classes.menu}> 
        {cartProducts.length > 0 && (
            <div className='c'><br/><br/><br/>
            <div style={{display:'flex'}}>
                <h1 className='title'>Items In Your Shopping Cart</h1>
                <div style={{marginTop:'28px',}}>
                <RemoveShoppingCartIcon /> Clear Cart
                </div>
            </div>
                <div className={classes.productsBox}>
                    <CartProducts 
                    cartProducts={cartProducts}
                    cartProductIncrease={cartProductIncrease}
                    cartProductDecrease={cartProductDecrease}
                           />
                </div>
            </div>
        )}
        {cartProducts.length < 1 && (
            <div>
              <Typography variant='h1'>No products to show</Typography></div>
        ) }  
      </Grid>         
    </Grid>
    </div>
)
}

function IndividualCartProduct({cartProduct,cartProductIncrease,cartProductDecrease}){
  const classes = useStyles();

  function GetCurrentUser(){
    const [user, setUser]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('users').doc(user.uid).get().then(snapshot=>{
                    setUser(snapshot.data().FullName);
                })
            }
            else{
                setUser(null);
            }
        })
    },[])
    return user;
    }
    const user = GetCurrentUser();

    function GetUserUid(){
    const [uid, setUid]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setUid(user.uid);
            }
        })
    },[])
    return uid;
  }
  const uid = GetUserUid();

  const handleCartProductIncrease=()=>{
    cartProductIncrease(cartProduct);
  }

  const handleCartProductDecrease=()=>{
    cartProductDecrease(cartProduct);
  }

  const handleCartProductDelete=()=>{
    auth.onAuthStateChanged(user=>{
        if(user){
            fs.collection('Cart ' + user.uid).doc(cartProduct.ID).delete().then(()=>{
                console.log('successfully deleted');
            })
        }
    })
  }



  return (
      <div className={classes.product}>
          <div className='product-img' style={{width: '180px',height: '215px',}}>
              <img src={cartProduct.url} alt="product-img" style={{width: '100%',height: '100%'}}/>
          </div>
          <div className='title' style={{color: '#e00a02', fontWeight:'600', fontSize: '20px', marginTop: '10px'}}>{cartProduct.title}</div>
          <div className='description' style={{height: '50px',overflow: 'hidden'}}>{cartProduct.description}</div>
          <div className='price' style={{fontWeight: '600'}}>R {cartProduct.price}</div>
          <span>Quantity</span>
          <div className='quantity-box' style={{width: '100%',display: 'flex',justifyContent: 'space-between',alignItems: 'center',fontWeight: '600',padding: '5px',border: '1px solid #b9b5b5',borderRadius: '8px'}} >
              <div className='minus' style={{fontWeight: '600',cursor: 'pointer'}} onClick={handleCartProductDecrease} >
                  <RemoveCircleOutlineRoundedIcon size={20} />
              </div>                
              <div>{cartProduct.qty}</div>               
              <div className='plus' style={{fontWeight: '600',cursor: 'pointer'}} onClick={handleCartProductIncrease}>
                  <AddCircleIcon size={20} onClick={ }/>
              </div>
          </div>
          <div className='cart-price' style={{fontWeight: '600',color: '#e00a02'}}>R {cartProduct.TotalProductPrice}</div>
          <Button className='cart-btn' variant='contained' color='secondary' startIcon={<DeleteIcon />} fullWidth onClick={handleCartProductDelete}>DELETE</Button>            
      </div>
  )
}

function CartProducts({cartProducts,cartProductIncrease,cartProductDecrease}){
  return cartProducts.map((cartProduct)=>(
      <IndividualCartProduct
       key={cartProduct.ID}
        cartProduct={cartProduct}
        cartProductIncrease={cartProductIncrease}
           cartProductDecrease={cartProductDecrease}
        />
  ))
}
//=================================================== Purchase =======================
function Purchase(){
  return(
    <div>
        <Heder />
    </div>
  )
}
//=================================================== PurchaseHistory =======================
function PurchaseHistory(){
  return(
    <div>
        <Header />
    </div>
  )
}
//=================================================== Shipping =======================
function Shipping(){
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [flat, setFlat] = useState('');
  const [street, setStreet] = useState('');
  const [town, setTown] = useState('');
  const [emailError, setEmailError] = useState('');
 
  const clearInputs = () => {
    setEmail('');
    setPhone('')
    setFlat('')
    setStreet('')
    setTown('')
  };

  const clearErrors = () => {
    setEmailError('');
  };

  const submit = ()=>{ //add to firestore
    clearErrors()
    clearInputs()
  }

  return (
    <div className={classes.root}>
    <Grid container spacing={1}>
      <Grid id="Header" item xs={12}>
          <Header />
      </Grid>

      <Grid className={classes.register} item xs={12} id="register">
        <div style={{paddingLeft:'450px'}}> 
        <div id="form" style={{paddingTop:'5px', width:'400px', height:'300px', color:"#F6F6F6"}}>
        <h2 style={{ overflow: 'visible', whiteSpace: 'pre', fontSize: '46px', letterSpacing: '-2px', color: '#F6F6F6', lineHeight: '1.1',fontWeight: 700, fontStyle: 'normal', fontFamily: 'Arvo, serif', margin: 0 }}>
          Where Should we Deliver?
        </h2>
        <form autoComplete="off" >

        <input type="mail" margin="normal" required fullWidth id="email"  radius={8} placeholder="Email" label="" value={email} onChange={e => setEmail(e.target.value)}
         className={classes.inputs}/>
          <input margin="normal" required fullWidth name="Phone_number" type="text" placeholder="Phone Number"  value={phone} onChange={e => setPhone(e.target.value)} className={classes.inputs} />
          <input type="text" margin="normal" required fullWidth id="flat"  radius={8} placeholder="House\Flat number" label="" value={flat} onChange={e => setFlat(e.target.value)}className={classes.inputs}/>
         <input type="text" margin="normal" required fullWidth id="Surburb"  radius={8} placeholder="Surburb" label="" value={email} onChange={e => setEmail(e.target.value)} className={classes.inputs}/>
         <input type="text" margin="normal" required fullWidth id="street"  radius={8} placeholder="Street" label="" value={street} onChange={e => setStreet(e.target.value)}className={classes.inputs}/>
         <input type="text" margin="normal" required fullWidth id="town"  radius={8} placeholder="Town" label="" value={town} onChange={e => setTown(e.target.value)}className={classes.inputs}/>

          <Button type="submit" color="primary" variant="contained" className={classes.signupButton} startIcon={<ExitToAppRoundedIcon />} fullWidth onClick={submit} >Submit</Button>
        </form>
        </div>
        </div>
    </Grid>
    </Grid>
    </div>
  )
}
//=================================================== AddProducts =======================
function AddProducts(){
  const [title, setTitle]=useState('');
  const [description, setDescription]=useState('');
  const [price, setPrice]=useState('');
  const [category, setCategory]=useState('');
  const [image, setImage]=useState(null);
  //messages
  const [imageError, setImageError]=useState('')
  const [uploadError, setUploadError]=useState('')
  const [successMsg, setSuccessMsg]=useState('')
  const classes = useStyles();
  

  const types =['image/jpg','image/jpeg','image/png','image/PNG'];
  const handleProductImg=(e)=>{
      let selectedFile = e.target.files[0];
      if(selectedFile){
          if(selectedFile&&types.includes(selectedFile.type)){
              setImage(selectedFile);
              setImageError('');
          }
          else{
              setImage(null);
              setImageError('please select a valid image file type (png or jpg)')
          }
      }
      else{
          console.log('please select your file');
      }
  }

  const handleAddProducts=(e)=>{
      e.preventDefault();
      const uploadTask=storage.ref(`product-images/${image.name}`).put(image);
      uploadTask.on('state_changed',snapshot=>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
          console.log(progress);
      },error=>setUploadError(error.message),()=>{
          storage.ref('product-images').child(image.name).getDownloadURL().then(url=>{
              fs.collection('Products').add({
                  title,
                  category,
                  description,
                  price: Number(price),
                  url
              }).then(()=>{
                  setSuccessMsg('Product added successfully');
                  setTitle('');
                  setCategory('');
                  setDescription('');
                  setPrice('');
                  document.getElementById('file').value='';
                  setImageError('');
                  setUploadError('');
                  setTimeout(()=>{
                      setSuccessMsg('');
                  },3000)
              }).catch(error=>setUploadError(error.message));
          })
      })
  }

  return (

    <div className={classes.root}>
    <Grid container spacing={1}>
      <Grid id="Header" item xs={12}>
          <Header />
      </Grid>
      <Grid item xs={12} className={classes.register}> 
            <div style={{paddingLeft:'38%', textAlign:'center'}}>
          <div id="form" style={{paddingTop:'5px', width:'400px', height:'300px', color:"#F6F6F6"}}>
            <h2>ADD PRODUCTS</h2>
            <hr />
            {successMsg&&<>
              <div className='success-msg'>{successMsg}</div>
              <br></br>
          </>} 
          <form autoComplete="off" className='form-group' onSubmit={handleAddProducts}>
          <label>Product Title</label>
              <input type="text" className={classes.inputs} required
              onChange={(e)=>setTitle(e.target.value)} value={title} ></input>
              <br></br>
              <label>Product Category</label>
              <input type="text" className={classes.inputs} required
              onChange={(e)=>setCategory(e.target.value)} value={category}></input>
              <br></br>
              <label>Product Description</label>
              <input type="text" className={classes.inputs} required
              onChange={(e)=>setDescription(e.target.value)} value={description}></input>
              <br></br>
              <label>Product Price</label>
              <input type="number" className={classes.inputs} required
              onChange={(e)=>setPrice(e.target.value)} value={price}></input>
              <br></br>
              <label>Upload Product Image</label>
              <input type="file" id="file" className={classes.inputs} required
              onChange={handleProductImg}></input>
              
              {imageError&&<>
                  <br></br>
                  <div className='error-msg'>{imageError}</div>
                 
              </>}
              <br></br>           
              <div style={{display:'flex', justifyContent:'flex-end'}}>
                  <Button type="submit" className='btn' variant='contained' color='primary'>
                      ADD
                  </Button>
              </div>
          </form>
          {uploadError&&<>
                  <br></br>
                  <div className='error-msg'>{uploadError}</div>
              </>}
            </div>
            </div>
          </Grid>
        </Grid>
        </div>
  )
}
//=================================================== NotFound =======================
function NotFound(){

    return (
      <div>
          <Typography variant='h1'>Error 404 Not Found</Typography>
      </div>
  )
}//Complete