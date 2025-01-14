import { auth } from '@/app/(auth)/auth';
import { getChatsByUserId } from '@/lib/db/queries';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      console.log('Invalid session:', session); // Add logging
      return Response.json('Unauthorized - Invalid session', { status: 401 });
    }

    const chats = await getChatsByUserId({ 
      id: session.user.id 
    });
    
    return Response.json(chats);
  } catch (error) {
    console.error('History route error:', error);
    return Response.json('Internal Server Error', { status: 500 });
  }
}