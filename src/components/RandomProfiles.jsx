import React, { useState } from "react";
import '../styles/randomProfiles.scss';

const RandomProfiles = (props) => {
    const { profiles, handleDelete } = props;
    const defaultVisibillity = false;
    const [visible, setVisible] = useState({});
    const isVisible = (id) => visible[id] || defaultVisibillity;

    const handleClick = (id) => () => {
        setVisible({
            ...visible,
            [id]: !isVisible(id)
        });
    };

    const getFullName = (firstName, lastName, title) => {
        const fullName = `${title} ${firstName} ${lastName}`;
        return fullName;
    };

    const getAddress = (street, city, state, postcode) => {
        const { name, number } = street;
        const address = `${name}, ${number}, ${city}, ${state} ${postcode}`;
        return address;
    };

    return (
        <ul data-testid="list" className="listWrapper">
            {profiles?.map((profile, index) => 
                <li data-testid="listItem" className="listWrapper--listItem" key={index}>
                    <button data-testid="deleteProfile" onClick={(e) => {e.preventDefault(); handleDelete(index)}}>Delete Profile</button>
                    <div data-testid="contentWrapper" className="listWrapper--listItem--contentWrapper">
                        {isVisible(index) ?
                            <div data-testid="profileDetails" className="listWrapper--listItem--contentWrapper--details">
                                <p>E-mail: {profile.email}</p>    
                                <p>Phone: {profile.cell}</p>   
                                <p>Address: {getAddress(profile.location.street, profile.location.city, profile.location.state, profile.location.postcode)}</p>    
                                <p>Postal Code: {profile.location.postcode}</p>    
                                <p>Age: {profile.dob.age}</p>    
                            </div>
                            :
                            <div data-testid="profileGeneral" className="listWrapper--listItem--contentWrapper--general">
                                <h4 data-testid="listFullName" className="listWrapper--listItem--contentWrapper--general--fullName">
                                    {getFullName(profile.name.first, profile.name.last, profile.name.title)}
                                </h4>
                                <div data-testid="imageWrapper" className="listWrapper--listItem--contentWrapper--general--imageWrapper imageWrapper">
                                    <img 
                                        data-testid="image"
                                        className="listWrapper--listItem--contentWrapper--general--imageWrapper--image"
                                        loading="lazy"
                                        src={profile.picture.medium} 
                                        alt={`Profile of a ${profile.gender}`} 
                                    />
                                </div>
                            </div>
                        }
                    </div>
                    <button 
                        type="button"
                        data-testid="toggleDetails"
                        className="listWrapper--listItem--detailsButton" 
                        onClick={handleClick(index)}
                    >
                        {!isVisible(index) ? 'Show Details' : 'Hide Details'}
                    </button>
                </li>
            )}
        </ul>
    );
}

export default RandomProfiles;