import { supabase } from '@/lib/supabaseClient';

export const postService = {
  async getDashboardPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createPost(postData: { title: string; category: string; content: string; imageUrl: string; authorId: string }) {
    const { error } = await supabase
      .from('posts')
      .insert([
        {
          title: postData.title,
          category: postData.category,
          content: postData.content,
          image_url: postData.imageUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
          author_id: postData.authorId,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) throw error;
    return true;
  },

  async deletePost(id: number) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  async getPublicPosts(category?: string | null) {
    let query = supabase.from('posts').select('*');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getPostById(id: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
};