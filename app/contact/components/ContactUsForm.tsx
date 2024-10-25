"use client";

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/utils/sendEmail';
import { DNA } from 'react-loader-spinner'
import * as React from 'react';
export type FormData = {
  title: string;
  lastName: string;
  phone: string;
  address: string;
  unitScale: string;
  situation: string;
  message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const [submitting, setSubmitting] = React.useState(false)
  function onSubmit(data: FormData) {
    setSubmitting(true)
    sendEmail(data);
  }

  return (
    <form className="flex flex-col justify-center w-1/2 gap-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label
            htmlFor='title'
            className='block mb-2 text-sm font-medium'
          >
            Title
          </label>
          <select
            defaultValue="Title"
            className="p-2 text-sm rounded-lg outline-0 block w-full bg-slate-600 text-slate-200"
            {...register('title', { required: true })}
            disabled={submitting}>
            <option value="Title" disabled>Title</option>
            <option value="Mr.">Mr. </option>
            <option value="Miss ">Miss </option>
            <option value="Mrs. ">Mrs. </option>
          </select>
        </div>

        <div className='col-span-2'>
          <label
            htmlFor='last-name'
            className='block mb-2 text-sm font-medium'
          >
            Last Name
          </label>
          <input
            type='text'
            placeholder='Last Name'
            className='w-full p-1 bg-inherit border-b-2 border-slate-500 outline-0'
            {...register('lastName', { required: true })}
            disabled={submitting}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor='phone'
          className='block mb-2 text-sm font-medium'
        >
          Phone
        </label>
        <input
          type='text'
          placeholder='Phone'
          className='w-full p-1 bg-inherit border-b-2 border-slate-500 outline-0'
          {...register('phone', { required: true })}
          disabled={submitting}
        />
      </div>
      <div>
        <label
          htmlFor='address'
          className='block mb-2 text-sm font-medium'
        >
          Address
        </label>
        <textarea
          rows={1}
          placeholder='Address'
          className='w-full p-1 bg-inherit border-b-2 border-slate-500 outline-0'
          {...register('address')}
          disabled={submitting}
        />
      </div>
      <div>
        <label
          htmlFor='unit-scale'
          className='block mb-2 text-sm font-medium'
        >
          Unit Scale
        </label>
        <select
          className="p-2 text-sm rounded-lg outline-0 block w-full bg-slate-600 text-slate-200"
          {...register('unitScale', { required: true })}
          disabled={submitting}
          defaultValue="Unit Scale"
        >
          <option disabled>Unit Scale</option>
          <option value="< 400">&lt; 400</option>
          <option value="401 - 700">401 - 700</option>
          <option value="> 700">&gt; 700</option>
        </select>
      </div>
      <div>
        <label
          htmlFor='situation'
          className='block mb-2 text-sm font-medium'
        >
          Situation
        </label>
        <select
          className="p-2 text-sm rounded-lg outline-0 block w-full bg-slate-600 text-slate-200"
          {...register('situation', { required: true })}
          disabled={submitting}
          defaultValue="Situation"
        >
          <option disabled>Situation</option>
          <option value="New House">New House</option>
          <option value="Renovation">Renovation</option>
        </select>
      </div>
      <div>
        <label
          htmlFor='message'
          className='block mb-2 text-sm font-medium'
        >
          Message
        </label>
        <textarea
          rows={4}
          placeholder='Message'
          className='w-full p-1 bg-inherit border-b-2 border-slate-500 outline-0'
          {...register('message')}
          disabled={submitting}
        />
      </div>
      <div className="mt-5 flex justify-center items-center">
        <button className='beige-neumor-btn rounded-full px-8 py-2'>
          Submit
        </button>
        <DNA
          visible={submitting}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </form>
  );
};

export default Contact;