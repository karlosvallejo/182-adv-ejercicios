import * as React from 'react';

import './LoginForm.css';

interface HeaderProps {
    title: string;
}

export const LoginForm = ({ title }: HeaderProps) => {
    return <div className="LoginForm">
        <h1>{title}</h1>
    </div>;
};