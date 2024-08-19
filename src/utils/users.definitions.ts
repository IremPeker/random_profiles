export interface RandomUserData {
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
    location: {
      street: {
        number: number;
        name: string;
      };
      city: string;
      state: string;
      country: string;
      postcode: string;
    };
    info: {
      seed: string;
    };
    results: any[];
}
  