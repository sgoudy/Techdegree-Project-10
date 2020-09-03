import React from 'react';

export default class Courses extends React.PureComponent{

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

    componentDidMount(){

        let path = window.location.pathname;
        let url = 'http://localhost:5000/api' + path;

        fetch(url)

        .then(res => (res.json()))
        .then((data) => {
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
        })
        .catch(error => {
            console.log('Error fetching and parsing results', error);
    })};
        
    componentDidUpdate(){
        this.props.onUpdate(this.state)
    }
    

    render(){

    let materials = [];
    if (this.state.materialsNeeded){
        materials = this.state.materialsNeeded.split('*');
    }
    // Remove first bullet point... contains no data
    let mats;
    if (materials){
        mats = materials.map((item, index)=> <li key={index}>{item}</li>)
    }
    const items = mats.filter(item => item.key >0)
    
    return(

        <div className="bounds">

            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <span>
                        <a className="button" href={'/courses/'+this.state.id+'/update'}>Update Course</a>
                        <a className="button" href="/">Delete Course</a>
                        </span>
                        <a className="button button-secondary" href="/">Return to List</a>
                    </div>
                </div>
            </div>

            <div className="bounds course--detail" key={this.state.id}>
                
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{this.state.title}</h3>
                        <p>By {this.state.firstName + ' ' + this.state.lastName}</p>
                    </div>
                    <div className="course--description">
                    <p>{this.state.description}</p>
                    </div>
                </div>

                <div className="grid-25 grid-right">
                    <div className="course--stats">
                    <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <h3>{this.state.estimatedTime}</h3>
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <ul>
                                {items}
                            </ul>
                        </li>
                    </ul>
                    </div>
                </div>

            </div> 
      
        </div>
   
    )
    }
}