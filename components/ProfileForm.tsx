'use client';

import { updateUser } from '@/lib/actions/user.actions';
import { useState } from 'react';
import Input from './Input';
import UploadImage from './UploadImage';
import Message from './Message';

export default function ProfileForm({
  firstName,
  lastName,
  email,
  image,
  id,
}: {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  id: string;
}) {
  const [form, setForm] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
  });
  const [images, setImages] = useState<{ fileUrl: string; fileKey: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; isActive: boolean }>({
    message: '',
    isActive: false,
  });
  const [isSaved, setIsSaved] = useState(true);
  const [messageActive, setMessageActive] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsSaved(false);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    setIsSaved(true);
    e.preventDefault();
    submitUserToDB();
    setMessageActive(true);
    setTimeout(() => {
      setMessageActive(false);
    }, 3000);
  }

  async function submitUserToDB() {
    await updateUser({
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      image: images[0]?.fileUrl || image,
      onboarded: true,
      path: '/profile',
      userId: id,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <section className="flex flex-col gap-[24px] h-sm-screen md:h-md-screen md:max-h-[618px] overflow-y-scroll p-[24px] md:p-[40px]">
        <article>
          <h1 className="font-bold text-[24px] md:text-[32px] text-dark-gray">
            Profile Details
          </h1>
          <p className="text-medium-gray pt-[8px]">
            Add your details to create a personal touch to your profile.
          </p>
        </article>
        <UploadImage
          image={image}
          images={images}
          setImages={setImages}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
          setIsSaved={setIsSaved}
        />
        <section className="bg-near-white p-[20px] flex flex-col gap-[12px] rounded-[8px]">
          <Input
            name="firstName"
            value={form.firstName}
            placeholder="e.g. John"
            handleChange={handleChange}
            title="First Name*"
          />
          <Input
            name="lastName"
            value={form.lastName}
            placeholder="e.g. Appleseed"
            handleChange={handleChange}
            title="Last Name*"
          />
          <Input
            name="email"
            value={form.email}
            placeholder="e.g. email@example.com"
            handleChange={handleChange}
            title="Email"
          />
        </section>
      </section>
      <section className="h-[78px] md:h-[94px] flex justify-end items-center px-[16px] md:px-[40px] border-t">
        <button
          className={`w-full h-[46px] rounded-[8px] font-semibold px-[27px] transition-colors md:w-max ${
            isSaved
              ? 'bg-white border border-primary-purple/25 text-primary-purple/25 cursor-not-allowed'
              : 'bg-primary-purple hover:bg-pale-purple text-white'
          }`}
          type="submit"
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </section>
      <Message
        isActive={messageActive}
        text="Your changes have been successfully saved!"
        image="/icon-changes-saved.svg"
      />
    </form>
  );
}
