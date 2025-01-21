'use server';

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";

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

export const getRecentAppointmentList = async () => {
  try {
      const appointments = await databases.listDocuments(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        [Query.orderDesc('$createdAt')]   //sort the documents in descending order based on their creation date.
      );

      const initialCounts = {
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0
      }

//       Type Casting:
//       (appointments.documents as Appointment[]) tells TypeScript to treat appointments.documents as an array of Appointment objects.

//       Reduce Function:
//      .reduce((acc, appointment) => { ... }, initialCounts) is a method that processes each item in the array and accumulates a result.
//       acc is the accumulator object that holds the counts of different statuses.

      const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
        if (appointment.status === 'scheduled') {
          acc.scheduledCount++;
        } else if (appointment.status === 'pending') {
          acc.pendingCount++;
        } else if (appointment.status === 'cancelled') {
          acc.cancelledCount++;
        }
        return acc;
      }, initialCounts);

      const data = {
        totalCount: appointments.total,
        ...counts,
        documents: appointments.documents
      }

      return parseStringify(data);
   } catch (error: any) {
      console.log(error);
  }
}