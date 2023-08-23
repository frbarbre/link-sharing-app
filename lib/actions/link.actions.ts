'use server';

import { revalidatePath } from 'next/cache';
import Link from '../models/link.model';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';
import { Platforms } from '@/types';

interface CreateParams {
  platform: Platforms | "empty";
  link: string;
  author: string;
  path: string;
}

export async function createLink({
  platform,
  author,
  link,
  path,
}: CreateParams) {
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

interface UpdatePlatform {
  linkId: string;
  platform: Platforms | "empty";
  path?: string;
}

export async function updatePlatform({
  linkId,
  platform,
  path,
}: UpdatePlatform): Promise<void> {
  try {
    connectToDB();

    await Link.findOneAndUpdate(
      { _id: linkId },
      {
        platform,
      },
      { upsert: true }
    );

    if (path) {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to update link: ${error.message}`);
  }
}

interface UpdateLink {
  linkId: string;
  link: string;
  path?: string;
}

export async function updateUrl({
  linkId,
  link,
  path,
}: UpdateLink): Promise<void> {
  try {
    connectToDB();

    await Link.findOneAndUpdate(
      { _id: linkId },
      {
        link,
      },
      { upsert: true }
    );

    if (path) {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to update link: ${error.message}`);
  }
}
