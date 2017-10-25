import React, { Component } from "react";
import Schedule from '../explorer/schedule';

export default class Explorer extends Component {
    render() {
        return (
            <div>
                <Schedule />
                <div id="contact">This is the explorer me page.</div>
            </div>
        );
    }
}
