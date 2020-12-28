import React,{ Component} from "react";
import { withRouter } from "react-router-dom";


class Form extends Component {

  constructor(props){
    super(props);
    this.state={
      name:"",
      email:"",
      password:"",
      age:"",
      gender:"",
      address:""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.setUserDetails(this.state);
    this.props.history.push("/catalouge");
  };

  handleChange=(e)=>{
    this.setState({...this.state, [e.target.name]:e.target.value});
  }

  render(){
  return (
    <div>
    <form onSubmit={this.handleSubmit} className="box">
        Name:
        <input
          className="name block"
          placeholder="Enter Name"
          onChange={this.handleChange}
          name="name"
          type="text"
        />
        Email:
        <input
          className="email block"
          placeholder="Enter Email"
          onChange={this.handleChange}
          type="email"
          name="email"
        />
        Password:
        <input
          className="password block"
          placeholder="Enter Password"
          onChange={this.handleChange}
          type="password"
          name="password"
        />
        age:
        <input
          className="age block"
          placeholder="Enter age"
          onChange={this.handleChange}
          type="number"
          name="age"
        />
        Gender:
        <select
          className="block"
          onChange={this.handleChange}
          name="gender"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        Address
        <input
          type="text"
          placeholder="Enter Address"
          className="block"
          onChange={this.handleChange}
          name="address"
        />
        <input name="send" type="submit" className="block" />
      </form>
    </div>
  );
  }
}


export default withRouter(Form);