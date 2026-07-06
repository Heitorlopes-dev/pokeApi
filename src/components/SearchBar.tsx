import React from 'react';

interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border-2 border-blue-400 rounded-lg p-2 m-4 w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
    )
}