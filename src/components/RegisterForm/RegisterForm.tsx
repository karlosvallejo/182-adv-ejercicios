import * as React from 'react';

import './RegisterForm.css';

interface HeaderProps {
    title: string;
}

export const RegisterForm = ({ title }: HeaderProps) => {
    return <div className="RegisterForm">
        <h1>{title}</h1>
    </div>;
};