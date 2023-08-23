'use client';

import { updateUser } from '@/lib/actions/user.actions';
import { useState } from 'react';

import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import Image from 'next/image';
import { motion as m } from 'framer-motion';

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submitUserToDB();
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

  console.log(image);

  return (
    <form onSubmit={handleSubmit}>
      <section>
        <p>Profile Picture</p>
        <div
          style={{ backgroundImage: `url("${images[0]?.fileUrl || image}")` }}
          className="relative w-full max-w-[193px] aspect-square bg-cover bg-no-repeat bg-center bg-light-purple rounded-[12px]"
        >
          {image === "" && images.length === 0 ? (
            <div>Upload</div>
          ) : (
            <div className="absolute inset-0 bg-black/20 rounded-[12px]">Change</div>
          )}
          {loading && (
            <m.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.5, mass: 0.3 }}
            >
              <Image
                src={'/icon-loading.svg'}
                alt="loading-icon"
                width={40}
                height={40}
              />
            </m.div>
          )}
          <UploadButton<OurFileRouter>
            appearance={{
              button: {
                opacity: 0,
                position: 'absolute',
                inset: 0,
                backgroundColor: 'red',
                width: '100%',
                height: '100%',
              },
              allowedContent: {
                opacity: 0,
              },
            }}
            endpoint="media"
            onUploadProgress={() => {
              setLoading(true);
            }}
            onClientUploadComplete={(res) => {
              setLoading(false);
              if (res) {
                setImages(res);
              }
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </section>
      <section>
        <div>
          <p>First Name*</p>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="e.g. John"
          />
        </div>

        <div>
          <p>Last Name*</p>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="e.g. Appleseed"
          />
        </div>

        <div>
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. email@example.com"
          />
        </div>
      </section>
      <button type="submit">Save</button>
    </form>
  );
}
