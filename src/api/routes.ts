const routes = {
    otp: {
      generate: {
        path: '/api/otp/generate',
        method: 'POST',
        description: 'Generate OTP for user verification',
        auth: false
      },
      verify: {
        path: '/api/otp/verify',
        method: 'POST',
        description: 'Verify OTP',
        auth: false
      }
    },
    auth: {
      profile: {
        path: '/api/auth/profile',
        method: 'GET',
        description: 'Get user profile',
        auth: true
      },
      refreshToken: {
        path: '/api/auth/refresh-token',
        method: 'POST',
        description: 'Refresh authentication token',
        auth: true
      }
    },
    documents: {
      upload: {
        path: '/api/documents/upload',
        method: 'POST',
        description: 'Upload identity document',
        auth: true
      }
    },
    payments: {
      createPaymentIntent: {
        path: '/api/payments/create-payment-intent',
        method: 'POST',
        description: 'Create a payment intent',
        auth: true
      },
      confirm: {
        path: '/api/payments/confirm',
        method: 'POST',
        description: 'Confirm a payment',
        auth: true
      },
      status: {
        path: '/api/payments/status/:paymentId',
        method: 'GET',
        description: 'Get payment status',
        auth: true
      },
      cancelSubscription: {
        path: '/api/payments/cancel-subscription/:paymentId',
        method: 'POST',
        description: 'Cancel subscription',
        auth: true
      }
    },
    profile: {
      update: {
        path: '/api/profile',
        method: 'PATCH',
        description: 'Update user profile details',
        auth: true
      }
    },
    lenders: {
      getAll: {
        path: '/api/lenders',
        method: 'GET',
        description: 'Get all lenders',
        auth: true
      },
      getUserLenders: {
        path: '/api/lenders/user',
        method: 'GET',
        description: 'Get user\'s lenders',
        auth: true
      },
      documentRequest: {
        path: '/api/lenders/request-document',
        method: 'POST',
        description: 'Request document for a lender',
        auth: true
      }
    },
    claims: {
      create: {
        path: '/api/claims',
        method: 'POST',
        description: 'Create claims for selected lenders',
        auth: true
      },
      submit: {
        path: '/api/claims/submit',
        method: 'POST',
        description: 'Submit claims',
        auth: true
      },
      update: {
        path: '/api/claims',
        method: 'PATCH',
        description: 'Update claim details',
        auth: true
      },
      get: {
        path: '/api/claims',
        method: 'GET',
        description: 'Get all claims',
        auth: true
      }
    },
    mail: {
      get: {
        path: '/api/mailing',
        method: 'GET',
        description: 'Get all mail',
        auth: true
      }
    },
    mailing: {
      updateStatus: {
        path: '/api/mailing',
        method: 'PATCH',
        description: 'Update mail status',
        auth: true
      }
    },
    address: {
      suggestions: {
        path: '/api/address/suggestions',
        method: 'GET',
        description: 'Get address suggestions',
        auth: true
      },
      details: {
        path: '/api/address/details',
        method: 'GET',
        description: 'Get address details',
        auth: true
      }
    },

  };

export default routes;