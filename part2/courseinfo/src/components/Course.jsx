import { useState, useEffect } from 'react';

const Title = ({ title }) => {
  return <h2>{title}</h2>;
};

const Content = ({ parts }) => {
  const [ex, setEx] = useState(0);

  const copy = [...parts];
  const total = copy.reduce((sum, el) => sum + el.exercises, 0);

  useEffect(() => {
    setEx(total);
  }, [total]);

  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      ))}
      <div>
        <b>total of {ex} exercises</b>
      </div>
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <div>
      {name} {exercises}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {course.map((course) => (
        <div key={course.name + 'div'}>
          <Title key={course.name} title={course.name} />
          <Content key={course.name + ' content'} parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
