import React, {Component} from 'react';
import Cookies from 'js-cookie';


export default class CreateCourse extends Component{
    state={
      
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: ''
    }
    
    
    render(){

    const {
    
        title,
        description,
        estimatedTime,
        materialsNeeded,
        errors
    } = this.state;

    return(

        <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>

        {
            ( errors.length)
                        ?
                        <div>
                        <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors"> 
                            <ul>
                                <li> {errors} </li>
                            </ul>
                            </div> 
                        </div>
                        : null
                    }
                    
          <form onSubmit={this.submit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                <input 
                    id="title" 
                    name="title" 
                    type="text" 
                    className="input-title course--title--input" 
                    placeholder="Course title..."
                    value={title}
                    onChange={this.change}/>
                </div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div>
                <textarea 
                    id="description" 
                    name="description" 
                    placeholder="Course description..."
                    value={description}
                    onChange={this.change}/>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                    <input 
                        id="estimatedTime" 
                        name="estimatedTime" 
                        type="text" 
                        className="course--time--input"
                        placeholder="Hours" 
                        value={estimatedTime}
                        onChange={this.change}/>
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                    <textarea 
                        id="materialsNeeded" 
                        name="materialsNeeded" 
                        className="" 
                        placeholder="List materials..."
                        value={materialsNeeded}
                        onChange={this.change}/>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
            <button className="button" type="submit" >Create Course</button>
            <button className="button button-secondary" onClick={this.cancel} href='/'>Cancel</button>
            </div>
          </form>
        </div>
        </div>
        
    )
    }

    submit=(e)=>{
        e.preventDefault();
        const { context } = this.props;

        const {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
        } = this.state;
        const course = {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded
        };
        // Fetch decrypted password in order to validate against encrypted
        const password = Cookies.get('userPassword')
        
        context.data.updateCourse(course, context.authenticatedUser.userInfo, password)
        .then((course) => {
            if (course === null) {
                this.setState(() => {
                return { errors: [ 'Update was unsuccessful' ] };
            });
            } else {
                const path = `/courses/${id}`
                this.props.history.push(path);
            }})
        .catch((err) => {
            console.log(err);
            this.props.history.push('/errors');
          })
        
      }

    

    change = (event) =>{
        const name= event.target.name;
        const value= event.target.value;
        this.setState(() =>{
            return {
                [name]: value
            }
        }
        )    
    }

    cancel =(e) =>{
        e.preventDefault();
        this.props.history.push('/')
    }

}