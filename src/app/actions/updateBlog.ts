'use server'

import formSchema from '@/lib/zod/blog';
import { z } from 'zod'

export async function updateBlog(
  userId: string,
  values?: z.infer<typeof formSchema>
): Promise<'success' | 'error'> {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: values,
    });
    return 'success'
  } catch (error) {
    console.log(error);
    return 'error'
  }
}