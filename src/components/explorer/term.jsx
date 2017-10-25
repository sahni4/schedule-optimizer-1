import React from 'react';
import Subject from './subject';

export default class Term extends React.Component {
    render() {
        return (
            <div>
                <h2>Term</h2>
                <p>This is a term.</p>
                <Subject />
            </div>
        );

    }
}
