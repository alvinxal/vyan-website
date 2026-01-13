"use client";
import React, { useEffect, useState } from "react";
import SectionTitle from "../elements/SectionTitle";
import TestimonialCard from "../elements/TestimonialCard";
import Image from "next/image";

import client from "@/lib/contentful";

const testimonialData = [
  {
    name: "Vijay",
    country: "India",
    description:
      "My experience with Vyan as a guide in Bali was truly amazing! He is very friendly, knowledgeable, and always ensures that our trip is comfortable and enjoyable. His recommendation for tourist spots and local cuisine made our vacation unforgettable!",
    profilePicture: "/tanah-lot.png",
  },
  {
    name: "Sarah",
    country: "Netherland",
    description:
      "Having Vyan as our guide in Bali was an incredible experience! He was warm, knowledgeable, and made sure every part of our trip was smooth and enjoyable. His recommendations for must-visit places and delicious local food added so much value to our journey.",
    profilePicture: "/tanah-lot.png",
  },
];

const ClientSaid = () => {
  interface ContentfulImage {
    fields: {
      title: string;
      file: {
        url: string;
      };
    };
  }

  const [data, setData] = useState<ContentfulImage[] | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const entry = await client.getEntry("z479mRTI4xZEd6FGm3m0Z");

        if (entry?.fields?.imageContent) {
          setData(entry.fields.imageContent as ContentfulImage[]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetch();
  }, []);

  console.log(data);

  return (
    <div
      className='h-full lg:w-fit sm:mb-0 pb-24 relative scroll-mt-8'
      id='testimonial'
    >
      <div className='px-4 md:px-8'>
        <SectionTitle black>WHAT MY CLIENT SAID</SectionTitle>
        <div className='lg:py-4 lg:pb-8'>
          {testimonialData.map((item) => (
            <TestimonialCard
              name={item.name}
              description={item.description}
              country={item.country}
              profilePicture={item.profilePicture}
              key={item.name}
            />
          ))}
        </div>
      </div>
      <div className='h-48 mt-16 w-full relative overflow-x-clip '>
        <div className='w-max h-48 flex gap-2 animate-marquee  absolute'>
          {data?.map((data) => (
            <div key={data.fields.title} className='h-full w-fit'>
              <Image
                src={`https:${data.fields.file.url}`}
                alt='1'
                width={200}
                height={300}
                className='w-full h-full rounded-sm object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSaid;
