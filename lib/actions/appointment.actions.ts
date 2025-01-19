'use server';

import { ID } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment
          );
        return parseStringify(newAppointment);
    } catch (error: any) {
        console.log(error);
    }
}

export const getAppointment = async (appointmentid: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentid
          );

          return parseStringify(appointment);
    } catch (error: any) {
        console.log(error);
    }
}