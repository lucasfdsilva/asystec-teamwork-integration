import React, { useState } from 'react';
import api from '../../services/api'

import './style.css';

export default function Home() {
    const [projectId, setProjectId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [projectName, setProjectName] = useState('');

    async function createProject(event) {
        event.preventDefault();

        api.post(`/newproject/${projectId}/${customerName}/${projectName}`);
    }

    return (
        <>
            <div className="projectContent">
                <p>This is the project page</p>

                <form onSubmit={createProject}>

                    <label>Project ID</label>
                    <input
                        id="projectIdInput"
                        placeholder="Salesforce Project ID"
                        value={projectId}
                        onChange={event => setProjectId(event.target.value)}
                    />

                    <label>Customer Name</label>
                    <input
                        id="customerNameInput"
                        placeholder="Customer Name"
                        value={customerName}
                        onChange={event => setCustomerName(event.target.value)}
                    />

                    <label>Project Name</label>
                    <input
                        id="projectNameInput"
                        placeholder="Salesforce Project Name"
                        value={projectName}
                        onChange={event => setProjectName(event.target.value)}
                    />

                    <button className="btn" type="submit">Create a new Project</button>

                </form>

            </div>
        </>
    );
}