import React from "react";
import '../styles/errorOverlay.scss';

const ErrorOverlay = () => {
    return (
        <div data-testid="error-overlay" className="errorOverlay">
            <div className="errorOverlay--textWrapper">
                <p>Sorry! Something went wrong while fetching the data!</p>
                <p>
                    Please try refreshing the browser, or contact the developer! 
                </p>
            </div>
        </div>
    );
}

export default ErrorOverlay;