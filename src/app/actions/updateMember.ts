'use server'

import formSchema from '@/lib/zod/editMember';
import { z } from 'zod'

export async function updateMember(
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