import React, {Component} from "react";
import logo from "./logo.svg"

class TopBar extends Component{
    render(){
        return(
            <nav className='HeaderBarre'>
                <img src={logo} className="HeadBarre_logo" alt="logo" />
                <div className="HeaderBarre_texte">
                    <h1 className="HeaderBarre_titre">React Calculator</h1>
                    <h2 className="HeaderBarre_soustitre">by Marcel LE & Willy MOREL</h2>
                </div>
            </nav>
        )
    }
}

export default TopBar