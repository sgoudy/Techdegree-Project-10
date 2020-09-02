import React from 'react';

export default class Courses extends React.PureComponent{

    state = {
        course: []
      }

    componentDidMount(){
    fetch('http://localhost:5000/api/courses/:id')
    .then(res => res.json())
    .then((data) => {
        this.setState({ course: data})
    })
    .catch(console.log)
    };

    render(){

    const data = this.state.course;
    return(

        <div className="bounds">
        {data.map((title, index) => {
        return (
    
            <div key={index} className="grid-33">
                <a className="course--module course--link" href="/courses/:id">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{title}</h3>
                </a>
            </div> 
        
        )
       
    })}
    </div>
    )      
    }
}