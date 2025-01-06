import * as sdk from 'node-appwrite';

//destructure environment variables from process.env
export const {
    PROJECT_ID, API_KEY, 
    DATABASE_ID, PATIENT_COLLECTION_ID, DOCTOR_COLLECTION_ID, APPOINTMENT_COLLECTION_ID, 
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT_ID: ENDPOINT,
} = process.env;

const client = new sdk.Client();

// make sure that the environment variables are read correctly
// console.log('Endpoint:', ENDPOINT);

// configure client to know which Appwrite server to talk to and which project it belongs to.
client
    .setEndpoint(ENDPOINT!)     // ! -> TypeScript non-null assertion operator to tell the TypeScript compiler that we are certain a particular variable is not null or undefined.
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!);


// client contains all the necessary configuration (endpoint, project ID, API key) that these services need to communicate with the Appwrite server. 
// By passing the client, we ensure that each service is using the same configuration.
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);