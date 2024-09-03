
'use client';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 md:grid-cols-2">

        <div className='mb-5'>
          <label
            htmlFor='title'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Title
          </label>
          <select
            defaultValue="Title"
            className="bg-gray-50 border border-gray-300 p-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register('title', { required: true })}
            disabled={submitting}>
            <option value="Title" disabled>Title</option>
            <option value="Mr.">Mr. </option>
            <option value="Miss ">Miss </option>
            <option value="Mrs. ">Mrs. </option>
          </select>
        </div>

        <div className='mb-5'>
          <label
            htmlFor='last-name'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Last Name
          </label>
          <input
            type='text'
            placeholder='Last Name'
            className='block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500'
            {...register('lastName', { required: true })}
            disabled={submitting}
          />
        </div>
      </div>
      <div className='mb-5'>
        <label
          htmlFor='phone'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          Phone
        </label>
        <input
          type='text'
          placeholder='Phone'
          className='block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500'
          {...register('phone', { required: true })}
          disabled={submitting}
        />
      </div>

      <div className='mb-5'>
        <label
          htmlFor='address'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          Address
        </label>
        <textarea
          placeholder='Address'
          className='block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500'
          {...register('address')}
          disabled={submitting}
        />
      </div>

      <div className='mb-5'>
        <label
          htmlFor='unit-scale'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          Unit Scale
        </label>
        <select
          className="bg-gray-50 border border-gray-300 p-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

      <div className='mb-5'>
        <label
          htmlFor='situation'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          Situation
        </label>
        <select
          className="bg-gray-50 border border-gray-300 p-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          {...register('situation', { required: true })}
          disabled={submitting}
          defaultValue="Situation"
        >
          <option disabled>Situation</option>
          <option value="New House">New House</option>
          <option value="Renovation">Renovation</option>
        </select>
      </div>

      <div className='mb-5'>
        <label
          htmlFor='message'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          Message
        </label>
        <textarea
          placeholder='Message'
          className='block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500'
          {...register('message')}
          disabled={submitting}
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className='hover:shadow-form rounded-md bg-purple-500 py-3 px-8 text-base font-semibold text-white outline-none'>
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