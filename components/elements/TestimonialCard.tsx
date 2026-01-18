import React from "react";
import { BiSolidQuoteRight } from "react-icons/bi";
import TextArea from "./TextArea";
import Image from "next/image";
import { TestimonialCardTypes } from "@/types";

const TestimonialCard = ({
  name,
  description,
  profilePicture,
  country,
}: TestimonialCardTypes) => {
  return (
    <TextArea>
      <div className='w-full flex gap-4 flex-col py-10 text-gray-800'>
        <BiSolidQuoteRight className='text-gray-300' size='2em' />
        <div className='text-lg lg:text-xl leading-normal'>{description}</div>
        <div className='flex gap-4 items-center'>
          <div className='w-16 h-16 object-fill rounded-full overflow-hidden'>
            <Image
              src={profilePicture}
              alt='gambarcontoh'
              className='object-cover h-full'
              width={100}
              height={100}
            />
          </div>
          <div>
            <div className='text-xl font-semibold'>{name}</div>
            <div className='text-xl'>{country}</div>
          </div>
        </div>
      </div>
    </TextArea>
  );
};

export default TestimonialCard;
