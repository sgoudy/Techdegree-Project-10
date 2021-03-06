import React from 'react';

export default class Courses extends React.PureComponent{

    state = {
        courses: []
    }

    /**
     * Fetches courses from DB.
     * If server or other error, renders 'Unhandled Error'.
     */
    componentDidMount(){
        const { context } = this.props;
        context.data.getCourses()
        .then((data) => {
            this.setState({ courses: [...data] });
            this.props.history.push('/')
        })
        .catch(err => {
            console.log('Error fetching and parsing results', err);
            this.props.history.push('/error');
        })
    };

    render(){
    return(

        <div className="bounds">
        {/* Retrieves Array of Courses and Maps Items as Individual Courses on Homepage */}
            {this.state.courses.map((courses, index) => {
                return (
                <div key={index} className="grid-33">
                    <a className="course--module course--link" href={'/courses/' + courses.id} >
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{courses.title}</h3>
                    </a> 
                </div> 
                )
            })}
            <div className="grid-33">
                <a className="course--module course--add--module" href="/courses/create">
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
                    New Course
                </h3>
                </a>
            </div>  
        </div>      
    );        
    }
};