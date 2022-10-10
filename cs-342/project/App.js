

class App extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = { center: <h2>Products</h2>, loggedin: false};
    this.setCenterLogin = this.setCenterLogin.bind(this);
    this.setCenterProducts = this.setCenterProducts.bind(this);
    this.setCenterRegister = this.setCenterRegister.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.showShoppingCart = this.showShoppingCart.bind(this);

    this.setCenterProducts();

    this.shoppingcart = new Array();
  }



 /***********************************************************************
   * loginSubmit
   * 
   ***********************************************************************/
  loginSubmit(e)
  {
    e.preventDefault();
    let valid = true;
    let defaultMsg = "Please fill out all fields";

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    //check for any fields not filled out
    if (username == "" || password == "")
    {
        alert(defaultMsg);
        valid = false;
    }

    if (valid)
    {
        this.checkLogin(this, username, password);
    }
  }

  /*
  * checkLogin
  */
  checkLogin(that, username, password)
  {
    let myPromise = new Promise(function(myResolve, myReject) {
       let req = new XMLHttpRequest();
       req.open('POST', "controller.php", true);
       req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
       req.onload = function() {
         if (req.status == 200) 
         {
           myResolve(req.response);
         } 
         else 
         {
           myReject("Database Error");
         }
       };
 
       let params = "action=login&username=" + username +
                    "&password=" + password;
       req.send(params);
       
     });
     
     myPromise.then(
       function(value) {that.loginStatus(value)},
       function(error) {that.loginStatus(error);} 
     );
  }

  //loginStatus
  loginStatus(statusMsg)
  {
        if (statusMsg == "1")
        {
            sessionStorage.setItem("loggedin", "TRUE");
        }
        else
        {
            alert("Login Failure");
        }
  }

   /***********************************************************************
   * setCenterLogin
   * 
   ***********************************************************************/
  setCenterLogin()
  {
    this.setState(
      
      {center: 
      <div>
      
      <div className="login">
      <h1>Login</h1>
      <form onSubmit={this.loginSubmit}>
        <label for="username">
              <i className="fas fa-user"></i>
        </label>
        <input type="text" id="username" name="username" placeholder="username" />
        <label for="password">
               <i className="fas fa-lock"></i> 
        </label>                 
        <input type="password" id="password" name="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
      </div>
      </div>
    }
    );  
  }
  
  /***********************************************************************
   * registerSubmit
   * 
   ***********************************************************************/
  registerSubmit(e)
  {
    e.preventDefault();

    let valid = true;
    let defaultMsg = "Please fill out all fields";

    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let email2 = document.getElementById("email2").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;

    //check for any fields not filled out
    if (firstname == "" || lastname == "" || phone == "" || email == "" || username == "" || password == "")
    {
        alert(defaultMsg);
        valid = false;
    }
    //check length of firstname
    if (firstname.length > 30 && valid)
    {
        alert("Firstname too powerful for our database, sorry");
        valid = false;
    }
    //check length of lastname
    if (lastname.length > 30 && valid)
    {
        alert("Lastname too powerful for our database, sorry");
        valid = false;
    }
    //check phone number for valid format
    let validPhoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	if (!phone.match(validPhoneRegex) && valid)
    {
		alert("Invalid phone number");
		valid = false;
	}
    //check if email address is valid
    let validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.length > 100 && !email.match(validEmailRegex) && valid)
    {
        alert("Invalid email address");
        valid = false;
    }
    //check if email2 matches email
    if (email != email2 && valid)
    {
        alert("Emails do not match");
        valid = false;
    }
    //check length of username
    if ((username.length > 50 || username.length < 4) && valid)
    {
        alert("Username length must be 4-50");
        valid = false;
    }
    //check if password length
    if ((password.length < 4 || password.length > 255) && valid)
    {
        alert("Password length must be 4-255");
        valid = false;
    }
    //check if password contains 3 of same letter in a row
    let regexPat1 = /([A-Za-z])\1{2}/;
    if (password.match(regexPat1) && valid)
    {
        alert("Password must not contain three of same letter in a row ('aaa')");
        valid = false;
    }
    //check if password contains (){}[]
    let regexPat2 = /[{}()\[\]]/;
    if (password.match(regexPat2) && valid)
    {
        alert("Password must not contain any of the following characters (){}[]");
        valid = false;
    }
    //check if passwords match
    if (password != password2 && valid)
    {
        alert("Passwords must match");
        valid = false;
    }

    if (valid)
    {
        //alert("VALID");
        this.setRegistration(this, firstname, lastname, phone, email, username, password);
    }
  }

  /***********************************************************************
   * registerStatus
   * 
   ***********************************************************************/
  registerStatus(statusMsg)
  {
    alert(statusMsg);
  }

  /***********************************************************************
   * setRegistration
   * 
   ***********************************************************************/
   setRegistration(that, firstname, lastname, phone, email, username, password)
   {
    
     let myPromise = new Promise(function(myResolve, myReject) {
       let req = new XMLHttpRequest();
       req.open('POST', "controller.php", true);
       req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
       req.onload = function() {
         if (req.status == 200) 
         {
           myResolve(req.response);
         } 
         else 
         {
           myReject("Database Error");
         }
       };
 
       let params = "action=register&firstname=" + firstname + 
                    "&lastname=" + lastname +
                    "&phone=" + phone +
                    "&email=" + email +
                    "&username=" + username +
                    "&password=" + password;
       req.send(params);
       
     });
     
     myPromise.then(
       function(value) {that.registerStatus(value)},
       function(error) {that.registerStatus(error);} 
     );
  }

  /***********************************************************************
   * setCenterRegister
   * 
   ***********************************************************************/     
  setCenterRegister()
  {
    this.setState(

      { center: 
      
        <div>
          <div className="register">
            <h1>Register for a New Account</h1>
      
            <form onSubmit={this.registerSubmit}>
            <h2>Your Information</h2>
            <input type="text" id="firstname" name="firstname" placeholder="first name" />
      
            <input type="text" id="lastname" name="lastname" placeholder="last name" />
      
            <input type="text" id="phone" name="phone" placeholder="phone ###-###-####" />
            <input type="text" id="email" name="email" placeholder="email address" />
            <input type="text" id="email2" name="email2" placeholder="email address again" />
      
            <h2>Log In Information</h2>
              <input type="text" id="username" name="username" placeholder="username"/>
              <input type="password" id="password" name="password" placeholder="password"/>
              <input type="password" id="password2" name="password2" placeholder="password again"/>
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      }
      );
  }

  //add to cart
  addToCart(pid, name, price)
  {
    let loggedIn = sessionStorage.getItem("loggedin");
    let sID = sessionStorage.getItem("sID");

    if (loggedIn != null || loggedIn == "TRUE")
    {
        let temp = null;
        for (let i = 0; i < this.shoppingcart.length; i++)
        {
            let element = this.shoppingcart[i];
            if (element.pid == pid)
            {
                temp = element;
                break;
            }
        }
        if (temp == null)
        {
            let temp = new Object();
            temp.pid = pid;
            temp.quantity = 1;
            temp.name = name;
            temp.price = price;
            this.shoppingcart.push(temp);
        }
        else
        {
            temp.quantity++;
        }
    }
  }

  //

  //show shopping cart
  showShoppingCart()
  {
        if (this.shoppingcart.length < 1)
        {
            this.setState({
                center:
                    <div>
                        <h1>No Items in Cart</h1>
                    </div>
            });
        }
        else
        {
            this.setState({
            center:
                <div>
                    <h1>Items in Cart</h1>
                    <table id="shoppingcart">
                    <tr><th>
                        <span>NAME</span>
                    </th><th>
                        <span>COST</span>
                    </th><th>
                        <span>QTY</span>
                    </th></tr>
                    {this.shoppingcart.map(prod => 
                        (
                            <tr><td>
                                <span>{prod.name}</span>
                            </td><td>
                                <span>{prod.price}</span>
                            </td><td>
                                <span>{prod.quantity}</span>
                            </td></tr>
                        ))}
                    </table>
                </div> 
            });
        }
  }

  /***********************************************************************
   * adjustData
   * 
   ***********************************************************************/
  adjustData(someData) 
  {
    let data = JSON.parse(someData);

    this.setState({center: data.map(prod => 

      (
    
        <div key={prod.id} className="product">
          
          <span className="productName">{prod.name}</span><br />
          <img className="productImage" src={prod.image} /><br />
          
          <span className="productDesc">{prod.description}</span><br />
          <span className="productPrice">{prod.price}</span><br />
          <input type="hidden" value={prod.qoh} />
          <span className="productAvail">{(prod.qoh > 0) ? "In Stock" : "Out of Stock"}  </span><br />
          <button onClick={() => this.addToCart(prod.id, prod.name, prod.price)} className="productAdd">Add To Cart</button>
  
        </div> 
      )
    )    
    });
  }

  /***********************************************************************
   * setCenterProducts
   * 
   ***********************************************************************/
  setCenterProducts()
  {
    this.getProductData(this);
  }

  /***********************************************************************
   * getProductData
   * 
   ***********************************************************************/
  getProductData(that)
  {

    let myPromise = new Promise(function(myResolve, myReject) {
      let req = new XMLHttpRequest();
      req.open('POST', "controller.php", true);
  	  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      req.onload = function() {
        if (req.status == 200) {
          myResolve(req.response);
        } else {
          myReject("Database Error");
        }
      };

      let params = "action=products";
      req.send(params);
      
    });
    
    myPromise.then(
      function(value) {that.adjustData(value)},
      function(error) {that.adjustData(error);} 
    );
  }

  render() 
  {
    return (
      <div>
          <div id="container">

            <div id="header">
              <h1>Record Shop</h1>
              <a onClick={this.showShoppingCart}>
                <i className="cart fa fa-shopping-cart" aria-hidden="true"></i>
              </a>
            </div>

            <div id="nav">
              <ul>
                <li><a onClick={this.setCenterProducts}>Home</a></li>
                <li><a onClick={this.setCenterLogin}>Login</a></li>
                <li><a onClick={this.setCenterRegister}>Register</a></li>
              </ul>
            </div>

            <div id="sidebar">
              <h3>Side Bar</h3>
              <p class="news">Here
              </p>
            </div>

            <div id="center">
              {this.state.center}

              <div id="footer"> Copyright &copy; 2021 <br /> 
              
              </div>
            </div>
          </div>
      </div>
    );
  }

}


ReactDOM.render(
  <App />,
  document.getElementById('main')
);
