'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname(); // Get the current path of the page
  const [open, setOpen] = useState(true); // State to control the modal's open/close status
  const [passkey, setPasskey] = useState(''); // State to store the passkey input by the user
  const [error, setError] = useState(''); // State to store any error messages related to the passkey input


  // Check if the code is running in the browser (not on the server)
  const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('accessKey') : null; //get encrypted passkey from local storage

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey); //decrypt passkey

    if (path) {   //check if current path is available
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false); //close modal
        router.push('/admin');  //redirect to admin page
      } else {
        setOpen(true);  //keep modal open
      }
    }
  }, [encryptedKey]) //dependency array (means run the effect whenever the encryptedKey changes)

  const closeModal = () => {
    setOpen(false);
    router.push('/');
  }

  const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); //prevent default form submission (i.e., page reload)

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey); //encrypt passkey

      localStorage.setItem('accessKey', encryptedKey); //store encrypted passkey in local storage

      setOpen(false);
    } else {
      setError('Invalid passkey. Please try again.');
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image 
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin panel, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={(e) => validatePasskey(e)} className="shad-primary-btn w-full">
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PasskeyModal