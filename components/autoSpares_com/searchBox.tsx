'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import '@/app/globals.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const FormSchema = z.object({
  carType: z
    .string({
      required_error: "Please select an carType",
    }),
  engine: z
    .string({
      required_error: "Please select an engine",
    }),
  year: z
    .string({
      required_error: "Please select an engine",
    }),
  model: z
    .string({
      required_error: "Please select an engine",
    }),

})





function SearchBox() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      carType: "نوع السيارة",
      year: "العام",
      model: "الموديل",
      engine: "المحرك",
    },
  })


  function onSubmit(data: any) {
    console.log(data)
  }



  return (
    <div className='absolute  z-10 w-[70%]'>
      <Card className='text-center'>
        <CardHeader>
          <CardTitle className='text-lg md:text-xl lg:text-3xl text-green-400 font-bold'>اوجد قطع غيار لسيارتك</CardTitle>
          <CardDescription>اكثر من عشرات البراندات والالاف قطع الغيار</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-around ' dir='rtl'>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-around  w-full">

              {/* carType */}
              <FormField
                control={form.control}
                name="carType"
                render={({ field }) => (
                  <FormItem>

                    <Select dir='rtl' onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl >
                        <SelectTrigger className="w-[100px] lg:w-[150px] bg-green-400 text-white">
                          <SelectValue >{field.value}</SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apple">car 1</SelectItem>
                        <SelectItem value="banana">car 2</SelectItem>
                      </SelectContent>
                    </Select>


                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* year */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <Select dir='rtl' onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[100px] lg:w-[150px] bg-green-400 text-white">
                          <SelectValue >{field.value}</SelectValue>

                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apple">2023</SelectItem>
                        <SelectItem value="banana">2022</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>

                    <Select dir='rtl' onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[100px] lg:w-[150px] bg-green-400 opacity-40 text-white">
                          <SelectValue >{field.value}</SelectValue>

                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apple">موديل 1</SelectItem>
                        <SelectItem value="banana">موديل 2</SelectItem>
                      </SelectContent>
                    </Select>


                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="engine"
                render={({ field }) => (
                  <FormItem>
                    <Select dir='rtl' onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[100px] lg:w-[150px] bg-green-400 opacity-40 text-white">
                          <SelectValue >{field.value}</SelectValue>

                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apple">type 1</SelectItem>
                        <SelectItem value="banana">type 2</SelectItem>
                      </SelectContent>
                    </Select>


                    <FormMessage />
                  </FormItem>
                )}
              />
       <Button type='submit' className='bg-green-400  '>بحث</Button>
             </form>
          </Form>

        </CardContent>

      </Card>
    </div>
  )
}

export default SearchBox





{/* <div className='flex justify-around  w-3/4'>
          <Select dir='rtl' value={carType} onChange={setCarType} >

            <SelectTrigger className="w-[100px] lg:w-[150px] bg-green-400 text-white">
              <SelectValue placeholder={carType} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{carType}</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select dir='rtl' value={year} onChange={setYear}>
            <SelectTrigger className="w-[100px] lg:w-[150px] bg-green-400  text-white">
              <SelectValue placeholder="العام " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select dir='rtl' value={model} onChange={setModel}>
            <SelectTrigger className="w-[100px] lg:w-[150px] bg-green-400 bg-opacity-40  text-white">
              <SelectValue placeholder="اختيار الموديل" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select dir='rtl' value={engineType} onChange={setEngineType} >
            <SelectTrigger className="w-[100px] lg:w-[150px] bg-green-400 bg-opacity-40  text-white">
              <SelectValue placeholder="نوع المحرك" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

        </div >
        <div className='w-[150px] '>
          <Button className='bg-green-400 w-full '>بحث</Button>

        </div> */}