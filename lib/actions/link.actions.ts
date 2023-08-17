'use server';

import { revalidatePath } from 'next/cache';
import Link from '../models/link.model';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';

interface Params {
  platform: string;
  link: string;
  author: string;
  path: string;
}

export async function createLink({ platform, author, link, path }: Params) {
  try {
    connectToDB();

    const createdLink = await Link.create({
      platform,
      author,
      link,
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { links: createdLink._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create link: ${error.message}`);
  }
}

export async function fetchLinks(userId: string) {
  try {
    connectToDB();

    return await Link.find({ author: userId });
  } catch (error: any) {
    throw new Error(`Failed to fetch todo: ${error.message}`);
  }
}

export async function deleteLink(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    // Recursively delete child threads and their descendants
    await Link.deleteMany({ _id: id });

    // Update User model
    await User.updateMany({ $pull: { links: id } });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete link: ${error.message}`);
  }
}
