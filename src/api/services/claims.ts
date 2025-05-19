import axiosClient from "../index";
import routes from "../routes";


export const getClaims = async (lenderId: string="") => {
  const params = {
    lenderId: lenderId,
  };
  console.log(params, "params");
  const response = await axiosClient.get(routes.claims.get.path, {
    params,
  });
  return response.data;
};

// sample data to get claims
// {
//   lenderId: "1234567890", (optional)
// }



export const createClaim = async (data: any) => {
  const response = await axiosClient.post(routes.claims.create.path, data);
  return response.data;
};
// sample data to create claim
// {
//   agreement: {
//     agreementNumber: "1234567890",
//     carRegistration: "ABC123",
//   },
//   lenderId:{

//   }
// }


export const updateClaim = async (data: any) => {
  const response = await axiosClient.patch(routes.claims.update.path, data);
  return response.data;
};

export const submitClaim = async (data: any) => {
  const response = await axiosClient.post(routes.claims.submit.path, data);
  return response.data;
};

// sample data to update agreement
// agreementNumber: { type: String, required: true },
// status: {
//   type: String,
//   enum: ['Pending', 'OfferMade', 'Rejected', 'ClaimAlreadySubmitted', 'FOSEscalation', 'Completed'],
//   default: 'Pending'
// },
// carRegistration: String,
// offerAmount: Number,
// offerStatus: {
//   type: String,
//   enum: ['Satisfied', 'NotSatisfied', null],
//   default: null
// },
// documentRequestStatus: {
//   type: String,
//   enum: ['NotRequested', 'Requested', 'Received', 'Escalated'],
//   default: 'NotRequested'
// }