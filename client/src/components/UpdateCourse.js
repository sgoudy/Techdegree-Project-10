import React from 'react';

export default class UpdateCourse extends React.PureComponent{
    
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
         
        let path = this.props.props.location.pathname;
        let url = 'http://localhost:5000/api' + path;
        let newURL = url.slice(0,35);
     
        fetch(newURL)

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
        })
    };


     /**
     *  @param {event} e Event handler.
     */
   
    handleSubmit = (e) => {
        e.preventDefault();
        this.setHistory();
        // this.props.onSearch(this.query.value);

        e.currentTarget.reset();
      }


    setHistory(){
        let path = `/courses/${this.state.id}`;
        this.props.props.history.push(path);
    }
  
    
    render(){

        

    return(
        <div className="bounds course--detail">
        <h1>Update Course</h1>
            <div>
                <form onSubmit={this.handleSubmit}>
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
                                    value={this.state.title}
                                    onChange={this.change} />
                                    
                            </div>
                            <p>By Joe Smith</p>
                        </div>
                        <div className="course--description">
                            <div>
                                <textarea 
                                    id="description" 
                                    name="description" 
                                    placeholder="Course description..."
                                    value={this.state.description}
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
                                            value={this.state.estimatedTime}
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
                                            value={this.state.materialsNeeded} 
                                            onChange={this.change} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit" href="/courses/">Update Course</button>
                        <a className="button button-secondary" href='/' onClick={this.cancel}>Cancel</a>
                    </div>
                </form>
            </div>
        </div>

        )
    }
change =(event)=>{
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
        return {
        [name]: value
        };
    });
}

cancel = ()=> {
    this.props.history.push('/');
}


}