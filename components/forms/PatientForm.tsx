"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
 
// Define different types of form fields.
export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}

/*skeleton, a placeholder UI that is displayed while content is being loaded. 
  This technique is used to improve the user experience by providing a visual indication that content is on its way*/


const PatientForm = () => {

  //This hook from Next.js is used for programmatic navigation. It allows us to redirect users to different pages.
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false); /*manages state*/

  // Defining the form of the form "UserFormValidation"
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    //set initial values for the form fields.
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  //onSubmit handler which renders some logic once the user submits the form
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);
      
      //redirect to the registration page if the user is successfully created.
      if(user) router.push(`/patients/${user.$id}/register`)

    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }
  
  return (
    // Pass all properties of the form object as props to the Form component.
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
        <section className="space-y-4" style={{marginBottom: '2.1rem'}}>
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>

        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField 
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm