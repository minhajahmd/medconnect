'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, Field } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from "libphonenumber-js/core"


{ /* Control usage
 Custom Components:
 when using custom input components or components from a UI library
 that do not directly support register, control is needed to integrate
 them with react-hook-form.

 Complex Forms:
 For complex forms with dynamic fields, conditional rendering, or advanced
 validation logic, control provides more flexibility and control over form state.

  Advanced Validation:
 If you need to perform complex validation that involves multiple fields or
 custom logic, using control with Controller or useController can simplify the process.
*/}


interface CustomProps{
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any ) => React.ReactNode,
  }

const RenderField = ({field, props}: {field: any; props: CustomProps}) => {

  //object destructuring to extract {fieldType,..} from the props object
  const {fieldType, iconSrc, iconAlt, placeholder} = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image 
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput 
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
            />
        </FormControl>
      )
    default:
      break;
  }
}

// Take the props and render the appropriate form element.
const CustomFormField = (props: CustomProps) => {
  const {control, fieldType, name, label} = props;
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex-1">
        {fieldType !== FormFieldType.CHECKBOX && label && (
          <FormLabel>{label}</FormLabel>
        )}

      {/* when using a component, also provide it with the necessary props that it expects*/}
        <RenderField field={field} props={props} />

        <FormMessage className="shad-error"/>
      </FormItem>
    )}
  />
  )
}

export default CustomFormField