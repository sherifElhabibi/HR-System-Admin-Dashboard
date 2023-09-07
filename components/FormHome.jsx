import React from 'react';
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
import { Controller, useForm } from 'react-hook-form';
import Modal from './Modal';
import SvgSpinner from './SvgSpinner';

function FormHome({ onSubmit, ModelFunc, showModel }) {
  const {
    register,
    handleSubmit,
    control,

    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      phoneInput: '',
      message: '',
    },
  });
  return (
    <>
      <h2 className="text-center mb-6 p-3 border-b font-semibold text-regal-green text-3xl ">
        تواصل معنا
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 md:w-1/2 m-auto ">
        <div className="flex justify-between flex-wrap md:flex-nowrap">
          <div className="md:w-1/2 w-full grow md:ml-1 mb-2">
            <label
              htmlFor="name"
              className="block mb-2 w-full text-sm font-medium text-gray-400 "
            >
              اسمك:-
            </label>
            <input
              type="text"
              name="name"
              id="name"
              {...register('name', {
                required: {
                  value: true,
                  message: 'يرجى ادخال الاسم ',
                },
              })}
              className="p-2 w-full border border-gray-300 rounded bg-gray-50 outline-2 outline-[#2684FF]"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="md:w-1/2 w-full grow  mb-2">
            <label
              htmlFor="email"
              className="block mb-2 w-full text-sm font-medium text-gray-400 "
            >
              ايميلك:-
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'الايميل غير صحيح',
                },
              })}
              className="p-2 w-full border border-gray-300 rounded bg-gray-50 outline-2 outline-[#2684FF]"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between flex-wrap md:flex-nowrap">
          <div className="md:w-1/2 w-full grow md:ml-1 mb-2">
            <label
              htmlFor="subject"
              className="block mb-2 w-full text-sm font-medium text-gray-400 "
            >
              الموضوع:-
            </label>
            <input
              type="text"
              name="subject"
              {...register('subject')}
              className="p-2 w-full border border-gray-300 rounded bg-gray-50 outline-2 outline-[#2684FF]"
            />
          </div>
          <div className="md:w-1/2 w-full grow  mb-2">
            <label
              htmlFor="phoneInput"
              className="block mb-2 w-full text-sm font-medium text-gray-400 "
            >
              تليفونك:-
            </label>
            <Controller
              name="phoneInput"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <div className="div-dir">
                  <PhoneInput
                    value={value}
                    onChange={onChange}
                    defaultCountry="JO"
                    id="phoneInput"
                    className="p-2 w-full border  border-gray-300 rounded bg-gray-50 outline-2 outline-[#2684FF]"
                  />
                </div>
              )}
            />

            {errors.phoneInput && (
              <p className="error-message text-red-600">
                {' '}
                يرجى ادخال رقم الموبايل{' '}
              </p>
            )}
          </div>
        </div>
        <div className=" mb-2">
          <label
            htmlFor="message"
            className="block mb-2 w-full text-sm font-medium text-gray-400"
          >
            رسالتك:-
          </label>
          <textarea
            name="message"
            {...register('message', {
              required: {
                value: true,
                message: 'يرجى كتابة الرسالة ',
              },
            })}
            className="p-2.5 w-full h-28 border border-gray-300 rounded bg-gray-50 outline-2 outline-[#2684FF]"
          ></textarea>
          {errors.message && (
            <p className="text-red-600">{errors.message.message}</p>
          )}
        </div>
        <div className="text-center mb-4">
          <button
            type="submit"
            className={`m-auto flex rounded-md px-12 py-2 bg-regal-dark text-white uppercase tracking-wide disabled:bg-gray-600`}
            // disabled={buttonText == 'جارى التسجيل' ? true : false}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span>جاري الإرسال</span>
                <SvgSpinner />
              </>
            ) : (
              <span>إرسال</span>
            )}
          </button>
        </div>
        {showModel ? <Modal ModelFunc={ModelFunc} /> : null}
      </form>
    </>
  );
}

export default FormHome;
