import { useState } from "react";
import { FaBell } from "react-icons/fa";

export default function Navbar({ title, children }) {
    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {
                            children
                        }
                    </ul>
                </div>
                <a className="text-2xl font-medium">{title}</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-x-4">
                    {
                        children
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn btn-ghost"><FaBell /></a>
            </div>
        </div>
    )
}

export function ItemNav({ label, isSelected, onClick }) {
    return (
        <li><a onClick={onClick} className={isSelected ? 'bg-blue-600 rounded-md text-white' : ''}>{label}</a></li>
    )
}