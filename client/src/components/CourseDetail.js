import React from 'react';
import Cookies from 'js-cookie';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends React.PureComponent{

    state = {
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: '',
        firstName: '',
        lastName: '',
        emailAddress: ''
    }

    /**
     * Fetches data to populate fields based on URL params.
     * If course does not exist, renders 'Not Found', else 'Unhandled Error'.
     */
    componentDidMount(){
        const { context, match }= this.props;
        const course = match.params.id;
        context.data.getCourse(course)
        .then((data) => {
            if (data === 'Course not found.'){
                this.props.history.push('/notfound')
            } else {    
                this.setState({ 
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    estimatedTime: data.estimatedTime,
                    materialsNeeded: data.materialsNeeded,
                    userId: data.User.id,
                    firstName: data.User.firstName,
                    lastName: data.User.lastName,
                    emailAddress: data.User.emailAddress
            })
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
        firstName,
        lastName,
        description,
        estimatedTime,
        materialsNeeded
    } = this.state

    // Determine user via context to display Update/Delete options if necessary
    let user;
    if (this.props.context.authenticatedUser){
        user = this.props.context.authenticatedUser.userInfo.id;
    }    
    const owner = this.state.userId;
    
    return(

        <div className="bounds">
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                    {/* Conditional determines if Logged-In User is Course Owner and renders Update/Delete buttons */}
                    {
                        (user === owner)
                        ?
                        <span>
                            <a className="button" href={'/courses/'+id+'/update'}>Update Course</a>
                            <button className="button" onClick={this.delete} href=''>Delete Course</button>
                        </span>
                        : null
                    }
                        <a className="button button-secondary" href="/">Return to List</a>
                    </div>
                </div>
            </div>
            <div className="bounds course--detail" key={id}>
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{title}</h3>
                        <p>By {firstName + ' ' + lastName}</p>
                    </div>
                    <div className="course--description">
                    <ReactMarkdown>
                        {description}
                    </ReactMarkdown>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <h3>{estimatedTime}</h3>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                    <ul>
                                    <ReactMarkdown>
                                        {materialsNeeded}
                                    </ReactMarkdown>
                                    </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> 
        </div>
    );
    }

    /**
     * Deletes course
     */
    delete =()=>{
        // Retrieve USER context and Course ID
        const { context } = this.props;
        const id = this.state.id;

        // Fetch decrypted password in order to validate against encrypted
        const password = Cookies.get('userPassword')

        // Pass above info to API and return USER to Main Page
        context.data.deleteCourse(id, context.authenticatedUser.userInfo, password)
        .then(
            this.props.history.push('/')
        )  
        .catch((err) => {
            console.log(err);
            this.props.history.push('/error');
        })
    }
};