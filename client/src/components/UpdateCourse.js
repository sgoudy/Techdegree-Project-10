import React from 'react';
import Cookies from 'js-cookie';


export default class UpdateCourse extends React.PureComponent{
    
    state = {
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        owner: {},
        errors: ''
      }

    componentDidMount(){
        const { context, match }= this.props;
        const course = match.params.id;
        context.data.getCourse(course)
        .then((data) => {
            if (data === 'Course not found.'){
                this.props.history.push('/notfound')
            } else if (data.User.id === context.authenticatedUser.userInfo.id){
                this.setState({ 
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    estimatedTime: data.estimatedTime,
                    materialsNeeded: data.materialsNeeded,
                    owner: data.User
                })
            }
            else { 
               this.props.history.push('/forbidden')
            }
        })
        .catch(err => {
            console.log('Error fetching and parsing results', err);
            this.props.history.push('/error');
        })
    };

    render(){
        
    const {
        id,
        title,
        description,
        estimatedTime,
        materialsNeeded,
        owner,
        errors
    } = this.state;
        
    console.log(errors)

    return(

        <div className="bounds course--detail">
        <h1>Update Course</h1>
            <div>
            {/* Conditional to show validation errors at top of form upon submission */}
                {
                    (errors.length)
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
                                    onChange={this.change} />
                                    
                            </div>
                            <p>By {owner.firstName + ' ' + owner.lastName}</p>
                        </div>
                        <div className="course--description">
                            <div>
                                <textarea 
                                    id="description" 
                                    name="description" 
                                    placeholder="Course description..."
                                    value={description}
                                    onChange={this.change} />
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
                                            value={
                                                estimatedTime
                                                ? estimatedTime
                                                : ''
                                            }
                                            onChange={this.change} />
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
                                            value=
                                            {
                                                materialsNeeded
                                                ? materialsNeeded
                                                : '' 
                                            } 
                                            onChange={this.change} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Update Course</button>
                        <a className="button button-secondary" href={'/courses/'+id} onClick={this.cancel}>Cancel</a>
                    </div>
                </form>
            </div>
        </div>
        )
    }

    /**
     * Updates state when data is entered
     * @param {event} e 
     */
    change =(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    /**
     * Submits Updated Course to API for change in DB
     * @param {e} event
     */
    submit = (e) => {
        e.preventDefault();
        // Retrieve USER context and Course Body
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

        // Pass above info to API and return USER to Course Detail Page
        context.data.updateCourse(course, context.authenticatedUser.userInfo, password)
        .then( errors => { 
            // Display Express Validation
            if (errors.length) {
                this.setState({ errors });
            } 
            else {
                this.props.history.push('/courses/'+course.id)   
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
    cancel = (e)=> {
        e.preventDefault();
        const course = this.state.id
        this.props.history.push('/courses/'+course);
    }
};