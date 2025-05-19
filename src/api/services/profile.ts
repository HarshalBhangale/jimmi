import axiosClient from '../index';
import routes from '../routes';


export interface IAddress {
    postcode: string;
    city: string;
    address1: string;
    address2: string;
}

export interface IPreviousName {
    firstName: string;
    lastName: string;
}

export interface IUser {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: IAddress;
    dob?: Date;
    previousNames?: IPreviousName[];
    previousAddresses?: IAddress[];
    lenders?: { name: string; id: string }[];
}

export const updateProfile = async (user: Partial<IUser>) => {
    const response = await axiosClient.patch(routes.profile.update.path, user);
    return response.data;
}

interface IIdentity {
    type: string;
    document: File;
}
export const addIdentityDocument = async (identityDoc: IIdentity) => {
    const formData = new FormData();
    formData.append('type', identityDoc.type);
    formData.append('document', identityDoc.document); 
    const response = await axiosClient.post(
        routes.documents.upload.path,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
};

// http://localhost:3000/api/address/suggestions?query=eastview
// http://localhost:3000/api/address/details?id=E16 1AB

export const getAddressSuggestions = async (query: string) => {
    const response = await axiosClient.get(routes.address.suggestions.path, { params: { query } });
    return response.data;
}

export const getAddressDetails = async (id: string) => {
    const response = await axiosClient.get(routes.address.details.path +`/${id}`);
    return response.data;
}

