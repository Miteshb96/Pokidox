import React from "react";
import classes from "./Header.module.css"

const Header = ({ title, description, extrahtml = null, className }) => {
    const wrapperClassName = className && className[0] ? className[0] : "";
    const LogoClassName = className && className[1] ? className[1] : "";
    return <header className={`${classes[wrapperClassName]} ${classes.header}`} >
        <h2 className={`${classes[LogoClassName]} ${classes.logo}`}>{title} </h2>
        <span className={classes.pipe}></span>
        <div>{description}</div>
        {extrahtml !== null &&
            <>
                <span className={classes.pipe}></span>
                {extrahtml}
            </>
        }
    </header>
}

export default Header;