import React, {Component} from 'react';
import Cookies from 'js-cookie';


export default class CreateCourse extends Component{
    state={
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: this.props.context.authenticatedUser.userInfo.id,
        firstName: this.props.context.authenticatedUser.userInfo.firstName,
        lastName: this.props.context.authenticatedUser.userInfo.lastName,
        errors: []
    }
    
    render(){

    const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        firstName,
        lastName,
        errors
    } = this.state;

    return(

        <div className="bounds course--detail">
            <h1>Create Course</h1>
                <div>
                {/* Conditional to show validation errors at top of form upon submission */}
                {
                    ( errors.length)
                    ?
                    <div>
                    <h2 className="validation--errors--label">Validation errors</h2>
                        <div className="validation-errors"> 
                        <ul>
                            {errors.map((error, i) => <li key={i}>{error}</li>)}
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
                                <p>By {firstName+' '+lastName}</p>
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
    );
    }

    /**
     * Updates state when data is entered
     * @param {event} e 
     */
    change = (e) =>{
        const name= e.target.name;
        const value= e.target.value;
        this.setState(() =>{
            return {
                [name]: value
            }
        })
    };

    /**
     * Submits Course to API for addition to DB
     * @param {e} event
     */
    submit=(e)=>{
        e.preventDefault();
        // Retrieve USER context and Course Body
        const { context } = this.props;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        } = this.state;
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        };

        // Fetch decrypted password in order to validate against encrypted
        const password = Cookies.get('userPassword')
//TODO set history to new course detail page
        // Pass above info to API and return USER to Main Page
        context.data.createCourse(course, context.authenticatedUser.userInfo, password)
        .then( errors => { 
            if (errors.length > 0) {
                this.setState({ errors });
            } 
            else {
                this.props.history.push('/')   
                }
            })
        .catch((err) => {
            console.log(err);
            this.props.history.push('/error');
        });
    }
    
    /**
     * Cancels action and returns user to Main Page.
     * @param {event} e 
     */
    cancel =(e) =>{
        e.preventDefault();
        this.props.history.push('/')
    }
}