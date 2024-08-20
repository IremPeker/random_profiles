import React, { useState } from "react";
import '../styles/randomProfiles.scss';
import { ResultItem, LocationProps } from "../utils/users.definitions";

const RandomProfiles : React.FC<RandomProfilesProps> = ({profiles, handleDelete}): JSX.Element => {
    const defaultVisibillity = false;
    const [visible, setVisible] = useState<Record<number, boolean>>({});

    const isVisible = (id: number): boolean => visible[id] || defaultVisibillity;

    const handleClick = (id: number): void => {
        setVisible({
            ...visible,
            [id]: !isVisible(id)
        });
    };

    const getFullName = (firstName: string, lastName: string, title: string): string => {
        const fullName = `${title} ${firstName} ${lastName}`;
        return fullName;
    };

  
    const getAddress = (location : LocationProps): string => {
        const { street, city, state } = location;
        const {name, number} = street;
        const address = `${name}, ${number}, ${city}, ${state}`;
        return address;
    };

    return (
        <ul data-testid="list" className="listWrapper">
            {profiles?.map((profile, index) => 
                <li data-testid="listItem" className="listWrapper--listItem" key={index}>
                    <button data-testid="deleteProfile" onClick={(e) => {e.preventDefault(); handleDelete(index)}}>Delete Profile</button>
                    <div data-testid="contentWrapper" className="listWrapper--listItem--contentWrapper">
                        {isVisible(index) ?
                            <ul data-testid="profileDetails" className="listWrapper--listItem--contentWrapper--details">
                                <li>E-mail: {profile.email}</li>    
                                <li>Phone: {profile.cell}</li>   
                                <li>Address: {getAddress(profile.location)}</li>    
                                <li>Postal Code: {profile.location.postcode}</li>    
                                <li>Age: {profile.dob.age}</li>    
                            </ul>
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
                        onClick={() => handleClick(index)}
                    >
                        {!isVisible(index) ? 'Show Details' : 'Hide Details'}
                    </button>
                </li>
            )}
        </ul>
    );
}

export default RandomProfiles;

interface RandomProfilesProps {
    profiles: ResultItem[];
    handleDelete: (index: number) => void;
}