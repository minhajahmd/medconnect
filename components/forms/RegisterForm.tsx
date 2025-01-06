"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions } from "@/constants"
import { Label } from "../ui/label"
 

const RegisterForm = ({user}: {user: User}) => {

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
            </div>
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

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="birthDate"
          label="Date of Birth"
        />

        <CustomFormField 
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="gender"
          label="Gender"
          renderSkeleton={(field) => (
            <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
                    {GenderOptions.map((option) => (
                        <div key={option} className="radio-group">
                            <RadioGroupItem value={option} id={option}
                            />
                            <Label htmlFor={option} className="cursor-pointer"> {option}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </FormControl>
          )}
        />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">

        </div>
        <div className="flex flex-col gap-6 xl:flex-row">

        </div>

        <div className="flex flex-col gap-6 xl:flex-row">

        </div>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm