import React from 'react';
import Course from './course';

export default class Subject extends React.Component {
    render() {
        return (
            <div>
                <h3>Subject</h3>
                <p>This is a subject.</p>
                <Course />
            </div>
        );

    }
}
