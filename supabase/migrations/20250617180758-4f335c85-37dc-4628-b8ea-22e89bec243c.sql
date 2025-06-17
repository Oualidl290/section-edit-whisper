
-- Add missing columns to existing projects table if they don't exist
DO $$ 
BEGIN
    -- Add name column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='name') THEN
        ALTER TABLE public.projects ADD COLUMN name TEXT NOT NULL DEFAULT '';
    END IF;
    
    -- Add slug column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='slug') THEN
        ALTER TABLE public.projects ADD COLUMN slug TEXT;
        -- Add unique constraint
        ALTER TABLE public.projects ADD CONSTRAINT projects_slug_unique UNIQUE (slug);
    END IF;
    
    -- Add created_by column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='created_by') THEN
        ALTER TABLE public.projects ADD COLUMN created_by TEXT NOT NULL DEFAULT '';
    END IF;
END $$;

-- Update comments table structure to match the new requirements
DO $$
BEGIN
    -- Change x and y to INTEGER if they're not already
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='comments' AND column_name='x' AND data_type='double precision') THEN
        ALTER TABLE public.comments ALTER COLUMN x TYPE INTEGER;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='comments' AND column_name='y' AND data_type='double precision') THEN
        ALTER TABLE public.comments ALTER COLUMN y TYPE INTEGER;
    END IF;
    
    -- Add author column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='comments' AND column_name='author') THEN
        ALTER TABLE public.comments ADD COLUMN author TEXT;
    END IF;
    
    -- Add user_name column as alias for author if it exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='comments' AND column_name='user_name') THEN
        -- Copy data from user_name to author if author is empty
        UPDATE public.comments SET author = user_name WHERE author IS NULL AND user_name IS NOT NULL;
    END IF;
END $$;

-- Create policies for projects table if they don't exist
DO $$
BEGIN
    -- Drop existing policies first to avoid conflicts
    DROP POLICY IF EXISTS "Authenticated users can insert projects" ON public.projects;
    DROP POLICY IF EXISTS "Authenticated users can select projects" ON public.projects;
    DROP POLICY IF EXISTS "Authenticated users can update projects" ON public.projects;
    DROP POLICY IF EXISTS "Authenticated users can delete projects" ON public.projects;
    
    -- Create new policies
    CREATE POLICY "Authenticated users can insert projects" 
      ON public.projects 
      FOR INSERT 
      TO authenticated
      WITH CHECK (true);

    CREATE POLICY "Authenticated users can select projects" 
      ON public.projects 
      FOR SELECT 
      TO authenticated
      USING (true);

    CREATE POLICY "Authenticated users can update projects" 
      ON public.projects 
      FOR UPDATE 
      TO authenticated
      USING (true);

    CREATE POLICY "Authenticated users can delete projects" 
      ON public.projects 
      FOR DELETE 
      TO authenticated
      USING (true);
END $$;

-- Update policies for comments table
DO $$
BEGIN
    -- Drop existing policies first
    DROP POLICY IF EXISTS "Anyone can insert comments with valid project_id" ON public.comments;
    DROP POLICY IF EXISTS "Anyone can select comments" ON public.comments;
    DROP POLICY IF EXISTS "Authenticated users can update comments" ON public.comments;
    DROP POLICY IF EXISTS "Authenticated users can delete comments" ON public.comments;
    DROP POLICY IF EXISTS "Allow public edit request submissions" ON public.comments;
    DROP POLICY IF EXISTS "Allow reading edit requests" ON public.comments;
    DROP POLICY IF EXISTS "Allow updating edit requests" ON public.comments;
    
    -- Create new policies for visual comments
    CREATE POLICY "Anyone can insert comments with valid project_id" 
      ON public.comments 
      FOR INSERT 
      WITH CHECK (
        EXISTS (SELECT 1 FROM public.projects WHERE id = project_id)
      );

    CREATE POLICY "Anyone can select comments" 
      ON public.comments 
      FOR SELECT 
      USING (true);

    CREATE POLICY "Authenticated users can update comments" 
      ON public.comments 
      FOR UPDATE 
      TO authenticated
      USING (true);

    CREATE POLICY "Authenticated users can delete comments" 
      ON public.comments 
      FOR DELETE 
      TO authenticated
      USING (true);
END $$;

-- Enable realtime for comments table
ALTER TABLE public.comments REPLICA IDENTITY FULL;

-- Add comments table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
