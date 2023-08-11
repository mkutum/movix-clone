import React from 'react';
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { Link } from 'react-router-dom';


const NotFoundPage = () => {
    return (
        <div className='pageNotFound'>
            <ContentWrapper>
                <span className="bigText">404</span>
                <span className="Text">Sorry ! Page is not available <Link to="/">{" "}Home</Link>
                </span>
            </ContentWrapper>

        </div>
    )
}

export default NotFoundPage