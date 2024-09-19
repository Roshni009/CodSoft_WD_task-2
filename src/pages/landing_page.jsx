import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React from 'react'

import { Link } from 'react-router-dom';

import companies from '../data/companies.json';
import faqs from '../data/faqs.json'
import Autoplay from 'embla-carousel-autoplay';
import hero1 from '/companies/hero1.png'
import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';


const LandingPage = () => {
  return (
     <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
         <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4'>Find Your Dream Job <span className='flex items-center gap-2 sm:gap-6'>and get <img src="./image2.png" alt='Hirrd logo' className='h-16 sm:h-24 lg:h-36'></img></span></h1>
         <p className='text-purple-300 sm:mt-4 text-xs sm:text-xl'>
          Explore thousands of job listings or find the perfect candidate
         </p>
      </section>
      <div className='flex justify-center gap-6'>
       <Link to="/jobs">
       <Button variant="blue" size='xl'>Find Jobs</Button>
      </Link>
      <Link to="/post-job">
       <Button size="xl" variant="destructive">Post a Job</Button>
      </Link>
        
      </div>
      
        {/* Carousel*/}
        <Carousel
         plugins = {[Autoplay({ delay: 2000})]}
        className="w-full py-10">
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, path}) => {
              return (
                 <CarouselItem key={id} className='basis-1/3 lg:basis-1/6' >
                  <img src={path} alt={name} className='h-9 sm:h-14 object-contain'/>
                 </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* banner */}

        <img src={hero1} className='w-full' alt="hero image" />

        <section className='grid grid-cols-1 md:grid-cols-2 gap-6 mx-10'>
          {/* cards */}
          <Card>
            <CardHeader>
              <CardTitle>For Job Seekers</CardTitle>
          
            </CardHeader>
            <CardContent>
              <p>Search and apply for jobs, track applications, and more</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Employers</CardTitle>
          
            </CardHeader>
            <CardContent>
              <p>Post jobs, manage applications, and find the best candidates</p>
            </CardContent>
          </Card>
        </section>

        {/* Accordion */}

 
    <Accordion type="single" collapsible className='mx-10 bg-gray-500 rounded-md'>
      {faqs.map((faq, index) => {
       return ( 
         <AccordionItem value={`item-${index + 1}`} key={index} className="px-5 rounded-full mb-4 pt-3 ">
        <AccordionTrigger className="text-black text-xl">{faq.question}</AccordionTrigger>
        <AccordionContent className="text-lg">
         {faq.answer}
        </AccordionContent>
       </AccordionItem>
       ) 
    })} 
    </Accordion>

     </main>
  )
}

export default LandingPage;