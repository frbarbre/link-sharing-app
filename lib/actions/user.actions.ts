'use server';

import { revalidatePath } from 'next/cache';
import User from '../models/user.model';

import { connectToDB } from '../mongoose';

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

interface Params {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  onboarded: boolean;
  path?: string;
}

export async function updateUser({
  userId,
  firstName,
  lastName,
  email,
  image,
  onboarded,
  path,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        email: email.toLowerCase(),
        firstName,
        lastName,
        image,
        onboarded,
      },
      { upsert: true }
    );

    if (path) {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
