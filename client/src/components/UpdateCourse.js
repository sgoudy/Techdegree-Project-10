import React from 'react';

export default class UpdateCourse extends React.PureComponent{
    
    state={
        course: []
    }

     /**
     *  @param {event} e Event handler.
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.setHistory();
        // this.props.onSearch(this.query.value);
        // this.props.loading();
        e.currentTarget.reset();
      }


    setHistory(){
        console.log(window)
    }
    
    render(){

    const url = window.location;

        
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
                            value="Build a Basic Bookcase"
                        />
                            
                    </div>
                    <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                    <div>
                        <textarea 
                            id="description" 
                            name="description" 
                            className="" 
                            placeholder="Course description..."
                        />
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
                                value="14 hours"
                            /> 
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
                            />
                        </div>
                    </li>
                    </ul>
                </div>
                </div>
                <div className="grid-100 pad-bottom">
                    <a className="button" type="submit" href="/courses/course-detail">Update Course</a>
                    <a className="button button-secondary" href='/'>Cancel</a>
                </div>
            </form>
            </div>
        </div>

        )
    }
}