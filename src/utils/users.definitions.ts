export interface RandomUserData {
    results: ResultItem[];
   
    info: {
        results: number;
        page: number;
        seed: string;
        version: string;
    };
}

export interface ResultItem {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    dob: {
        age: number;
    };
    picture: {
        medium: string;
    }
    email: string;
    cell: string;
    location: LocationProps;
}

export interface LocationProps {
    street: {
        number: number;
        name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
}
        