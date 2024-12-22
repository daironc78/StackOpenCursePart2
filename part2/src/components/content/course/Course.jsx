import Content from "../Content";
import Header from "../header/Header";

const Course = ({ course }) => {
    const CourseConfig = ({ courses }) => {
        return (
            <div>
                <Header title={courses.name} />
                <Content parts={courses.parts} />
            </div>
        )
    }

    return (
        <div>
            <h1>Web development curriculum</h1>
            {course.map(courseConfig => <CourseConfig key={courseConfig.id} courses={courseConfig} />)}
        </div>
    )
}

export default Course